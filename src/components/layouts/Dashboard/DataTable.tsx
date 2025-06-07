// components/tables/DataTable.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown, Pencil, Trash2 } from "lucide-react";
import { Pagination } from "@/components/layouts/pagin/Pagination";

type Column<T> = {
  key: keyof T;
  label: string;
  visible: boolean;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  cellClassName?: string; 
};

type DataTableProps<T extends { id: string; createdAt: string; status?: string }> = {
  data: T[];
  columns: Column<T>[];
  search?: string;
  searchField?: keyof T | "all";
  statusFilter?: string[];
  dateRange?: { from?: Date; to?: Date };
  rowsPerPage?: number;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  renderActions?: (item: T) => React.ReactNode;
};

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
  renderActions,
}: DataTableProps<T>) {
  const [sortField, setSortField] = useState<keyof T>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  
  const parseDDMMYYYY = (str: string): Date => { const [day, month, year] = str.split("/").map(Number); return new Date(year, month - 1, day); };
  const isDateFormat = (val: unknown): val is string => typeof val === "string" && /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(val);
  const isNumericString = (val: unknown): val is string => typeof val === "string" && !isNaN(Number(val));

  const handleSort = (field: keyof T) => {
    if (field === sortField) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
  const filteredData = data.filter((item) => {
    const createdAt = parseDDMMYYYY(item.createdAt);
    const matchesStatus = !statusFilter.length || !item.status || statusFilter.includes(item.status);
    const matchesSearch = !search ||
      (searchField === "all"
        ? Object.values(item).map((val) => String(val).toLowerCase()).join(" ").includes(search.toLowerCase())
        : String(item[searchField]).toLowerCase().includes(search.toLowerCase()));
    const inDateRange = (!dateRange?.from || createdAt >= dateRange.from) && (!dateRange?.to || createdAt <= dateRange.to);
    return matchesStatus && matchesSearch && inDateRange;
  });

  
  const sortedData = [...filteredData].sort((a, b) => {
    const aVal = a[sortField as keyof typeof a];
    const bVal = b[sortField as keyof typeof b];
    if (isDateFormat(aVal) && isDateFormat(bVal)) {
      const aDate = parseDDMMYYYY(aVal);
      const bDate = parseDDMMYYYY(bVal);
      return sortDirection === "asc" ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime();
    }
    if (isNumericString(aVal) && isNumericString(bVal)) {
      const aNum = Number(aVal);
      const bNum = Number(bVal);
      return sortDirection === "asc" ? aNum - bNum : bNum - aNum;
    }
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
    }
    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortDirection === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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
              {(onEdit || onDelete || renderActions) && (
                <th className="px-4 py-3">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="text-center">
            {paginatedData.map((item) => (
              <tr key={item.id} className="border-t hover:bg-blue-50/70 transition-colors">

                {/* Render Cột (Cho phép chọn cái nào chuyển thành Badge được, bú)  */}
                {columns.map((col) => {
                  if (!col.visible) return null;

                  return (
                    <td key={String(col.key)} 
                      className={cn(
                        "px-4 py-3 align-middle",
                        col.cellClassName 
                      )}>
                      {col.render ? col.render(item) : String(item[col.key])}
                    </td>
                  );
                })}

                {/* Actions ở đây */}
                {(onEdit || onDelete || renderActions) && (
                  <td className="px-4 py-3 align-middle max-w-[30px]">
                    <div className="flex items-center justify-center gap-5">
                      {onEdit && (
                        <Button className="bg-blue-100 hover:bg-blue-200" size="sm" variant="ghost" onClick={() => onEdit(item)}>
                          <Pencil className="w-4 h-4 text-blue-600 " />
                        </Button>
                      )}
                      {renderActions ? (
                        renderActions(item)
                      ) : (
                        onDelete && (
                          <Button className="bg-red-100 hover:bg-red-200" size="sm" variant="ghost" onClick={() => onDelete(item)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        )
                      )}
                    </div>
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
  );
}