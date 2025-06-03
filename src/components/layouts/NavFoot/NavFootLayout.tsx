import Navbar from "@/components/layouts/NavFoot/Navbar";
import Footer from "@/components/layouts/NavFoot/Footer";
import { Outlet } from "react-router-dom";

export default function NavFootLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
