// src/Application/router/ProtectedRoutes.tsx

import { Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

import NavFootLayout from '@/components/layouts/NavFoot/NavFootLayout'
import AskQuestion from '@/pages/Customer/Question/AskQuestionForm'
import BlogDetails from '@/pages/Content/Blog/BlogDetails'
import ConsultantAppointmentPage from '@/pages/Content/Consultation/ConsultationBookingPage'
import ServiceBookingPage from '@/pages/Content/Services/ServiceBookingPage'

export const PrivateRoutes = (
  <Route element={<ProtectedRoute allowedRoles={['Admin', 'Consultant', 'Manager', 'Customer']}></ProtectedRoute>}>
    <Route element={<NavFootLayout />}>
      <Route path='/ask-question' element={<AskQuestion />} />
      <Route path='/blogs/:id' element={<BlogDetails />} />
      <Route path='/book-service' element={<ServiceBookingPage />} />
      <Route path='/book-consultant' element={<ConsultantAppointmentPage />} />
    </Route>
    <Route path='/hehe' element={<div>HEHEHEHHEHEHEHHE</div>} />
  </Route>
)
