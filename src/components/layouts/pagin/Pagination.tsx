// src/components/shared/pagination/Pagination.tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useMemo, useCallback } from "react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
  maxPageButtons?: number
  showJump?: boolean
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  maxPageButtons = 3,
  showJump = true,
}: PaginationProps) {
  const [jumpPage, setJumpPage] = useState("")

  const safeTotalPages = Math.max(totalPages, 1)
  const safeCurrentPage = Math.max(1, Math.min(currentPage, safeTotalPages))

  const handlePrev = useCallback(() => {
    if (safeCurrentPage > 1) onPageChange(safeCurrentPage - 1)
  }, [safeCurrentPage, onPageChange])

  const handleNext = useCallback(() => {
    if (safeCurrentPage < safeTotalPages) onPageChange(safeCurrentPage + 1)
  }, [safeCurrentPage, safeTotalPages, onPageChange])

  const handleJump = useCallback(() => {
    const num = Number(jumpPage)
    if (!Number.isNaN(num) && num >= 1 && num <= safeTotalPages) {
      onPageChange(num)
      setJumpPage("")
    }
  }, [jumpPage, safeTotalPages, onPageChange])

  const pageNumbers = useMemo(() => {
    const pages: (number | "...")[] = []

    const half = Math.floor(maxPageButtons / 2)
    let start = Math.max(1, safeCurrentPage - half)
    let end = Math.min(safeTotalPages, safeCurrentPage + half)

    if (end - start + 1 < maxPageButtons) {
      if (start === 1) {
        end = Math.min(safeTotalPages, start + maxPageButtons - 1)
      } else if (end === safeTotalPages) {
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

    if (end < safeTotalPages) {
      if (end < safeTotalPages - 1) pages.push("...")
      pages.push(safeTotalPages)
    }

    return pages
  }, [safeCurrentPage, safeTotalPages, maxPageButtons])

  if (safeTotalPages <= 1) return null

  return (
    <div className={`flex flex-wrap items-center justify-between gap-4 py-4 ${className}`}>
      <div className="text-sm text-muted-foreground">
        Page <span className="font-medium">{safeCurrentPage}</span> of{" "}
        <span className="font-medium">{safeTotalPages}</span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrev}
          disabled={safeCurrentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {pageNumbers.map((p, idx) =>
          typeof p === "number" ? (
            <Button
              key={`page-${p}`}
              size="sm"
              variant={p === safeCurrentPage ? "default" : "outline"}
              onClick={() => onPageChange(p)}
              className="w-9"
              aria-label={`Go to page ${p}`}
            >
              {p}
            </Button>
          ) : (
            <span key={`ellipsis-${idx}`} className="px-2 text-sm text-muted-foreground">
              ...
            </span>
          )
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={safeCurrentPage === safeTotalPages}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {showJump && (
        <div className="hidden sm:flex items-center gap-2 text-sm">
          <span>Jump to:</span>
          <Input
            type="number"
            value={jumpPage}
            onChange={(e) => {
              const val = e.target.value
              if (/^\d*$/.test(val)) setJumpPage(val)
            }}
            onKeyDown={(e) => e.key === "Enter" && handleJump()}
            className="w-20 h-8"
            min={1}
            max={safeTotalPages}
            aria-label="Jump to page"
          />
          <Button size="sm" onClick={handleJump}>
            Go
          </Button>
        </div>
      )}
    </div>
  )
}
