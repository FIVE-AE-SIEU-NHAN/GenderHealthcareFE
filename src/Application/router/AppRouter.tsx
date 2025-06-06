import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SalWrapper from '@/components/SalWrapper';

import { AdminRoutes } from './AdminRoutes';
// import { ManagerRoutes } from './ManagerRoutes';
// import { DoctorRoutes } from './DoctorRoutes';
import { CustomerRoutes } from './CustomerRoutes';
// import { GuestRoutes } from './GuestRoutes';

import PublicLayout from "@/components/layouts/PublicLayout";
import AuthLayout from "@/components/layouts//AuthLayout";
import HomePage from "@/pages/Common/Home/Homepage";
import LoginPage from '@/pages/Auth/Login/Login';
import SignupPage from '@/pages/Auth/Signup/Signup';
import RoleSwitcher from '@/components/RoleSwitcher';
import ServiceDetail from '@/pages/Content/Services/ServiceDetails';
import { PrivateRoutes } from './PrivateRoutes';
import Unauthorized from '@/pages/Common/Unauthorized';
import BlogPage from "@/pages/Content/Blog/BlogList"
import BlogDetails from "@/pages/Content/Blog/BlogDetails"
export default function AppRouter() {
  return (
    <BrowserRouter>
      <SalWrapper />
      <RoleSwitcher />

      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServiceDetail />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
        </Route>

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/unauth" element={<Unauthorized />} />
        </Route>

        {/* Private Routes */}
        {PrivateRoutes}

        {/* Role-Based Dashboard Routes */}
        {AdminRoutes}
        {/* {ManagerRoutes} */}
        {/* {DoctorRoutes} */}
        {CustomerRoutes}
        {/* {GuestRoutes} */}
      </Routes>
    </BrowserRouter>
  );
}
