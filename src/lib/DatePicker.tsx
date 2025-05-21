"use client"

import * as React from "react"
import { format, setYear, getYear } from "date-fns"
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

type DatePickerWithPresetsProps = {
  value: Date | undefined;
  onChange: (date: Date) => void;
};

export function DatePickerWithPresets({ value, onChange }: DatePickerWithPresetsProps) {
  const [month, setMonth] = React.useState<Date>(value ?? new Date());

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => 1900 + i);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full h-11 justify-start text-left font-normal text-sm text-[#101245]",
            // !value && ""
          )}
        >
          <CalendarIcon className="h-4 w-4" />
          {value ? format(value, "PPP") : <span className="text-muted-foreground">Pick a date</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="flex w-auto flex-col space-y-2 p-2">
        <Select
          value={value ? String(getYear(value)) : ""}
          onValueChange={(val) => {
            const updated = setYear(value ?? new Date(), parseInt(val));
            onChange(updated);        // notify form
            setMonth(updated);        // sync visible month
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent position="popper" className="max-h-60 overflow-auto">
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="rounded-md border">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(day) => {
              if (day) {
                onChange(day);       // notify form
                setMonth(day);       // sync visible month
              }
            }}
            month={month}
            onMonthChange={setMonth}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
