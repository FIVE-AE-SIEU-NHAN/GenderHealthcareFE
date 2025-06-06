export interface Blog {
  id: string
  title: string
  description: string
  status: "Published" | "Draft" | "Archived"
  author: string
  createdAt: string
}