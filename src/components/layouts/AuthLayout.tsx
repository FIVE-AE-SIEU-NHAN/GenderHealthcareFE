import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 shadow-lg bg-white rounded-xl">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
