"use client"

import * as React from "react"
import { format, setYear } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ControllerRenderProps } from "react-hook-form"

interface DatePickerProps {
  field: ControllerRenderProps<any, any>;
}

export function DatePicker({ field }: DatePickerProps) {
  const [selectedYear, setSelectedYear] = React.useState(() =>
    field.value ? field.value.getFullYear() : new Date().getFullYear()
  )
  const [isSelectOpen, setIsSelectOpen] = React.useState(false)

  // Sync selectedYear with field.value changes
  React.useEffect(() => {
    if (field.value) {
      setSelectedYear(field.value.getFullYear())
    }
  }, [field.value])

  // Memoize years array to prevent recreation on every render
  const years = React.useMemo(() => {
    const currentYear = new Date().getFullYear()
    return Array.from({ length: currentYear - 1920 + 1 }, (_, i) => currentYear - i)
  }, [])

  // Create a range of years around the selected year for initial rendering
  const getVisibleYears = React.useCallback(() => {
    if (!isSelectOpen) {
      // Always include the selected year in the visible years when closed
      const recentYears = years.slice(0, 20)
      if (!recentYears.includes(selectedYear)) {
        return [selectedYear, ...recentYears].sort((a, b) => b - a)
      }
      return recentYears
    }

    const selectedIndex = years.indexOf(selectedYear)
    const start = Math.max(0, selectedIndex - 10)
    const end = Math.min(years.length, selectedIndex + 20)

    // Always include the selected year and some context around it
    return years.slice(start, end)
  }, [years, selectedYear, isSelectOpen])

  const visibleYears = getVisibleYears()

  const handleYearChange = (year: string) => {
    const y = parseInt(year)
    setSelectedYear(y)

    // If a date is already selected, update its year
    if (field.value) {
      const updated = setYear(field.value, y)
      field.onChange(updated)
    } else {
      // If no date is selected, create a default date (January 1st of selected year)
      // This ensures the year shows up in the button display
      const defaultDate = new Date(y, 0, 1) // January 1st of selected year
      field.onChange(defaultDate)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !field.value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {field.value ? format(field.value, "PPP") : <span>Date of Birth</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex w-auto flex-col space-y-2 p-2">
        <Select
          value={selectedYear.toString()}
          onValueChange={handleYearChange}
          onOpenChange={setIsSelectOpen}
        >
          <SelectTrigger className="w-[200px] h-9">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent className="max-h-64 overflow-y-auto">
            {/* Show all years when open, but render efficiently */}
            {isSelectOpen ?
              years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))
              :
              visibleYears.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))
            }
          </SelectContent>
        </Select>

        {/* Calendar */}
        <div className="rounded-md border">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            month={new Date(selectedYear, 0, 1)}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}