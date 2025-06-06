import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { DashboardLayoutContext } from "@/components/layouts/Dashboard/DashboardLayout";

import BlogTableToolbar from "@/components/layouts/Dashboard/TableToolbar";
import { DataTable } from "@/components/layouts/Dashboard/DataTable";
import type { Blog } from "@/types";

const blogData: Blog[] = [
  {
    id: "85",
    createdAt: "03/01/2025",
    author: "Cynthia Sullivan",
    title: "Title goes here 82",
    description: "broke fought newspaper movie increase break determine barn came bark sheet white travel statement or loud local long burn rich great shaking fresh view",
    status: "Archived",
  },
  {
    id: "18",
    createdAt: "12/11/2025",
    author: "Billy Norris",
    title: "Title goes here 35",
    description: "ship statement write excitement lower valley movie special twice sink greatly here vast battle ring tired audience buried beauty along believed earlier east powder",
    status: "Draft",
  },
  {
    id: "81",
    createdAt: "02/06/2025",
    author: "Charles Porter",
    title: "Title goes here 58",
    description: "begun branch making promised learn class information coffee youth only final piano snow it period rope car thee matter exist salmon partly safety future",
    status: "Published",
  },
  {
    id: "74",
    createdAt: "18/10/2025",
    author: "Glenn Horton",
    title: "Title goes here 88",
    description: "spent root itself pattern inch flow calm gave enter dollar worth length has hurry gift sight cowboy speed generally uncle factor deep model century",
    status: "Published",
  },
  {
    id: "9",
    createdAt: "24/04/2025",
    author: "Harvey Reeves",
    title: "Title goes here 4",
    description: "deal welcome everything rest military pattern breeze rays vertical gentle widely correct cold result army pink steep team winter vote industry operation written slowly",
    status: "Archived",
  },
  {
    id: "27",
    createdAt: "12/04/2041",
    author: "Isaac Cortez",
    title: "Title goes here 55",
    description: "anywhere ordinary mostly quite become smoke colony wrapped method orbit service tomorrow motion cream plan single machine aboard note excellent farther forgot my principal",
    status: "Published",
  },
  {
    id: "21",
    createdAt: "25/02/2114",
    author: "Edward Curtis",
    title: "Title goes here 18",
    description: "rough shaking garage speed occur sold brush am tin main conversation brave below minerals movie family recent her instant little include music immediately or",
    status: "Archived",
  },
  {
    id: "1",
    createdAt: "18/08/2047",
    author: "Tommy Fuller",
    title: "Title goes here 37",
    description: "globe name driven circle business friend activity entirely drove sell station shirt excited together health right driver leaf first actual turn doctor closer either",
    status: "Archived",
  },
  {
    id: "72",
    createdAt: "19/04/2078",
    author: "Hulda Holmes",
    title: "Title goes here 17",
    description: "butter planet old sail hundred material two nearby newspaper sunlight leaving call from dear quiet route gulf twice putting remarkable scale tin scientist subject",
    status: "Published",
  },
  {
    id: "16",
    createdAt: "24/03/2040",
    author: "Albert Norton",
    title: "Title goes here 73",
    description: "tongue further seeing court station numeral particularly table minerals become negative thick jack cause plastic effect go figure replied sat usually direct ill whispered",
    status: "Published",
  },
  {
    id: "201",
    createdAt: "24/03/2040",
    author: "Albert Norton",
    title: "Title goes here 73",
    description: "tongue further seeing court station numeral particularly table minerals become negative thick jack cause plastic effect go figure replied sat usually direct ill whispered",
    status: "Published",
  },
  {
    id: "202",
    createdAt: "24/03/2040",
    author: "Albert Norton",
    title: "Title goes here 73",
    description: "tongue further seeing court station numeral particularly table minerals become negative thick jack cause plastic effect go figure replied sat usually direct ill whispered",
    status: "Published",
  },
  {
    id: "203",
    createdAt: "24/03/2040",
    author: "Albert Norton",
    title: "Title goes here 73",
    description: "tongue further seeing court station numeral particularly table minerals become negative thick jack cause plastic effect go figure replied sat usually direct ill whispered",
    status: "Published",
  },
  {
    id: "204",
    createdAt: "24/03/2040",
    author: "Albert Norton",
    title: "Title goes here 73",
    description: "tongue further seeing court station numeral particularly table minerals become negative thick jack cause plastic effect go figure replied sat usually direct ill whispered",
    status: "Published",
  },
];

// Column keys you want to support toggling
const allBlogColumns = [
  { key: "id", label: "ID", visible: true, sortable: true },
  { key: "createdAt", label: "Date", visible: true, sortable: true },
  { key: "author", label: "Author", visible: true, sortable: true },
  { key: "title", label: "Title", visible: true, sortable: false },
  { key: "description", label: "Description", visible: true, sortable: false },
  { key: "status", label: "Status", visible: true, sortable: true },
]

const blogStatusOptions = [
  { label: "Published", value: "Published" },
  { label: "Archived", value: "Archived" },
  { label: "Draft", value: "Draft" },
];

const searchableFields = [
  // The `value` here MUST match a key in types/...ts 
  { value: 'all', label: 'All Fields' }, 
  { value: 'title', label: 'Title' },
  { value: 'author', label: 'Author' },
  { value: 'description', label: 'Description' },
];

export default function BlogListDashboard() {
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>();

  const [status, setStatus] = useState<string[]>([]);
  
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    allBlogColumns.map((col) => col.key)
  );

  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  
  const [searchField, setSearchField] = useState(searchableFields[0].value);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setBreadcrumb({
      title: "Blog Management",
      parent: "Admin",
      parentHref: "",
    });
  }, [setBreadcrumb]);

  // Generate column definitions based on visibleColumns
  const columns = allBlogColumns.map((col) => ({
    key: col.key as keyof Blog,
    label: col.label,
    visible: visibleColumns.includes(col.key),
    sortable: col.sortable ?? true,
  }));

  return (
    <>
      <BlogTableToolbar
        statusPlaceholder="Status"
        statusOptions={blogStatusOptions}
        statusValue={status}
        onStatusChange={setStatus}

        searchValue={search}
        onSearchChange={(val) => setSearch(val)}
        
        searchFieldOptions={searchableFields}
        searchFieldValue={searchField}
        onSearchFieldChange={setSearchField}

        columns={allBlogColumns.map((c) => c.key)}
        visibleColumns={visibleColumns}
        onVisibleColumnsChange={setVisibleColumns}
        fromDate={fromDate}
        toDate={toDate}
        onDateRangeChange={(from, to) => {
          setFromDate(from);
          setToDate(to);
        }}
        onResetFilters={() => {
          setStatus([]);
          setSearch("");
          setFromDate(undefined);
          setToDate(undefined);
          setVisibleColumns(allBlogColumns.map((c) => c.key));
          setSearchField(searchableFields[0].value);
        }}
        onCreate={() => {
          // Handle blog creation logic here
        }}
        createButtonLabel="+ CREATE BLOG"
      />

      <DataTable
        data={blogData}
        columns={columns}
        search={search}
        searchField={searchField as keyof Blog}
        statusFilter={status}
        dateRange={{ from: fromDate, to: toDate }}
        rowsPerPage={10}
        onEdit={(item) => {
          console.log("Edit Blog:", item);
        }}
        onDelete={(item) => {
          console.log("Delete Blog:", item);
        }}
      />
    </>
  );
}
