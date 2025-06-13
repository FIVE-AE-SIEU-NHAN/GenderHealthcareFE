import React, { useEffect, useMemo, useState } from "react";
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
  MoreHorizontal,
  ShieldBan,
  ShieldCheck,
  UserX,
  XCircle,
} from "lucide-react";

import type { DashboardLayoutContext } from "@/components/layouts/Dashboard/DashboardLayout";
import TableToolbar, { FacetFilter } from "@/components/layouts/Dashboard/TableToolbar";
import { DataTable } from "@/components/layouts/Dashboard/DataTable";
import type { User } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { useUsers } from '@/hooks/useUsersDashboard';
import { DataTableSkeleton } from "../DataTableSkeleton";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

// 3. Define the column configuration for Users
const allUserColumns = [
  {
    key: "id",
    label: "ID",
    toggleable: false,
    render: (user: User) => (
      <Badge variant="outline" className="font-mono bg-emerald-400/15">
        {user.id}
      </Badge>
    )
  },
  { key: "fullName", label: "Full Name" },
  { key: "email", label: "Email" },
  {
    key: "role",
    label: "Role",
    sortable: false,
    render: (user: User) => (
      <Badge className={cn(
        "font-medium text-xs",
        user.role === "Admin" && "border-amber-500/50 bg-amber-500/10 text-amber-700",
        user.role === "Manager" && "border-blue-500/50 bg-blue-500/10 text-blue-700",
        user.role === "Customer" && "border-slate-500/50 bg-slate-500/10 text-slate-700",
        user.role === "Doctor" && "border-purple-500/50 bg-purple-500/10 text-purple-700",
      )}>
        {user.role}
      </Badge>
    ),
  },
  { key: "createdAt", label: "Date Created" },
  {
    key: "status",
    label: "Status",
    render: (user: User) => (
      <Badge className={cn(
        "font-medium text-xs",
        user.status === "Active" && "border-green-500/50 bg-green-500/10 text-green-700",
        user.status === "Banned" && "border-red-500/50 bg-red-500/10 text-red-700",
        user.status === "Suspended" && "border-orange-500/50 bg-orange-500/10 text-orange-700"
      )}>
        {user.status}
      </Badge>
    )
  },
];

// 4. Define filter and search options for Users
const userFacetFilters: FacetFilter[] = [
  {
    key: "status",
    label: "Status",
    options: [
      { label: "Active", value: "Active" },
      { label: "Banned", value: "Banned" },
      { label: "Suspended", value: "Suspended" },
    ],
  },
  {
    key: "role",
    label: "Role",
    options: [
      { label: "Admin", value: "Admin" },
      { label: "Manager", value: "Manager" },
      { label: "Doctor", value: "Doctor" },
      { label: "Customer", value: "Customer" },
    ],
  },
];

const searchableFields = [
  { value: 'all', label: 'All Fields' },
  { value: 'fullName', label: 'Full Name' },
  { value: 'email', label: 'Email' },
  { value: 'role', label: 'Role' },
];

export default function UserListDashboard() {
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>();

  const [page, setPage] = useState(1);
  const ROWS_PER_PAGE = 10;

  const [sort, setSort] = useState<{
    field: keyof User;
    direction: 'asc' | 'desc'
  }>({ field: 'id', direction: 'asc' });

  const [activeFilterKey, setActiveFilterKey] = useState<string>('status');
  const [activeFilterValues, setActiveFilterValues] = useState<string[]>([]);

  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState('all');
  const debouncedSearch = useDebounce(search, 300);

  const [visibleColumns, setVisibleColumns] = useState<string[]>(allUserColumns.map((col) => col.key));
  const visibleColumnCount = allUserColumns.filter(c => visibleColumns.includes(c.key)).length;

  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();


  useEffect(() => {
    setBreadcrumb({
      title: "User Management",
      parent: "Admin",
      parentHref: "/admin/dashboard",
    });
  }, [setBreadcrumb]);

  const apiFilters = useMemo(() => {
    if (activeFilterValues.length === 0) return {};
    // json-server handles multiple values for the same key like: ?status=Active&status=Banned
    return { [activeFilterKey]: activeFilterValues };
  }, [activeFilterKey, activeFilterValues]);

  useEffect(() => {
    setPage(1);
  }, [apiFilters, debouncedSearch, sort]);

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
    search: { field: searchField, value: debouncedSearch },
    sort,
  });

  const users = data?.data ?? [];
  const totalUsers = data?.total ?? 0;
  const totalPages = Math.ceil(totalUsers / ROWS_PER_PAGE);

  const columns = allUserColumns.map((col) => ({
    key: col.key as keyof User,
    label: col.label,
    visible: visibleColumns.includes(col.key),
    sortable: col.sortable ?? true,
    render: col.render,
  }));

  const renderUserActions = (user: User) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => alert(`Viewing profile for ${user.fullName}`)}>
          View Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {user.status !== "Active" && (
          <DropdownMenuItem className="text-green-600 focus:bg-green-50 focus:text-green-700" onClick={() => alert(`Activating ${user.fullName}`)}>
            <ShieldCheck className="mr-2 h-4 w-4" />
            Activate User
          </DropdownMenuItem>
        )}
        {user.status !== "Suspended" && (
          <DropdownMenuItem className="text-orange-600 focus:bg-orange-50 focus:text-orange-700" onClick={() => alert(`Suspending ${user.fullName}`)}>
            <UserX className="mr-2 h-4 w-4" />
            Suspend User
          </DropdownMenuItem>
        )}
        {user.status !== "Banned" && (
          <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-700" onClick={() => alert(`Banning ${user.fullName}`)}>
            <ShieldBan className="mr-2 h-4 w-4" />
            Ban User
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );


  return (
    <>
      <TableToolbar
        isFetching={isFetching && !isLoading}
        facetFilters={userFacetFilters}
        activeFilterKey={activeFilterKey}
        onActiveFilterKeyChange={setActiveFilterKey}
        activeFilterValues={activeFilterValues}
        onActiveFilterValuesChange={setActiveFilterValues}

        searchValue={search}
        onSearchChange={setSearch}
        searchFieldOptions={searchableFields}
        searchFieldValue={searchField}
        onSearchFieldChange={setSearchField}

        columns={allUserColumns}
        visibleColumns={visibleColumns}
        onVisibleColumnsChange={setVisibleColumns}

        fromDate={fromDate}
        toDate={toDate}
        onDateRangeChange={(from, to) => {
          setFromDate(from);
          setToDate(to);
        }}

        onResetFilters={() => {
          setPage(1);
          setSort({ field: 'id', direction: 'asc' });

          setActiveFilterKey('status');
          setActiveFilterValues([]);

          setSearch("");
          setSearchField(searchableFields[0].value);

          setFromDate(undefined);
          setToDate(undefined);

          setVisibleColumns(allUserColumns.map((c) => c.key));
        }}
        onCreate={() => alert("Opening form to add a new user...")}
        createButtonLabel="+ ADD USER"
      />

      {/* Loading overlay while fetching */}
      {isFetching && (
        <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
        </div>
      )}

      {isLoading ? (
        <DataTableSkeleton columnCount={ visibleColumnCount + 1 } />
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
    </>
  );
}