import { DashboardLayoutContext } from "@/components/layouts/Dashboard/DashboardLayout";
import { ChartAreaInteractive } from "@/components/test-chart";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";



export default function AdminDashboard() {
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>();
  useEffect(() => {
    setBreadcrumb({
      title: "Admin Dashboard",
    });
  }, [setBreadcrumb]);

  return (
    <ChartAreaInteractive />
  )
}
