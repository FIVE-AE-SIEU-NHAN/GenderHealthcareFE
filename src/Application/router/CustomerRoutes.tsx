import { Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import DashboardLayout from '@/components/layouts/Dashboard/DashboardLayout' // Re-use the same layout
import CustomerDashboard from '@/pages/Customer/Dashboard'
import { customerSidebarItems } from '@/Application/constants/customer/customerSidebarItems'
import AppointmentHistory from '@/pages/Customer/Appointment/AppointmentHistory'
import QuestionListDashboard from '@/pages/Customer/Question/QuestionList'
import CustomerProfilePage from '@/pages/Customer/Profile/Profile'
import CycleTrackingPage from '@/pages/Customer/Cycle/CycleTracking'

export const CustomerRoutes = (
  <Route path='/user' element={<DashboardLayout sidebarItems={customerSidebarItems} />}>
    <Route element={<ProtectedRoute allowedRoles={['Customer']} />}>
      <Route index element={<CustomerDashboard />} />
      <Route path='appointments' element={<AppointmentHistory />} />
      <Route path='questions' element={<QuestionListDashboard />} />
      <Route path='profile' element={<CustomerProfilePage />} />
      <Route path='cycle-tracking' element={<CycleTrackingPage />} />
    </Route>
  </Route>
)
