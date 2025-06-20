import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SalWrapper from '@/components/SalWrapper';

import { AdminRoutes } from './AdminRoutes';
// import { ManagerRoutes } from './ManagerRoutes';
// import { DoctorRoutes } from './DoctorRoutes';
import { CustomerRoutes } from './CustomerRoutes';

import PublicLayout from "@/components/layouts/PublicLayout";
import AuthLayout from "@/components/layouts//AuthLayout";
import HomePage from "@/pages/Common/Home/Homepage";
import LoginPage from '@/pages/Auth/Login/Login';
import SignupPage from '@/pages/Auth/Signup/Signup';
import ServiceDetail from '@/pages/Content/Services/ServiceDetails';
import { PrivateRoutes } from './PrivateRoutes';
import Unauthorized from '@/pages/Common/Unauthorized';
import ResetPassword from '@/pages/Auth/ForgotPassword/ResetPassword';
import ForgotPassword from '@/pages/Auth/ForgotPassword/ForgotPassword';
import NotFound from '@/pages/Common/NotFound';
import BlogPage from '@/pages/Content/Blog/BlogList';
import { Toaster } from '@/components/ui/sonner';
import BookingForm from '@/pages/Content/Services/BookingForm';
import Consultant from '@/pages/Content/Consultation/ConsultationBooking';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <SalWrapper />
      <Toaster richColors position="bottom-right" />
      
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServiceDetail />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/bookingform" element={<BookingForm />} />
            <Route path="/bookingform-consultant" element={<Consultant />} />
          </Route>

          {/* Auth Routes (things that's related to authen will be here)*/}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/unauth" element={<Unauthorized />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<NotFound />} />
          </Route>


          {/* Private Routes */}
          {PrivateRoutes}


          {/* Role-Based Dashboard Routes */}
          {AdminRoutes}
          {/* {ManagerRoutes} */}
          {/* {DoctorRoutes} */}
          {CustomerRoutes}
        </Routes>
    </BrowserRouter>
  );
}
