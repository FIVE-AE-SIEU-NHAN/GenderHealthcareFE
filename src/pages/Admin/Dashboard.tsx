// src/pages/dashboard/Home.tsx
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const DashBoard: React.FC = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-4">Welcome to your dashboard!</h1>
    </DashboardLayout>
  );
};

export default DashBoard;
