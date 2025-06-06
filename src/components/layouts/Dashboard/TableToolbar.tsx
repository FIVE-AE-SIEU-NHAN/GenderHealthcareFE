"use client"

import * as React from "react"
import { format, isAfter, setYear } from "date-fns"
import { CalendarIcon, Eye, Search as SearchIcon, RotateCcw } from "lucide-react"

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
  searchFieldOptions?: { value: string; label: string }[]
  searchFieldValue?: string
  onSearchFieldChange?: (value: string) => void

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
  searchFieldOptions = [],
  searchFieldValue,
  onSearchFieldChange,
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
  const [localSearch, setLocalSearch] = React.useState(searchValue)

  React.useEffect(() => {
    setLocalSearch(searchValue)
  }, [searchValue])


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

  const handleSearchSubmit = () => {
    onSearchChange?.(localSearch);
  };

  const selectedFieldLabel = searchFieldOptions.find(opt => opt.value === searchFieldValue)?.label

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
      <div className="flex items-center">
        {/* Search Field Dropdown */}
        {searchFieldOptions.length > 0 && (
          <Select value={searchFieldValue} onValueChange={onSearchFieldChange}>
            <SelectTrigger className="w-[120px] rounded-r-none border-r-0 focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="Search in...">
                {selectedFieldLabel}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {searchFieldOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Search Input and Button */}
        <div className="relative flex items-center">
          <Input
            placeholder={placeholderSearch}
            className="w-[300px] pr-10 rounded-l-none focus:ring-0 focus:ring-offset-0"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchSubmit()
              }
            }}
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute right-1 h-8 w-8"
            onClick={handleSearchSubmit}
          >
            <SearchIcon className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* Reset button if range or filters selected */}
      {(fromDate || toDate || (statusValue && statusValue.length > 0) || searchValue) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={reset}
          className="group relative hover:border border-dashed border-red-600/50 bg-red-100 text-red-600 hover:text-red-500"
        >
          <RotateCcw className=" h-4 w-4 rotate-90 transition-transform group-hover:rotate-[-45deg] duration-300" />
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
