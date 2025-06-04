import { Outlet } from "react-router-dom";
import Navbar from "./NavFoot/Navbar";
import Footer from "./NavFoot/Footer";

const PublicLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="main">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default PublicLayout;
