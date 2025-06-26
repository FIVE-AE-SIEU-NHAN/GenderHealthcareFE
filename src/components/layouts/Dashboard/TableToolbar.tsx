"use client"

import * as React from "react"
import { format, isAfter } from "date-fns"
import { CalendarIcon, Eye, Search as SearchIcon, RotateCcw, ChevronsUpDown, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Calendar22 } from "@/lib/DatePickerv2"
import { cn } from "@/lib/utils"

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

  // Faceted Filter 
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
  onSearchSubmit?: () => void;

  // Date Range
  dateFilterOptions?: { value: string; label: string }[];
  activeDateFilterKey?: string;
  onActiveDateFilterKeyChange?: (value: string) => void;
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
  onSearchSubmit,


  dateFilterOptions = [],
  activeDateFilterKey,
  onActiveDateFilterKeyChange,
  fromDate,
  toDate,
  onDateRangeChange,

  onResetFilters,
  onCreate,
  createButtonLabel = "+ CREATE",
  isFetching,
}: TableToolbarProps) {
  const [draftFromDate, setDraftFromDate] = React.useState<Date | undefined>(fromDate);
  const [draftToDate, setDraftToDate] = React.useState<Date | undefined>(toDate);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  const currentFilter = facetFilters.find(f => f.key === activeFilterKey);

  const handleCategoryChange = (newKey: string) => {
    onActiveFilterKeyChange(newKey);
    onActiveFilterValuesChange([]);
  };

  React.useEffect(() => {
    setDraftFromDate(fromDate);
    setDraftToDate(toDate);
  }, [fromDate, toDate]);

  const handleApplyDates = () => {
    onDateRangeChange?.(draftFromDate, draftToDate);
    setIsPopoverOpen(false);
  };

  const generateDateButtonText = () => {
    if (fromDate && toDate) return `${format(fromDate, "dd/MM/yyyy")} → ${format(toDate, "dd/MM/yyyy")}`;
    if (fromDate) return format(fromDate, "dd/MM/yyyy");
    return "Pick a date range";
  };

  const reset = () => { onResetFilters?.() };

  const toggleColumn = (col: string) => {
    if (visibleColumns.includes(col)) {
      onVisibleColumnsChange(visibleColumns.filter(c => c !== col))
    } else {
      onVisibleColumnsChange([...visibleColumns, col])
    }
  }

  const triggerSearch = () => {
    onSearchSubmit?.();
  };

  const selectedFieldLabel = searchFieldOptions.find(opt => opt.value === searchFieldValue)?.label
  const selectedDateFilterLabel = dateFilterOptions.find(opt => opt.value === activeDateFilterKey)?.label;

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
                  {col.label}
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
                <span className="truncate max-w-50">
                  {activeFilterValues.length > 0
                    ? currentFilter.options
                      .filter(opt => activeFilterValues.includes(opt.value))
                      .map(opt => opt.label)
                      .join(", ")
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
      <div className="flex items-center gap-0">
        {/* Dropdown to select the date field */}
        <Select value={activeDateFilterKey} onValueChange={onActiveDateFilterKeyChange}>
          <SelectTrigger className="w-auto gap-2 font-medium rounded-r-none border-r-0">
            <SelectValue placeholder="Filter by date...">
              {selectedDateFilterLabel}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {dateFilterOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Date range picker */}
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start text-left rounded-l-none" onClick={() => setIsPopoverOpen(true)}>
              <CalendarIcon className="w-4 h-4 mr-2" />
              {generateDateButtonText()}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex gap-4 p-4 w-auto" align="center">
            <div className="flex gap-4">
              {/* FROM Calendar */}
              <Calendar22
                placeholder="From date"
                value={draftFromDate}
                onChange={(date) => {
                  setDraftFromDate(date);
                  if (date && draftToDate && isAfter(date, draftToDate)) {
                    setDraftToDate(undefined);
                  }
                }}
                disabled={(date) => draftToDate ? isAfter(date, draftToDate) : false}
              />

              {/* TO Calendar */}
              <div className={cn(!draftFromDate && "cursor-not-allowed")}>
                <Calendar22
                  placeholder="To date"
                  value={draftToDate}
                  onChange={(date) => setDraftToDate(date)}
                  // This disables the calendar dates before a "from" date is selected
                  disabled={(date) => !draftFromDate || (draftFromDate && date < draftFromDate)}
                  isPickerDisabled={!draftFromDate}
                />
              </div>
            </div>

            <div className={cn("flex justify-end", !draftFromDate && "cursor-not-allowed")}>
              <Button onClick={handleApplyDates}
                disabled={!draftFromDate}
              >
                Apply Dates
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Search */}
      <div className="flex items-center">
        {/* Search Field Dropdown */}
        {searchFieldOptions.length > 0 && (
          <Select value={searchFieldValue} onValueChange={onSearchFieldChange}>
            <SelectTrigger className="w-auto rounded-r-none border-r-0 focus:ring-0 focus:ring-offset-0 font-medium">
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
            id="search-input"
            placeholder={placeholderSearch}
            className="w-[300px] pr-10 rounded-l-none focus:ring-0 focus:ring-offset-0"
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                triggerSearch()
              }
            }}
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute right-1 h-8 w-8"
            onClick={triggerSearch}
          >
            <SearchIcon className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* Reset button */}
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
