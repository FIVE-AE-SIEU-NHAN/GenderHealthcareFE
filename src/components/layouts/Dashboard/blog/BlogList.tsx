import React from "react"

import BlogTableToolbar from "@/components/layouts/Dashboard/TableToolbar"
import BlogTable from "@/components/layouts/Dashboard/blog/BlogTable"
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import type { DashboardLayoutContext } from "@/components/layouts/Dashboard/DashboardLayout";
// import DashboardLayout from "@/components/layouts/Dashboard/DashboardLayout"
// import { adminSidebarItems } from "@/Application/constants/adminSidebarItems"

const blogStatusOptions = [
  { label: "Published", value: "Published" },
  { label: "Archived", value: "Archived" },
  { label: "Draft", value: "Draft" },
]

const blogColumns = ["id", "title", "status", "author", "createdAt", "description", "actions"]

export default function BlogListDashboard() {
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>();
  const [status, setStatus] = React.useState<string[]>([])
  const [search, setSearch] = React.useState("")
  const [visibleColumns, setVisibleColumns] = React.useState(blogColumns)
  const [fromDate, setFromDate] = React.useState<Date>()
  const [toDate, setToDate] = React.useState<Date>()


  useEffect(() => {
    setBreadcrumb({
      title: "Blog List",
      parent: "Blog",
      parentHref: "",
    });
  }, [setBreadcrumb]);
  return (
    <>
      {/* <DashboardLayout
        sidebarItems={adminSidebarItems}
        breadcrumb={{ title: "Blog List", parent: "Blog", parentHref: "" }}> */}
      <BlogTableToolbar
        statusPlaceholder="Status"
        statusOptions={blogStatusOptions}
        statusValue={status}
        onStatusChange={setStatus}
        searchValue={search}
        onSearchChange={setSearch}
        columns={blogColumns}
        visibleColumns={visibleColumns}
        onVisibleColumnsChange={setVisibleColumns}
        fromDate={fromDate}
        toDate={toDate}
        onDateRangeChange={(from, to) => {
          setFromDate(from)
          setToDate(to)
        }}
        onResetFilters={() => {
          setStatus([])
          setSearch("")
          setFromDate(undefined)
          setToDate(undefined)
          setVisibleColumns(blogColumns)
        }}
        onCreate={() => {
          // handle create blog
        }}
        createButtonLabel="+ CREATE BLOG"
      />
      <BlogTable
        status={status}
        search={search}
        dateRange={{ from: fromDate, to: toDate }}
        visibleColumns={visibleColumns}
      />
    {/* </DashboardLayout> */ }

    </>
  )
}
