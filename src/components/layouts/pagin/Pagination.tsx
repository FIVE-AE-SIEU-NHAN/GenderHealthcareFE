// src/components/shared/pagination/Pagination.tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
  maxPageButtons?: number // e.g. 5
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  maxPageButtons = 5,
}: PaginationProps) {
  const [jumpPage, setJumpPage] = useState("")

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1)
  }

  const handleJump = () => {
    const num = parseInt(jumpPage)
    if (!isNaN(num) && num >= 1 && num <= totalPages) {
      onPageChange(num)
      setJumpPage("")
    }
  }

  const generatePageNumbers = () => {
    const pages: (number | "...")[] = []

    const half = Math.floor(maxPageButtons / 2)
    let start = Math.max(1, currentPage - half)
    let end = Math.min(totalPages, currentPage + half)

    if (end - start + 1 < maxPageButtons) {
      if (start === 1) {
        end = Math.min(totalPages, start + maxPageButtons - 1)
      } else if (end === totalPages) {
        start = Math.max(1, end - maxPageButtons + 1)
      }
    }

    if (start > 1) {
      pages.push(1)
      if (start > 2) pages.push("...")
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...")
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div className={`flex flex-wrap items-center justify-between gap-4 py-4 ${className}`}>
      <div className="text-sm text-muted-foreground">
        Page <span className="font-medium">{currentPage}</span> of{" "}
        <span className="font-medium">{totalPages}</span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {generatePageNumbers().map((p, index) =>
          typeof p === "number" ? (
            <Button
              key={index}
              size="sm"
              variant={p === currentPage ? "default" : "outline"}
              onClick={() => onPageChange(p)}
              className="w-9"
            >
              {p}
            </Button>
          ) : (
            <span key={index} className="px-2 text-sm text-muted-foreground">
              ...
            </span>
          )
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="hidden sm:flex items-center gap-2 text-sm">
        <span>Jump to:</span>
        <Input
          type="number"
          value={jumpPage}
          onChange={(e) => setJumpPage(e.target.value)}
          className="w-20 h-8"
          min={1}
          max={totalPages}
        />
        <Button size="sm" onClick={handleJump}>
          Go
        </Button>
      </div>
    </div>
  )
}
