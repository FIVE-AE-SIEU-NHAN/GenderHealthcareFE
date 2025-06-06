// components/tables/DataTable.tsx
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ChevronUp, ChevronDown, Pencil, Trash2 } from "lucide-react"
import { Pagination } from "@/components/layouts/pagin/Pagination"

type Column<T> = {
  key: keyof T
  label: string
  visible: boolean
  sortable?: boolean
  render?: (item: T) => React.ReactNode
}

type DataTableProps<T extends { id: string; createdAt: string; status?: string }> = {
  data: T[]
  columns: Column<T>[]
  search?: string
  searchField?: keyof T | "all"
  statusFilter?: string[]
  dateRange?: { from?: Date; to?: Date }
  rowsPerPage?: number
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
}

export function DataTable<T extends { id: string; createdAt: string; status?: string }>({
  data,
  columns,
  search = "",
  searchField = "all",
  statusFilter = [],
  dateRange,
  rowsPerPage = 10,
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  const [sortField, setSortField] = useState<keyof T>("id")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)

  const handleSort = (field: keyof T) => {
    if (field === sortField) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredData = data.filter((item) => {
    const createdAt = new Date(item.createdAt)

    const matchesStatus =
      !statusFilter.length || !item.status || statusFilter.includes(item.status)

    const matchesSearch =
      !search ||
      (searchField === "all"
        ? // A) search all values
        Object.values(item)
          .map((val) => String(val).toLowerCase())
          .join(" ")
          .includes(search.toLowerCase())
        : // B) Search only the specified field
        String(item[searchField]).toLowerCase().includes(search.toLowerCase()))

    const inDateRange =
      (!dateRange?.from || createdAt >= dateRange.from) &&
      (!dateRange?.to || createdAt <= dateRange.to)

    return matchesStatus && matchesSearch && inDateRange
  })

  const isDateFormat = (val: unknown): val is string =>
    typeof val === "string" && /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(val);

  const parseDDMMYYYY = (str: string): Date => {
    const [day, month, year] = str.split("/").map(Number);
    return new Date(year, month - 1, day);
  };

  const isNumericString = (val: unknown): val is string =>
    typeof val === "string" && !isNaN(Number(val));

  const sortedData = [...filteredData].sort((a, b) => {
    const aVal = a[sortField as keyof typeof a];
    const bVal = b[sortField as keyof typeof b];

    // 1. Date string in dd/MM/yyyy
    if (isDateFormat(aVal) && isDateFormat(bVal)) {
      const aDate = parseDDMMYYYY(aVal);
      const bDate = parseDDMMYYYY(bVal);
      return sortDirection === "asc"
        ? aDate.getTime() - bDate.getTime()
        : bDate.getTime() - aDate.getTime();
    }

    // 2. Numeric strings (e.g. "10", "200")
    if (isNumericString(aVal) && isNumericString(bVal)) {
      const aNum = Number(aVal);
      const bNum = Number(bVal);
      return sortDirection === "asc" ? aNum - bNum : bNum - aNum;
    }

    // 3. Pure numbers
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
    }

    // 4. Regular strings
    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortDirection === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    return 0;
  });




  const totalPages = Math.ceil(sortedData.length / rowsPerPage)
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  return (
    <div className="min-h-[calc(77vh)] rounded-xl border bg-white shadow-sm relative">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-muted-foreground text-center">
            <tr>
              {columns.map(
                (col) =>
                  col.visible && (
                    <th
                      key={String(col.key)}
                      onClick={() => col.sortable && handleSort(col.key)}
                      className={cn("px-4 py-3", col.sortable && "cursor-pointer select-none")}
                    >
                      {col.label}{" "}
                      {sortField === col.key &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="inline h-4 w-4" />
                        ) : (
                          <ChevronDown className="inline h-4 w-4" />
                        ))}
                    </th>
                  )
              )}
              {(onEdit || onDelete) && (
                <>
                  {onEdit && <th className="px-4 py-3">Edit</th>}
                  {onDelete && <th className="px-4 py-3">Delete</th>}
                </>
              )}
            </tr>
          </thead>
          <tbody className="text-center">
            {paginatedData.map((item) => (
              <tr key={item.id} className="border-t hover:bg-blue-50/70 transition-colors">
                {columns.map((col) => {
                  if (!col.visible) return null

                  // Special styling/render for specific columns:
                  if (col.key === "id") {
                    return (
                      <td key={String(col.key)} className="px-4 py-3">
                        <Badge
                          variant="outline"
                          className="text-xs font-mono px-2 py-0.5 border-black/10 bg-emerald-400/15"
                        >
                          {item.id}
                        </Badge>
                      </td>
                    )
                  }

                  if (col.key === "description") {
                    return (
                      <td key={String(col.key)} className="px-4 py-3 max-w-80 truncate">
                        {col.render ? col.render(item) : String(item[col.key])}
                      </td>
                    )
                  }

                  if (col.key === "title") {
                    return (
                      <td key={String(col.key)} className="px-4 py-3 min-w-40">
                        {col.render ? col.render(item) : String(item[col.key])}
                      </td>
                    )
                  }

                  if (col.key === "status") {
                    // Render status with colored badges
                    const status = item.status || ""
                    return (
                      <td
                        key={String(col.key)}
                        className="px-4 py-3 items-center flex justify-center mt-2"
                      >
                        <Badge
                          className={cn(
                            "text-xs px-2 py-1",
                            status === "Published" && "bg-blue-600/90 text-white",
                            status === "Archived" && "bg-red-200 text-red-600",
                            status === "Draft" && "bg-yellow-200 text-yellow-700"
                          )}
                        >
                          {status}
                        </Badge>
                      </td>
                    )
                  }

                  return (
                    <td key={String(col.key)} className="px-4 py-3">
                      {col.render ? col.render(item) : String(item[col.key])}
                    </td>
                  )
                })}
                {onEdit && (
                  <td className="px-4 py-3">
                    <Button size="icon" variant="ghost" onClick={() => onEdit(item)}>
                      <Badge className="text-xs px-2 py-1 bg-blue-100 text-blue-600">
                        <Pencil className="w-4 h-4 text-muted-foreground" />
                      </Badge>
                    </Button>
                  </td>
                )}
                {onDelete && (
                  <td className="px-4 py-3">
                    <Button size="icon" variant="ghost" onClick={() => onDelete(item)}>
                      <Badge className="text-xs px-2 py-1 bg-red-100 text-red-600">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Badge>
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        className="absolute -bottom-2 lg:bottom-4 md:-bottom-1 flex justify-between items-center px-4 w-full"
      />
    </div>
  )
}
