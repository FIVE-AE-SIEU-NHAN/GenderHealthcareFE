import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Loader2,
  MoreHorizontal,
  ShieldBan,
  ShieldCheck,
  UserCog,
  XCircle,
} from "lucide-react";

import type { DashboardLayoutContext } from "@/components/layouts/Dashboard/DashboardLayout";
import TableToolbar, { FacetFilter } from "@/components/layouts/Dashboard/TableToolbar";
import { DataTable } from "@/components/layouts/Dashboard/DataTable";
import type { ConsultantProfile } from "@/types/consultant/profileTypes";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { useConsultants } from '@/hooks/manager/useConsultants';
import { DataTableSkeleton } from "@/components/layouts/Dashboard/DataTableSkeleton";
import { formatDate } from "@/utils/formatDate";
import { CONSULTANT_STATUS } from "@/Application/constants/manager/manager.consultantConstants";
import { TOPIC_OPTIONS } from "@/Application/constants/appointment";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useConsultantMutations } from "@/hooks/manager/useConsultantMutations";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EditConsultantForm } from "./EditConsultantProfile";


// =============== COLUMNS FORMAT ===============
const allConsultantColumns = [
  {
    key: "id",
    label: "ID",
    sortable: false,
    toggleable: false,
    render: (consultant: ConsultantProfile) => (
      <Badge variant="outline" className="font-black font-mono bg-pink-600/15">
        {consultant.id}
      </Badge>
    )
  },
  {
    key: "name",
    label: "Full Name",
    cellClassName: "min-w-48",
    render: (consultant: ConsultantProfile) => {
      return (
        <p className="line-clamp-1">
          {consultant.name}
        </p>
      );
    },
  },
  {
    key: "gender",
    label: "Gender",
    render: (consultant: ConsultantProfile) => {
      const gender = consultant.gender;

      return (
        <Badge
          className={cn(
            "font-medium text-xs capitalize",
            gender === "male" && "border-blue-500/50 bg-blue-500/10 text-blue-700",
            gender === "female" && "border-pink-500/50 bg-pink-500/10 text-pink-700",
            gender === "other" && "border-gray-500/50 bg-gray-500/10 text-gray-700"
          )}
        >
          {gender ?? "Unknown"}
        </Badge>
      );
    },
  },
  {
    key: "date_of_birth",
    label: "Date of Birth",
    defaultVisible: false,
    render: (consultant: ConsultantProfile) => {
      return formatDate(consultant.date_of_birth);
    }
  },
  {
    key: "specialization",
    label: "Specializations",
    cellClassName: "min-w-xs",
    sortable: false,
    render: (consultant: ConsultantProfile) => {
      const specialization_1 = TOPIC_OPTIONS.find(opt => opt.value === consultant.specialization_1);
      const specialization_2 = TOPIC_OPTIONS.find(opt => opt.value === consultant.specialization_2);
      return (
        <div className="flex justify-center gap-2">
          <Badge
            className={cn(
              "font-medium text-xs",
              specialization_1?.style ?? "border-muted bg-muted/10 text-muted-foreground"
            )}
          >
            {specialization_1?.label ?? consultant.specialization_1}
          </Badge>
          <Badge
            className={cn(
              "font-medium text-xs",
              specialization_2?.style ?? "border-muted bg-muted/10 text-muted-foreground"
            )}
          >
            {specialization_2?.label ?? consultant.specialization_2}
          </Badge>
        </div>

      );
    }
  },
  {
    key: "certifications",
    label: "Certifications",
    cellClassName: "min-w-66",
    defaultVisible: false,
    render: (consultant: ConsultantProfile) => {
      return (
        <p className="line-clamp-2">
          {consultant.certifications}
        </p>
      );
    },
  },
  {
    key: "created_at",
    label: "Joined Since",
    defaultVisible: false,
    render: (consultant: ConsultantProfile) => {
      return formatDate(consultant.created_at);
    }
  },
  {
    key: "experienceYears",
    label: "Experience",
    cellClassName: "max-w-4",
    render: (consultant: ConsultantProfile) => {
      return (
        <p className="font-mono text-sm font-semibold">
          {consultant.experienceYears}
        </p>
      )
    }
  },
  {
    key: "status",
    label: "Status",
    render: (consultant: ConsultantProfile) => {
      const statusString = CONSULTANT_STATUS.UI_MAP[consultant.status] || 'Unknown';
      return (
        <Badge className={cn(
          "font-medium text-xs",
          statusString === "Online" && "border-green-500/50 bg-green-500/10 text-green-700",
          statusString === "Offline" && "border-red-500/50 bg-red-500/10 text-red-700",
        )}>
          {statusString}
        </Badge>
      );
    }
  },
];


// ========== FACET FILTERS ==========
const consultantFacetFilters: FacetFilter[] = [
  {
    key: "status",
    label: "Status",
    options: CONSULTANT_STATUS.FILTER_OPTIONS,
  },
  {
    key: "specialization",
    label: "Specialization",
    options: TOPIC_OPTIONS,
  },
  {
    key: "gender",
    label: "Gender",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" },
    ],
  },
];

// ========== DATE FILTERS ==========
const dateFilterOptions = [
  { value: 'created_at', label: 'Joined Since' },
  { value: 'date_of_birth', label: 'Date of Birth' },
];

// ========== SEARCHABLE FIELDS ==========
const searchableFields = [
  { value: 'all', label: 'All Fields' },
  { value: 'name', label: 'Full Name' },
  { value: 'certifications', label: 'Certifications' },
];

export default function ConsultantListDashboard() {
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>();

  const [page, setPage] = useState(1);
  const ROWS_PER_PAGE = 10;

  const [sort, setSort] = useState<{
    field: keyof ConsultantProfile;
    direction: 'asc' | 'desc'
  }>({ field: 'created_at', direction: 'desc' });

  const [activeFilterKey, setActiveFilterKey] = useState<string>('status');
  const [activeFilterValues, setActiveFilterValues] = useState<string[]>([]);

  const [uiSearchConfig, setUiSearchConfig] = useState({ field: 'all', value: '' });

  const [apiSearchConfig, setApiSearchConfig] = useState({ field: 'all', value: '' });

  const [visibleColumns, setVisibleColumns] = useState<string[]>(allConsultantColumns.filter(col => col.defaultVisible !== false).map((col) => col.key));
  const visibleColumnCount = allConsultantColumns.filter(c => visibleColumns.includes(c.key)).length;

  const [dateConfig, setDateConfig] = useState<{
    field: string;
    from?: Date;
    to?: Date;
  }>({ field: 'created_at' });


  const [editingConsultant, setEditingConsultant] = useState<ConsultantProfile | null>(null);
  const { editStatus: editConsultantStatusMutation } = useConsultantMutations();

  // ========== SET BREADCRUMB ==========
  useEffect(() => {
    setBreadcrumb({
      title: "Consultants Management",
      parent: "Dashboard",
      parentHref: "/manager",
    });
  }, [setBreadcrumb]);




  // ========== API FILTERS ==========
  const apiFilters = useMemo(() => {
    if (activeFilterValues.length === 0) return {};
    return { [activeFilterKey]: activeFilterValues };
  }, [activeFilterKey, activeFilterValues]);

  useEffect(() => {
    setPage(1);
  }, [apiFilters, apiSearchConfig, sort, dateConfig]);

  const handleSearchSubmit = () => {
    setApiSearchConfig(uiSearchConfig);
  };

  // ========== USE CONSULTANTS HOOK ==========
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
  } = useConsultants({
    page,
    limit: ROWS_PER_PAGE,
    filters: apiFilters,
    search: apiSearchConfig,
    sort,
    dateRange: dateConfig,
  });

  const consultants = data?.data ?? [];
  const totalConsultants = data?.total ?? 0;
  const totalPages = Math.ceil(totalConsultants / ROWS_PER_PAGE);





  // ========== COLUMNS SETUP ==========
  // Map all consultant columns to the format expected by DataTable
  const columns = useMemo(() => {
    return allConsultantColumns.map((col) => ({
      key: col.key as keyof ConsultantProfile,
      label: col.label,
      visible: visibleColumns.includes(col.key),
      cellClassName: col.cellClassName,
      sortable: col.sortable,
      render: col.render,
    }));
  }, [visibleColumns]);



  // ========== ACTIONS ==========
  const renderConsultantActions = useCallback((consultant: ConsultantProfile) => {
    const statusString = CONSULTANT_STATUS.UI_MAP[consultant.status] || 'Unknown';
    const isMutatingThisConsultant =
      editConsultantStatusMutation.isPending &&
      editConsultantStatusMutation.variables?.consultantId === consultant.id;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={isMutatingThisConsultant}>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            {isMutatingThisConsultant ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <MoreHorizontal className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setEditingConsultant(consultant)}>
            Edit Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          {statusString === 'Offline' && (
            <DropdownMenuItem
              className="text-green-600 focus:bg-green-50 focus:text-green-700"
              onClick={() => editConsultantStatusMutation.mutate({ consultantId: consultant.id, status: 1 })}
            >
              <ShieldCheck className="mr-2 h-4 w-4" />
              Make Online
            </DropdownMenuItem>
          )}

          {statusString === 'Online' && (
            <DropdownMenuItem
              className="text-red-600 focus:bg-red-50 focus:text-red-700"
              onClick={() => editConsultantStatusMutation.mutate({ consultantId: consultant.id, status: 0 })}
            >
              <ShieldBan className="mr-2 h-4 w-4" />
              Make Offline
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }, [editConsultantStatusMutation]);




  return (
    <>
      <TableToolbar
        isFetching={isFetching && !isLoading}

        facetFilters={consultantFacetFilters}
        activeFilterKey={activeFilterKey}
        onActiveFilterKeyChange={setActiveFilterKey}
        activeFilterValues={activeFilterValues}
        onActiveFilterValuesChange={setActiveFilterValues}

        searchValue={uiSearchConfig.value}
        onSearchChange={(newValue) =>
          setUiSearchConfig(current => ({ ...current, value: newValue }))
        }
        searchFieldOptions={searchableFields}
        searchFieldValue={uiSearchConfig.field}
        onSearchFieldChange={(newField) =>
          setUiSearchConfig(current => ({ ...current, field: newField }))
        }
        onSearchSubmit={handleSearchSubmit}

        columns={allConsultantColumns}
        visibleColumns={visibleColumns}
        onVisibleColumnsChange={setVisibleColumns}


        dateFilterOptions={dateFilterOptions}
        activeDateFilterKey={dateConfig.field}
        onActiveDateFilterKeyChange={(newField) =>
          setDateConfig(current => ({ ...current, field: newField }))
        }
        fromDate={dateConfig.from}
        toDate={dateConfig.to}
        onDateRangeChange={(from, to) =>
          setDateConfig(current => ({ ...current, from, to }))
        }

        onResetFilters={() => {
          setPage(1);
          setSort({ field: 'created_at', direction: 'desc' });

          setActiveFilterKey('status');
          setActiveFilterValues([]);

          setUiSearchConfig({ field: 'all', value: '' });
          setApiSearchConfig({ field: 'all', value: '' });

          setDateConfig({ field: 'created_at' });

          setVisibleColumns(allConsultantColumns.map((c) => c.key));
        }}
      />


      {/* ========== FETCHING OVERLAY ========== */}
      {isFetching && (
        <div className="absolute inset-0 bg-white/50 z-10"></div>
      )}


      {/* ========== HANDLE DATA RENDERING ========== */}
      {isLoading ? (
        <DataTableSkeleton columnCount={visibleColumnCount + 1} />
      ) : isError ? (
        <div className="min-h-[calc(77vh)] flex flex-col items-center justify-center text-center py-10 border rounded-xl bg-white shadow-sm">
          <div className="bg-red-100 p-3 rounded-full">
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">Failed to Load Consultants</h3>
          <p className="text-muted-foreground mt-1">{error.message}</p>
        </div>
      ) : (
        <DataTable
          data={consultants}
          columns={columns}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          sortField={sort.field}
          sortDirection={sort.direction}
          onSortChange={(field, direction) => setSort({ field: field as keyof ConsultantProfile, direction })}
        renderActions={renderConsultantActions}
        />
      )}

      <Dialog 
        open={!!editingConsultant} 
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setEditingConsultant(null); // Close the dialog by clearing the state
          }
        }}
      >
        <DialogContent
          className="sm:max-w-none w-[95vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] flex flex-col p-0"
        >
          <DialogHeader className="rounded-t-lg border-b p-6 pb-4 bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shrink-0">
                <UserCog className="h-8 w-8 text-white" />
              </div>
              <div className="flex flex-col">
                <DialogTitle className="text-3xl font-bold tracking-tight text-foreground">
                  Edit Consultant Profile
                </DialogTitle>
                <DialogDescription className="text-base text-muted-foreground mt-1">
                  Update the details for {editingConsultant?.name}.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {/* The form only renders if a consultant is selected */}
            {editingConsultant && (
              <EditConsultantForm 
                consultant={editingConsultant}
                onSuccess={() => setEditingConsultant(null)} // Close dialog on success
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}