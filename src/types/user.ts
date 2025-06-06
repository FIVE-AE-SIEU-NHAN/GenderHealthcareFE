export interface User {
  id: string
  name: string
  email: string
  role: "Admin" | "Manager" | "Doctor" | "Customer"
  createdAt: string
}