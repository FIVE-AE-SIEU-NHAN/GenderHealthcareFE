import BlogTableToolbar from "@/components/blog/BlogTableToolbar"
import BlogTable from "@/components/blog/BlogTable"
import DashboardLayout from "@/components/layouts/DashboardLayout"

export default function BlogListPage() {
  return (
    <DashboardLayout breadcrumb={{ title: "Blog List", parent: "Blog", parentHref: "/dash/blog" }}>
      <BlogTableToolbar />
      <BlogTable />
    </DashboardLayout>
  )
}
