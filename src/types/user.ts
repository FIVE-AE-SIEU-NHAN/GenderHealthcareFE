export interface User {
  id: string
  fullName: string
  email: string
  role: "Admin" | "Manager" | "Doctor" | "Customer"
  createdAt: string
  status: "Active" | "Banned" | "Suspended";
}