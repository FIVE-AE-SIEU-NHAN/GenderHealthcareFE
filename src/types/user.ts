// export interface User {
//   id: string
//   fullName: string
//   email: string
//   role: "Admin" | "Manager" | "Doctor" | "Customer"
//   createdAt: string
//   status: "Active" | "Banned" | "Suspended";
// }

export interface User {
  id: string;
  name: string; 
  email: string;
  date_of_birth: string;
  gender: string;
  phone_number: string;
  created_at: string; 
  updated_at: string;
  verify: number; 
  role: number;
}