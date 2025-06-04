import { Outlet } from "react-router-dom";
import Navbar from "./NavFoot/Navbar";

const AuthLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default AuthLayout;
