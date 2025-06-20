import { DashboardLayoutContext } from "@/components/layouts/Dashboard/DashboardLayout";
import { ChartAreaInteractive } from "@/components/testChart";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";



export default function ConsultantDashboard() {
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>();
  useEffect(() => {
    setBreadcrumb({
      title: "Consultant Dashboard",
    });
  }, [setBreadcrumb]);

  return (
    <ChartAreaInteractive />
  )
}
