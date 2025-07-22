import { Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import DashboardLayout from '@/components/layouts/Dashboard/DashboardLayout' // Re-use the same layout
import { managerSidebarItems } from '@/Application/constants/manager/managerSidebarItems'
import QuestionListDashboard from '@/pages/Manager/Questions/QuestionList'
import ManagerDashboard from '@/pages/Manager/Dashboard'
import ConsultantListDashboard from '@/pages/Manager/ConsultantManagement/ConsultantsList'
import AppointmentCalendar from '@/pages/Manager/Appointments/AppointmentCalendar'
import BlogListDashboard from '@/pages/Manager/Blogs/BlogList'
import DoctorListDashboard from '@/pages/Manager/DoctorManagement/DoctorsList'

export const ManagerRoutes = (
  <Route path='/manager' element={<DashboardLayout sidebarItems={managerSidebarItems} />}>
    <Route element={<ProtectedRoute allowedRoles={['Manager']} />}>
      <Route index element={<ManagerDashboard />} />
      <Route path='questions' element={<QuestionListDashboard />} />
      <Route path='consultants' element={<ConsultantListDashboard />} />
      <Route path='appointments' element={<AppointmentCalendar />} />
      <Route path='blogs' element={<BlogListDashboard />} />
      <Route path='doctors' element={<DoctorListDashboard />} />
    </Route>
  </Route>
)
