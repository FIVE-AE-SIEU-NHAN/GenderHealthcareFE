import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  MoreHorizontal,
  ShieldBan,
  ShieldCheck,
  UserPlus2,
  // UserX,
  XCircle,
} from "lucide-react";

import type { DashboardLayoutContext } from "@/components/layouts/Dashboard/DashboardLayout";
import TableToolbar, { FacetFilter } from "@/components/layouts/Dashboard/TableToolbar";
import { DataTable } from "@/components/layouts/Dashboard/DataTable";
import type { User } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { useUsers } from '@/hooks/admin/useUsers';
import { DataTableSkeleton } from "../DataTableSkeleton";
import { useUserMutations } from "@/hooks/admin/useUserMutations";
import { formatDate } from "@/utils/formatDate";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreateUserForm } from "./CreateUserForm";
import { USER_STATUS, USER_ROLE } from "@/Application/constants/admin/admin.userConstants";


// =============== COLUMNS FORMAT ===============
const allUserColumns = [
  {
    key: "id",
    label: "ID",
    toggleable: false,
    cellclassName: "2xl:max-w-[220px]",
    render: (user: User) => (
      <Badge variant="outline" className="font-black font-mono bg-pink-600/15">
        {user.id}
      </Badge>
    )
  },
  {
    key: "name",
    label: "Full Name",
    render: (user: User) => {
      return (
        <p className="line-clamp-2">
          {user.name}
        </p>
      );
    },
  },
  { key: "gender", 
    label: "Gender",
    render: (user: User) => {
      return (
        <p className="capitalize"> {user.gender}</p>
      )
   },
  },
  {
    key: "date_of_birth",
    label: "Date of Birth",
    render: (user: User) => {
      return formatDate(user.date_of_birth);
    }
  },
  { key: "email", label: "Email", sortable: false },
  {
    key: "role",
    label: "Role",
    sortable: false,
    render: (user: User) => {
      const roleString = USER_ROLE.UI_MAP[user.role] || 'Unknown';
      return (
        <Badge className={cn(
          "font-medium text-xs",
          roleString === "Admin" && "border-amber-500/50 bg-amber-500/10 text-amber-700",
          roleString === "Manager" && "border-blue-500/50 bg-blue-500/10 text-blue-700",
          roleString === "Customer" && "border-slate-500/50 bg-slate-500/10 text-slate-700",
          roleString === "Consultant" && "border-purple-500/50 bg-purple-500/10 text-purple-700",
        )}>
          {roleString}
        </Badge>
      );
    },
  },
  {
    key: "created_at",
    label: "Date Created",
    render: (user: User) => {
      return formatDate(user.created_at);
    }
  },
  {
    key: "verify",
    label: "Status",
    render: (user: User) => {
      const statusString = USER_STATUS.UI_MAP[user.verify] || 'Unknown';
      return (
        <Badge className={cn(
          "font-medium text-xs",
          statusString === "Active" && "border-green-500/50 bg-green-500/10 text-green-700",
          statusString === "Banned" && "border-red-500/50 bg-red-500/10 text-red-700",
          statusString === "Suspended" && "border-orange-500/50 bg-orange-500/10 text-orange-700"
        )}>
          {statusString}
        </Badge>
      );
    }
  },
];


// ========== FACET FILTERS ==========
const userFacetFilters: FacetFilter[] = [
  {
    key: "status",
    label: "Status",
    options: USER_STATUS.FILTER_OPTIONS,
  },
  {
    key: "role",
    label: "Role",
    options: USER_ROLE.FILTER_OPTIONS,
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
  { value: 'created_at', label: 'Date Created' },
  { value: 'date_of_birth', label: 'Date of Birth' },
];

// ========== SEARCHABLE FIELDS ==========
const searchableFields = [
  { value: 'all', label: 'All Fields' },
  { value: 'name', label: 'Full Name' },
  { value: 'email', label: 'Email' },
];

export default function UserListDashboard() {
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>();

  const [page, setPage] = useState(1);
  const ROWS_PER_PAGE = 10;

  const [sort, setSort] = useState<{
    field: keyof User;
    direction: 'asc' | 'desc'
  }>({ field: 'created_at', direction: 'desc' });

  const [activeFilterKey, setActiveFilterKey] = useState<string>('status');
  const [activeFilterValues, setActiveFilterValues] = useState<string[]>([]);

  const [uiSearchConfig, setUiSearchConfig] = useState({ field: 'all', value: '' });

  // 2. `apiSearchConfig`: For the API query. Updates only on submit.
  const [apiSearchConfig, setApiSearchConfig] = useState({ field: 'all', value: '' });

  const [visibleColumns, setVisibleColumns] = useState<string[]>(allUserColumns.map((col) => col.key));
  const visibleColumnCount = allUserColumns.filter(c => visibleColumns.includes(c.key)).length;

  const [activeDateFilterKey, setActiveDateFilterKey] = useState('created_at');
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { editStatus: editUserStatusMutation } = useUserMutations();

  // ========== SET BREADCRUMB ==========
  useEffect(() => {
    setBreadcrumb({
      title: "User Management",
      parent: "Admin",
      parentHref: "/admin/dashboard",
    });
  }, [setBreadcrumb]);




  // ========== API FILTERS ==========
  const apiFilters = useMemo(() => {
    if (activeFilterValues.length === 0) return {};
    return { [activeFilterKey]: activeFilterValues };
  }, [activeFilterKey, activeFilterValues]);

  useEffect(() => {
    setPage(1);
  }, [apiFilters, apiSearchConfig, sort, fromDate, toDate, activeDateFilterKey]);

  const handleSearchSubmit = () => {
    setApiSearchConfig(uiSearchConfig);
  };

  // ========== USE USERS HOOK ==========
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
  } = useUsers({
    page,
    limit: ROWS_PER_PAGE,
    filters: apiFilters,
    search: apiSearchConfig,
    sort,
    dateRange: { field: activeDateFilterKey, from: fromDate, to: toDate },
  });

  const users = data?.data ?? [];
  const totalUsers = data?.total ?? 0;
  const totalPages = Math.ceil(totalUsers / ROWS_PER_PAGE);





  // ========== COLUMNS SETUP ==========
  // Map all user columns to the format expected by DataTable
  const columns = useMemo(() => {
    return allUserColumns.map((col) => ({
      key: col.key as keyof User,
      label: col.label,
      visible: visibleColumns.includes(col.key),
      sortable: col.sortable,
      cellClassName: col.cellclassName,
      render: col.render,
    }));
  }, [visibleColumns]);



  // ========== ACTIONS ==========
  const renderUserActions = useCallback((user: User) => {
    const statusString = USER_STATUS.UI_MAP[user.verify] || 'Unknown';
    const isMutatingThisUser =
      editUserStatusMutation.isPending &&
      editUserStatusMutation.variables?.userId === user.id;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={isMutatingThisUser}>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            {isMutatingThisUser ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <MoreHorizontal className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => alert(`Viewing profile for ${user.name}`)}>
            View Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          {statusString === 'Banned' && (
            <DropdownMenuItem
              className="text-green-600 focus:bg-green-50 focus:text-green-700"
              onClick={() => editUserStatusMutation.mutate({ userId: user.id, status: 0 })}
            >
              <ShieldCheck className="mr-2 h-4 w-4" />
              Activate User
            </DropdownMenuItem>
          )}

          {statusString === 'Active' && (
            <DropdownMenuItem
              className="text-red-600 focus:bg-red-50 focus:text-red-700"
              onClick={() => editUserStatusMutation.mutate({ userId: user.id, status: 1 })}
            >
              <ShieldBan className="mr-2 h-4 w-4" />
              Ban User
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }, [editUserStatusMutation]);




  return (
    <>
      <TableToolbar
        isFetching={isFetching && !isLoading}

        facetFilters={userFacetFilters}
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
        // 4. Pass the new submit handler to the toolbar.
        onSearchSubmit={handleSearchSubmit}

        columns={allUserColumns}
        visibleColumns={visibleColumns}
        onVisibleColumnsChange={setVisibleColumns}


        dateFilterOptions={dateFilterOptions}
        activeDateFilterKey={activeDateFilterKey}
        onActiveDateFilterKeyChange={setActiveDateFilterKey}
        fromDate={fromDate}
        toDate={toDate}
        onDateRangeChange={(from, to) => {
          setFromDate(from);
          setToDate(to);
        }}

        onResetFilters={() => {
          setPage(1);
          setSort({ field: 'created_at', direction: 'desc' });

          setActiveFilterKey('status');
          setActiveFilterValues([]);

          setUiSearchConfig({ field: 'all', value: '' });
          setApiSearchConfig({ field: 'all', value: '' });
          
          setActiveDateFilterKey('created_at');
          setFromDate(undefined);
          setToDate(undefined);
          
          setVisibleColumns(allUserColumns.map((c) => c.key));
        }}
        onCreate={() => setIsCreateDialogOpen(true)}
        createButtonLabel="+ ADD USER"
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
          <h3 className="mt-4 text-lg font-semibold">Failed to Load Users</h3>
          <p className="text-muted-foreground mt-1">{error.message}</p>
        </div>
      ) : (
        <DataTable
          data={users}
          columns={columns}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          sortField={sort.field}
          sortDirection={sort.direction}
          onSortChange={(field, direction) => setSort({ field: field as keyof User, direction })}
          renderActions={renderUserActions}
        />
      )}

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent
          className="sm:max-w-none w-[95vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] flex flex-col p-0 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out"
          onInteractOutside={(e) => {
            // Prevent closing when clicking outside if the mutation is running
            if (editUserStatusMutation.isPending) {
              e.preventDefault();
            }
          }}
        >
          {/* Dialog Header */}
          <DialogHeader className="rounded-t-lg border-b p-6 pb-4 bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center shrink-0">
                <UserPlus2 className="h-8 w-8 text-white" />
              </div>
              <div className="flex flex-col">
                <DialogTitle className="text-3xl font-bold tracking-tight text-foreground">
                  Add New User
                </DialogTitle>
                <DialogDescription className="text-base text-muted-foreground mt-1">
                  Fill out the form below to create a new user account.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Form Content Area */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <CreateUserForm onSuccess={() => setIsCreateDialogOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}