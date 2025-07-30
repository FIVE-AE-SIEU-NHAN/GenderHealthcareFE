import TempAdminDashboard from '@/components/admin-charts'
import { DashboardLayoutContext } from '@/components/layouts/Dashboard/DashboardLayout'
import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

export default function AdminDashboard() {
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()
  useEffect(() => {
    setBreadcrumb({
      title: 'Admin Dashboard'
    })
  }, [setBreadcrumb])

  // return <ChartAreaInteractive />
  return <TempAdminDashboard />
}
