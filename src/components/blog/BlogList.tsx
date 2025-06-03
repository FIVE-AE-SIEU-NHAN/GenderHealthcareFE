import React from "react"

import BlogTableToolbar from "@/components/blog/TableToolbar"
import BlogTable from "@/components/blog/BlogTable"
import DashboardLayout from "@/components/layouts/DashboardLayout"

const blogStatusOptions = [
  { label: "Published", value: "Published" },
  { label: "Archived", value: "Archived" },
  { label: "Draft", value: "Draft" },
]

const blogColumns = ["id", "title", "status", "author", "createdAt", "description", "actions"]

export default function BlogListPage() {
  const [status, setStatus] = React.useState<string[]>([])
  const [search, setSearch] = React.useState("")
  const [visibleColumns, setVisibleColumns] = React.useState(blogColumns)
  const [fromDate, setFromDate] = React.useState<Date>()
  const [toDate, setToDate] = React.useState<Date>()

  return (
    <DashboardLayout breadcrumb={{ title: "Blog List", parent: "Blog", parentHref: "/dash/blog" }}>
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
    </DashboardLayout>
  )
}
