// import { useQuery } from "@tanstack/react-query";
// import { axiosInstance } from "@/lib/axios";

// type ReqresUser = {
//   id: number;
//   email: string;
//   first_name: string;
//   last_name: string;
//   avatar: string;
// };

// type ReqresResponse = {
//   data: ReqresUser[];
// };

// export function useBlogs() {
//   return useQuery(["blogs"], async () => {
//     const res = await axiosInstance.get<ReqresResponse>("/users?per_page=12");
//     return res.data.data.map((user): Blog => ({
//       id: String(user.id),
//       createdAt: new Date().toLocaleDateString("en-GB"),
//       author: `${user.first_name} ${user.last_name}`,
//       title: `Blog by ${user.first_name}`,
//       description: `This is a placeholder blog post for ${user.first_name}.`,
//       status: "Published",
//     }));
//   });
// }
