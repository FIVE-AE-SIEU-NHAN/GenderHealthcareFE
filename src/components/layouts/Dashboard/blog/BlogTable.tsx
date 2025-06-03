import { useState } from "react"
import { Pencil, Trash2, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Pagination } from "../../pagin"

type Blog = {
  id: string
  createdAt: string
  author: string
  title: string
  description: string
  status: "Published" | "Archived" | "Draft"
}
type BlogTableProps = {
  status: string[]
  search: string
  dateRange: { from: Date | undefined; to: Date | undefined }
  visibleColumns: string[]
}

const blogData: Blog[] = [
  // Your mock data
  {
    id: "85",
    createdAt: "1/3/2025",
    author: "Cynthia Sullivan",
    title: "Title goes here 82",
    description: "broke fought newspaper movie increase break determine barn came bark sheet white travel statement or loud local long burn rich great shaking fresh view",
    status: "Archived",
  },
  {
    id: "18",
    createdAt: "11/12/2025",
    author: "Billy Norris",
    title: "Title goes here 35",
    description: "ship statement write excitement lower valley movie special twice sink greatly here vast battle ring tired audience buried beauty along believed earlier east powder",
    status: "Draft",
  },
  {
    id: "81",
    createdAt: "6/2/2025",
    author: "Charles Porter",
    title: "Title goes here 58",
    description: "begun branch making promised learn class information coffee youth only final piano snow it period rope car thee matter exist salmon partly safety future",
    status: "Published",
  },
  {
    id: "74",
    createdAt: "10/18/2025",
    author: "Glenn Horton",
    title: "Title goes here 88",
    description: "spent root itself pattern inch flow calm gave enter dollar worth length has hurry gift sight cowboy speed generally uncle factor deep model century",
    status: "Published",
  },
  {
    id: "9",
    createdAt: "4/24/2025",
    author: "Harvey Reeves",
    title: "Title goes here 4",
    description: "deal welcome everything rest military pattern breeze rays vertical gentle widely correct cold result army pink steep team winter vote industry operation written slowly",
    status: "Archived",
  },
  {
    id: "27",
    createdAt: "4/12/2041",
    author: "Isaac Cortez",
    title: "Title goes here 55",
    description: "anywhere ordinary mostly quite become smoke colony wrapped method orbit service tomorrow motion cream plan single machine aboard note excellent farther forgot my principal",
    status: "Published",
  },
  {
    id: "21",
    createdAt: "2/25/2114",
    author: "Edward Curtis",
    title: "Title goes here 18",
    description: "rough shaking garage speed occur sold brush am tin main conversation brave below minerals movie family recent her instant little include music immediately or",
    status: "Archived",
  },
  {
    id: "1",
    createdAt: "8/18/2047",
    author: "Tommy Fuller",
    title: "Title goes here 37",
    description: "globe name driven circle business friend activity entirely drove sell station shirt excited together health right driver leaf first actual turn doctor closer either",
    status: "Archived",
  },
  {
    id: "72",
    createdAt: "4/19/2078",
    author: "Hulda Holmes",
    title: "Title goes here 17",
    description: "butter planet old sail hundred material two nearby newspaper sunlight leaving call from dear quiet route gulf twice putting remarkable scale tin scientist subject",
    status: "Published",
  },
  {
    id: "16",
    createdAt: "3/24/2040",
    author: "Albert Norton",
    title: "Title goes here 73",
    description: "tongue further seeing court station numeral particularly table minerals become negative thick jack cause plastic effect go figure replied sat usually direct ill whispered",
    status: "Published",
  },
  {
    id: "201",
    createdAt: "3/24/2040",
    author: "Albert Norton",
    title: "Title goes here 73",
    description: "tongue further seeing court station numeral particularly table minerals become negative thick jack cause plastic effect go figure replied sat usually direct ill whispered",
    status: "Published",
  },
  {
    id: "202",
    createdAt: "3/24/2040",
    author: "Albert Norton",
    title: "Title goes here 73",
    description: "tongue further seeing court station numeral particularly table minerals become negative thick jack cause plastic effect go figure replied sat usually direct ill whispered",
    status: "Published",
  },
  {
    id: "203",
    createdAt: "3/24/2040",
    author: "Albert Norton",
    title: "Title goes here 73",
    description: "tongue further seeing court station numeral particularly table minerals become negative thick jack cause plastic effect go figure replied sat usually direct ill whispered",
    status: "Published",
  },
  {
    id: "204",
    createdAt: "3/24/2040",
    author: "Albert Norton",
    title: "Title goes here 73",
    description: "tongue further seeing court station numeral particularly table minerals become negative thick jack cause plastic effect go figure replied sat usually direct ill whispered",
    status: "Published",
  },

]

export default function BlogTable({
  status,
  search,
  dateRange,
  visibleColumns,
}: BlogTableProps) {
  const [sortField, setSortField] = useState<keyof Blog>("createdAt")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 10

  const handleSort = (field: keyof Blog) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredData = blogData.filter((blog) => {
    const lowerSearch = search.toLowerCase()

    const blogDate = new Date(blog.createdAt)

    return (
      (status.length === 0 || status.includes(blog.status)) &&
      (!search ||
        blog.title.toLowerCase().includes(lowerSearch) ||
        blog.description.toLowerCase().includes(lowerSearch)) &&
      (!dateRange.from || blogDate >= dateRange.from) &&
      (!dateRange.to || blogDate <= dateRange.to)
    )
  })

  // Sort the filtered data
  const sortedData = [...filteredData].sort((a, b) => {
    const aVal = a[sortField]
    const bVal = b[sortField]
    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortDirection === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal)
    }
    return 0
  })

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / rowsPerPage)
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  const isVisible = (key: string) => visibleColumns.includes(key)

  return (
    <>
      <div className="min-h-[calc(83vh)] rounded-xl border bg-white shadow-sm relative">
        <div className="flex-grow overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-muted-foreground text-center">
              <tr>
                {isVisible("id") && <th className="px-4 py-3">ID</th>}
                {isVisible("createdAt") && (
                  <th
                    className="px-4 py-3 cursor-pointer select-none"
                    onClick={() => handleSort("createdAt")}
                  >
                    Date{" "}
                    {sortField === "createdAt" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="inline h-4 w-4" />
                      ) : (
                        <ChevronDown className="inline h-4 w-4" />
                      ))}
                  </th>
                )}
                {isVisible("author") && <th className="px-4 py-3">Author</th>}
                {isVisible("title") && <th className="px-4 py-3">Title</th>}
                {isVisible("description") && <th className="px-4 py-3">Description</th>}
                {isVisible("status") && <th className="px-4 py-3">Status</th>}
                {isVisible("actions") && 
                  <>
                    <th className="px-4 py-3">Edit</th>
                    <th className="px-4 py-3">Delete</th>
                  </>
                }
              </tr>
            </thead>
            <tbody className="text-center">
              {paginatedData.map((blog) => (
                <tr
                  key={blog.id}
                  className="border-t hover:bg-blue-50/70 transition-colors"
                >
                  {isVisible("id") && (
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className="text-xs font-mono px-2 py-0.5 border-black/10 bg-emerald-400/15"
                      >
                        {blog.id}
                      </Badge>
                    </td>
                  )}
                  {isVisible("createdAt") && (
                    <td className="px-4 py-3">{blog.createdAt}</td>
                  )}
                  {isVisible("author") && <td className="px-4 py-3">{blog.author}</td>}
                  {isVisible("title") && (
                    <td className="px-4 py-3 min-w-40">{blog.title}</td>
                  )}
                  {isVisible("description") && (
                    <td className="px-4 py-3 max-w-80 truncate">{blog.description}</td>
                  )}
                  {isVisible("status") && (
                    <td className="px-4 py-3 items-center flex justify-center mt-2">
                      <Badge
                        className={cn(
                          "text-xs px-2 py-1",
                          blog.status === "Published" && "bg-blue-600/90 text-white",
                          blog.status === "Archived" && "bg-red-200 text-red-600",
                          blog.status === "Draft" && "bg-yellow-200 text-yellow-700"
                        )}
                      >
                        {blog.status}
                      </Badge>
                    </td>
                  )}
                  {isVisible("actions") && (
                    <>
                      <td className="px-4 py-3">
                        <Button size="icon" variant="ghost">
                          <Badge className="text-xs px-2 py-1 bg-blue-100 text-blue-600">
                            <Pencil className="w-4 h-4 text-muted-foreground" />
                          </Badge>
                        </Button>
                      </td>
                      <td className="px-4 py-3">
                        <Button size="icon" variant="ghost">
                          <Badge className="text-xs px-2 py-1 bg-red-100 text-red-600">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Badge>
                        </Button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          className="absolute bottom-1 pt-4 flex justify-between items-center px-4 w-full"
        />
      </div>
    </>
  )
}
