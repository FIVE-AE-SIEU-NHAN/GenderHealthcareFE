import { Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import DashboardLayout from '@/components/layouts/Dashboard/DashboardLayout' // Re-use the same layout
import CustomerDashboard from '@/pages/Customer/Dashboard'
import BlogListDashboard from '@/pages/Doctor/Blogs/BlogList'
import { doctorSidebarItems } from '../constants/doctor/doctorSidebarItems'
import DoctorProfilePage from '@/pages/Doctor/Profile/Profile'
import DoctorServiceAppointmentCalendar from '@/pages/Doctor/Appointments/ServiceAppointments'

export const DoctorRoutes = (
  <Route path='/doctor' element={<DashboardLayout sidebarItems={doctorSidebarItems} />}>
    <Route element={<ProtectedRoute allowedRoles={['Doctor']} />}>
      <Route index element={<CustomerDashboard />} />
      <Route path='service-appointments' element={<DoctorServiceAppointmentCalendar />} />
      <Route path='blogs' element={<BlogListDashboard />} />
      <Route path='profile' element={<DoctorProfilePage />} />
    </Route>
  </Route>
)
