// src/Application/router/ProtectedRoutes.tsx

import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { UserRole } from "@/types/UserRole";

import BookingForm from "@/pages/Content/Services/BookingForm";
import NavFootLayout from "@/components/layouts/NavFoot/NavFootLayout";

export const PrivateRoutes = (
  <Route
    element={
      <ProtectedRoute
        allowedRoles={[
          UserRole.Admin,
          UserRole.Customer,
          UserRole.Manager,
          UserRole.Doctor,
        ]}
      >
        {/* Add a layout wrapper here if needed */}
      </ProtectedRoute>
    }
  >
    <Route element={<NavFootLayout />}>
      <Route path="/booking-form" element={<BookingForm />} />
      {/* Add more private routes here */}
    </Route>
    <Route path="/hehe" element={<div>HEHEHEHHEHEHEHHE</div>} />
  </Route>
);
