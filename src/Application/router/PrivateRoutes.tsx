// src/Application/router/ProtectedRoutes.tsx

import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import BookingForm from "@/pages/Content/Services/BookingForm";
import NavFootLayout from "@/components/layouts/NavFoot/NavFootLayout";
import AskQuestion from "@/pages/Customer/Question/AskQuestionForm";

export const PrivateRoutes = (
  <Route
    element={
      <ProtectedRoute
        allowedRoles={['Admin', 'Consultant', 'Manager', 'Customer']}
      >
      </ProtectedRoute>
    }
  >
    <Route element={<NavFootLayout />}>
      <Route path="/booking-form" element={<BookingForm />} />
      <Route path="/ask-question" element={<AskQuestion />} />
      {/* Add more private routes here */}
    </Route>
    <Route path="/hehe" element={<div>HEHEHEHHEHEHEHHE</div>} />
  </Route>
);
