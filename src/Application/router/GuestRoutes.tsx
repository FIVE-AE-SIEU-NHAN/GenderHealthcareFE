import { Route } from "react-router-dom"
import PublicLayout from "@/components/layouts/PublicLayout"
import HomePage from "@/pages/Common/Home/Homepage"
import BlogPage from "@/pages/Content/Blog/BlogList"

export const GuestRoutes = (
  <Route element={<PublicLayout />}>
    <Route index element={<HomePage />} />
    <Route path="/blog" element={<BlogPage />} />
    {/* Add more public pages as needed */}
  </Route>
)
