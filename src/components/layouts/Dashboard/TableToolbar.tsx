"use client"

import * as React from "react"
import { format, isAfter, setYear } from "date-fns"
import { CalendarIcon, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface TableToolbarProps {
  statusOptions?: { label: string; value: string }[]
  columns: string[]
  visibleColumns: string[]
  onVisibleColumnsChange: (visibleCols: string[]) => void
  statusValue?: string[]
  onStatusChange?: (value: string[]) => void
  searchValue?: string
  onSearchChange?: (value: string) => void
  fromDate?: Date
  toDate?: Date
  onDateRangeChange?: (from?: Date, to?: Date) => void
  onResetFilters?: () => void
  onCreate?: () => void
  createButtonLabel?: string
  placeholderSearch?: string
  statusPlaceholder?: string
}

export default function TableToolbar({
  statusOptions = [],
  columns,
  visibleColumns,
  onVisibleColumnsChange,
  statusValue = [],
  onStatusChange,
  searchValue = "",
  onSearchChange,
  fromDate,
  toDate,
  onDateRangeChange,
  onResetFilters,
  onCreate,
  createButtonLabel = "+ CREATE",
  placeholderSearch = "Search...",
  statusPlaceholder = "Filter",
}: TableToolbarProps) {
  const [fromMonth, setFromMonth] = React.useState(fromDate || new Date())
  const [toMonth, setToMonth] = React.useState(toDate || new Date())
  const [fromYear, setFromYear] = React.useState(fromDate?.getFullYear() || new Date().getFullYear())
  const [toYear, setToYear] = React.useState(toDate?.getFullYear() || new Date().getFullYear())
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 2023 + 1 }, (_, i) => currentYear - i)

  // Date select handlers
  function handleFromDateSelect(date?: Date) {
    if (toDate && date && isAfter(date, toDate)) return
    if (onDateRangeChange) onDateRangeChange(date, toDate)
    setFromMonth(date || new Date())
    setFromYear(date?.getFullYear() || currentYear)
  }

  function handleToDateSelect(date?: Date) {
    if (fromDate && date && isAfter(fromDate, date)) return
    if (onDateRangeChange) onDateRangeChange(fromDate, date)
    setToMonth(date || new Date())
    setToYear(date?.getFullYear() || currentYear)
  }

  const reset = () => {
    if (onResetFilters) onResetFilters()
  }

  const toggleColumn = (col: string) => {
    if (visibleColumns.includes(col)) {
      onVisibleColumnsChange(visibleColumns.filter(c => c !== col))
    } else {
      onVisibleColumnsChange([...visibleColumns, col])
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      {/* View (Column Toggle) */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            View
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3" align="start">
          {columns.map((col) => (
            <div key={col} className="flex items-center space-x-2 mb-1">
              <Checkbox
                id={col}
                checked={visibleColumns.includes(col)}
                onCheckedChange={() => toggleColumn(col)}
              />
              <label htmlFor={col} className="text-sm font-medium leading-none">
                {col}
              </label>
            </div>
          ))}
        </PopoverContent>
      </Popover>
      
      {/* Filter */}
      {statusOptions.length > 0 && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="font-medium">
              {statusValue && statusValue.length > 0
                ? statusValue.length === statusOptions.length
                  ? "All"
                  : statusValue.join(", ")
                : statusPlaceholder}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3" align="start">
            {statusOptions.map(({ label, value }) => (
              <div key={value} className="flex items-center space-x-2 mb-1">
                <Checkbox
                  id={value}
                  checked={statusValue?.includes(value) ?? false}
                  onCheckedChange={(checked) => {
                    if (!onStatusChange) return
                    if (checked) {
                      onStatusChange([...(statusValue ?? []), value])
                    } else {
                      onStatusChange((statusValue ?? []).filter((v) => v !== value))
                    }
                  }}
                />
                <label htmlFor={value} className="text-sm font-medium leading-none">
                  {label}
                </label>
              </div>
            ))}
          </PopoverContent>
        </Popover>
      )}

      {/* Date Range Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-start text-left">
            <CalendarIcon className="w-4 h-4 mr-2" />
            {fromDate && toDate
              ? `${format(fromDate, "PPP")} → ${format(toDate, "PPP")}`
              : fromDate
              ? `${format(fromDate, "PPP")} →`
              : "Pick a date range"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex gap-4 p-4 w-[540px]" align="start">
          {/* FROM Calendar */}
          <div>
            <div className="flex items-center mb-2 gap-2">
              <span className="font-medium">From</span>
              <Select
                value={fromYear.toString()}
                onValueChange={(val) => {
                  const year = parseInt(val)
                  setFromYear(year)
                  setFromMonth(setYear(fromMonth, year))
                }}
              >
                <SelectTrigger className="w-[100px] h-8">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent className="max-h-64 overflow-y-auto">
                  {years.map((y) => (
                    <SelectItem key={y} value={y.toString()}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Calendar
              mode="single"
              selected={fromDate}
              onSelect={handleFromDateSelect}
              month={fromMonth}
              onMonthChange={setFromMonth}
              showOutsideDays
            />
          </div>

          {/* TO Calendar */}
          <div>
            <div className="flex items-center mb-2 gap-2">
              <span className="font-medium">To</span>
              <Select
                value={toYear.toString()}
                onValueChange={(val) => {
                  const year = parseInt(val)
                  setToYear(year)
                  setToMonth(setYear(toMonth, year))
                }}
              >
                <SelectTrigger className="w-[100px] h-8">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent className="max-h-64 overflow-y-auto">
                  {years.map((y) => (
                    <SelectItem key={y} value={y.toString()}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Calendar
              mode="single"
              selected={toDate}
              onSelect={handleToDateSelect}
              month={toMonth}
              onMonthChange={setToMonth}
              showOutsideDays
            />
          </div>
        </PopoverContent>
      </Popover>

      {/* Search Input */}
      <Input
        placeholder={placeholderSearch}
        className="w-[300px]"
        value={searchValue}
        onChange={(e) => onSearchChange?.(e.target.value)}
      />

      {/* Reset button if range or filters selected */}
      {(fromDate || toDate || (statusValue && statusValue.length > 0) || searchValue) && (
        <Button variant="outline" size="sm" onClick={reset}>
          Reset
        </Button>
      )}

      <div className="ml-auto">
        {onCreate && (
          <Button onClick={onCreate}>
            {createButtonLabel}
          </Button>
        )}
      </div>
    </div>
  )
}
