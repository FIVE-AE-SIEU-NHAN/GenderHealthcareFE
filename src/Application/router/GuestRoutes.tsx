// src/app/router/GuestRoutes.tsx
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Common/Home/Homepage";
// import Blog from "@/pages/Content/Blog";
// import QA from "@/pages/QA/QA";

const GuestRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      {/* <Route path="blog" element={<Blog />} />
      <Route path="qa" element={<QA />} /> */}
    </Routes>
  );
};

export default GuestRoutes;
