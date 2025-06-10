"use client"

import * as React from "react"
import { format, isAfter, setYear } from "date-fns"
import { CalendarIcon, Eye, Search as SearchIcon, RotateCcw, ChevronsUpDown, Loader2 } from "lucide-react"

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

export interface FacetFilter {
  key: string; 
  label: string; 
  options: { label: string; value: string }[];
}

interface TableToolbarProps {
  // Column Visibility
  columns: { key: string; label: string; toggleable?: boolean; }[];
  visibleColumns: string[];
  onVisibleColumnsChange: (visibleCols: string[]) => void;

  // Faceted Filter (the new, generic system)
  facetFilters?: FacetFilter[];
  activeFilterKey: string;
  onActiveFilterKeyChange: (key: string) => void;
  activeFilterValues: string[];
  onActiveFilterValuesChange: (values: string[]) => void;
  
  // Search
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchFieldOptions?: { value: string; label: string }[];
  searchFieldValue?: string;
  onSearchFieldChange?: (value: string) => void;

  // Date Range
  fromDate?: Date;
  toDate?: Date;
  onDateRangeChange?: (from?: Date, to?: Date) => void;
  
  // General Actions
  onResetFilters?: () => void;
  onCreate?: () => void;
  createButtonLabel?: string;
  placeholderSearch?: string;

  isFetching?: boolean;
}

export default function TableToolbar({
  columns,
  visibleColumns,
  onVisibleColumnsChange,

  facetFilters = [],
  activeFilterKey,
  onActiveFilterKeyChange,
  activeFilterValues,
  onActiveFilterValuesChange,
  
  searchValue = "",
  onSearchChange,
  searchFieldOptions = [],
  searchFieldValue,
  onSearchFieldChange,
  placeholderSearch = "Search...",

  fromDate,
  toDate,
  onDateRangeChange,
  onResetFilters,
  onCreate,
  createButtonLabel = "+ CREATE",
  isFetching,
}: TableToolbarProps) {
  const [fromMonth, setFromMonth] = React.useState(fromDate || new Date())
  const [toMonth, setToMonth] = React.useState(toDate || new Date())
  const [fromYear, setFromYear] = React.useState(fromDate?.getFullYear() || new Date().getFullYear())
  const [toYear, setToYear] = React.useState(toDate?.getFullYear() || new Date().getFullYear())
  const currentYear = new Date().getFullYear()
  const minDate = new Date(2023, 0, 1);
  const maxDate = new Date(currentYear, 11, 31);
  const years = Array.from({ length: currentYear - 2023 + 1 }, (_, i) => currentYear - i)
  const [localSearch, setLocalSearch] = React.useState(searchValue)

  const currentFilter = facetFilters.find(f => f.key === activeFilterKey);

  React.useEffect(() => {
    setLocalSearch(searchValue)
  }, [searchValue])

  const handleCategoryChange = (newKey: string) => {
    onActiveFilterKeyChange(newKey);
    onActiveFilterValuesChange([]); 
  };

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

  function clampMonth(date: Date): Date {
    if (date < minDate) return new Date(minDate);
    if (date > maxDate) return new Date(maxDate);
    return date;
  }

  const reset = () => { onResetFilters?.() };

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
          {columns
            .filter((col) => col.toggleable !== false) // Only show if toggleable is not explicitly false
            .map((col) => (
              <div key={col.key} className="flex items-center space-x-2 mb-1">
                <Checkbox
                  id={col.key}
                  checked={visibleColumns.includes(col.key)}
                  onCheckedChange={() => toggleColumn(col.key)} // Use the key to toggle
                />
                <label
                  htmlFor={col.key}
                  className="text-sm font-medium capitalize leading-none"
                >
                  {col.label} {/* Use the label for display */}
                </label>
              </div>
            ))}
        </PopoverContent>
      </Popover>

      {/* Filter */}
      {facetFilters.length > 0 && currentFilter && (
        <div className="flex items-center gap-0">
          {/* Part 1: Select the filter CATEGORY */}
          <Select value={activeFilterKey} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-auto gap-2 font-medium rounded-r-[0] border-r-0">
              <SelectValue placeholder="Filter by..." />
            </SelectTrigger>
            <SelectContent align="center">
              {facetFilters.map(filter => (
                <SelectItem key={filter.key} value={filter.key}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Part 2: Popover to select the filter VALUES */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-auto justify-between rounded-l-[0]">
                <span className="truncate">
                  {activeFilterValues.length > 0
                    ? activeFilterValues.join(", ")
                    : `Select ${currentFilter.label}`}
                </span>
                <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              {currentFilter.options.map(({ label, value }) => (
                <div key={value} className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md">
                  <Checkbox
                    id={`${currentFilter.key}-${value}`}
                    checked={activeFilterValues.includes(value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onActiveFilterValuesChange([...activeFilterValues, value]);
                      } else {
                        onActiveFilterValuesChange(activeFilterValues.filter(v => v !== value));
                      }
                    }}
                  />
                  <label htmlFor={`${currentFilter.key}-${value}`} className="w-full text-sm font-medium leading-none cursor-pointer">
                    {label}
                  </label>
                </div>
              ))}
            </PopoverContent>
          </Popover>
        </div>
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
              onMonthChange={(month) => setFromMonth(clampMonth(month))}
              showOutsideDays
              disabled={(date) =>
                date < minDate ||
                date > maxDate ||
                (toDate ? date > toDate : false)
              }
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
              onMonthChange={(month) => setToMonth(clampMonth(month))}
              showOutsideDays
              disabled={(date) =>
                date < minDate ||
                date > maxDate ||
                (fromDate ? date < fromDate : false)
              }
            />
          </div>
        </PopoverContent>
      </Popover>

      {/* Search Input */}
      <div className="flex items-center">
        {/* Search Field Dropdown */}
        {searchFieldOptions.length > 0 && (
          <Select value={searchFieldValue} onValueChange={onSearchFieldChange}>
            <SelectTrigger className="w-[120px] rounded-r-none border-r-0 focus:ring-0 focus:ring-offset-0 font-medium">
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
      {(fromDate || toDate || activeFilterValues.length > 0 || searchValue) && (
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

      <div className="flex items-center gap-2 ml-auto">
        {isFetching && (
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading...</span>
          </div>
        )}
        {onCreate && (
          <Button onClick={onCreate}>
            {createButtonLabel}
          </Button>
        )}
      </div>
    </div>
  )
}
