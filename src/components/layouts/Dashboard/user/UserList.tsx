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
} from "lucide-react";

import type { DashboardLayoutContext } from "@/components/layouts/Dashboard/DashboardLayout";
import TableToolbar, { FacetFilter } from "@/components/layouts/Dashboard/TableToolbar";
import { DataTable } from "@/components/layouts/Dashboard/DataTable";
import type { User } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";


// 2. Create mock user data
const userData: User[] = [
  { id: "1", fullName: "Alice Johnson", email: "alice@example.com", role: "Admin", createdAt: "15/07/2024", status: "Active" },
  { id: "2", fullName: "Bob Williams", email: "bob@example.com", role: "Customer", createdAt: "14/07/2024", status: "Active" },
  { id: "3", fullName: "Charlie Brown", email: "charlie@example.com", role: "Doctor", createdAt: "13/07/2024", status: "Banned" },
  { id: "4", fullName: "Diana Miller", email: "diana@example.com", role: "Manager", createdAt: "12/07/2024", status: "Active" },
  { id: "5", fullName: "Ethan Davis", email: "ethan@example.com", role: "Customer", createdAt: "11/07/2024", status: "Suspended" },
  { id: "6", fullName: "Fiona Taylor", email: "fiona@example.com", role: "Doctor", createdAt: "10/07/2024", status: "Active" },
  { id: "7", fullName: "George Harris", email: "george@example.com", role: "Manager", createdAt: "09/07/2024", status: "Banned" },
  { id: "8", fullName: "Hannah Moore", email: "hannah@example.com", role: "Customer", createdAt: "08/07/2024", status: "Active" },
  { id: "9", fullName: "Ian Thompson", email: "ian@example.com", role: "Admin", createdAt: "07/07/2024", status: "Suspended" },
  { id: "10", fullName: "Jane Clark", email: "jane@example.com", role: "Customer", createdAt: "06/07/2024", status: "Active" },
  { id: "11", fullName: "Kevin Lewis", email: "kevin@example.com", role: "Doctor", createdAt: "05/07/2024", status: "Active" },
  { id: "12", fullName: "Lily Walker", email: "lily@example.com", role: "Manager", createdAt: "04/07/2024", status: "Suspended" },
  { id: "13", fullName: "Michael Hall", email: "michael@example.com", role: "Admin", createdAt: "03/07/2024", status: "Active" },
  { id: "14", fullName: "Nora Young", email: "nora@example.com", role: "Customer", createdAt: "02/07/2024", status: "Banned" },
  { id: "15", fullName: "Owen King", email: "owen@example.com", role: "Doctor", createdAt: "01/07/2024", status: "Active" },
  { id: "16", fullName: "Paula Scott", email: "paula@example.com", role: "Manager", createdAt: "30/06/2024", status: "Suspended" },
  { id: "17", fullName: "Quinn Green", email: "quinn@example.com", role: "Customer", createdAt: "29/06/2024", status: "Active" },
  { id: "18", fullName: "Ryan Adams", email: "ryan@example.com", role: "Doctor", createdAt: "28/06/2024", status: "Banned" },
  { id: "19", fullName: "Sophie Baker", email: "sophie@example.com", role: "Admin", createdAt: "27/06/2024", status: "Active" },
  { id: "20", fullName: "Thomas Carter", email: "thomas@example.com", role: "Customer", createdAt: "26/06/2024", status: "Active" },
  { id: "21", fullName: "Uma Nelson", email: "uma@example.com", role: "Manager", createdAt: "25/06/2024", status: "Suspended" },
  { id: "22", fullName: "Victor Allen", email: "victor@example.com", role: "Doctor", createdAt: "24/06/2024", status: "Banned" },
  { id: "23", fullName: "Wendy Evans", email: "wendy@example.com", role: "Customer", createdAt: "23/06/2024", status: "Active" },
];

// 3. Define the column configuration for Users
const allUserColumns = [
  {
    key: "id",
    label: "ID",
    toggleable: false,
    sortable: true,
    render: (user: User) => (
      <Badge variant="outline" className="font-mono bg-emerald-400/15">
        {user.id}
      </Badge>
    )
  },
  { key: "fullName", label: "Full Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
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
  { key: "createdAt", label: "Date Created", sortable: true },
  {
    key: "status",
    label: "Status",
    sortable: true,
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

  const [search, setSearch] = useState("");

  const [activeFilterKey, setActiveFilterKey] = useState<string>(userFacetFilters[0].key);
  const [activeFilterValues, setActiveFilterValues] = useState<string[]>([]);

  const [searchField, setSearchField] = useState(searchableFields[0].value);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(allUserColumns.map((col) => col.key));
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();

  useEffect(() => {
    setBreadcrumb({
      title: "User Management",
      parent: "Admin",
      parentHref: "/admin/dashboard",
    });
  }, [setBreadcrumb]);

  const filteredData = useMemo(() => {
    return userData.filter(user => {
      if (activeFilterValues.length === 0) {
        return true;
      }
      const userValue = user[activeFilterKey as keyof User];
      return activeFilterValues.includes(userValue);
    });
  }, [userData, activeFilterKey, activeFilterValues]);

  // Generate column definitions based on visibility state
  const columns = allUserColumns.map((col) => ({
    key: col.key as keyof User,
    label: col.label,
    visible: visibleColumns.includes(col.key),
    sortable: col.sortable ?? true,
    render: col.render,
  }));

  // --- 5. Define the JSX for the custom actions column ---
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
          setActiveFilterKey(userFacetFilters[0].key);
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

      <DataTable
        data={filteredData}
        columns={columns}
        search={search}
        searchField={searchField as keyof User}
        dateRange={{ from: fromDate, to: toDate }}
        rowsPerPage={10}
        // onEdit={(item) => alert(`Editing user: ${item.fullName}`)}
        renderActions={renderUserActions}
      />
    </>
  );
}