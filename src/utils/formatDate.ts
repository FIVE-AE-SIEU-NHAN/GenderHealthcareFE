// src/lib/utils/formatDate.ts

import { format } from 'date-fns';

/**
 * A reusable utility to safely format a date string or Date object.
 * 
 * @param date - The date to format (can be an ISO string, a Date object, or null/undefined).
 * @param displayFormat - The desired output format string (e.g., 'dd/MM/yyyy'). Defaults to 'dd/MM/yyyy'.
 * @param fallback - The string to return if the date is invalid or null. Defaults to 'N/A'.
 * @returns The formatted date string or the fallback string.
 */
export function formatDate(
  date: string | Date | null | undefined,
  displayFormat: string = 'dd/MM/yyyy',
  fallback: string = 'N/A'
): string {
  // Handle null, undefined, or empty string cases
  if (!date) {
    return fallback;
  }

  try {
    // 2. new Date() can parse both ISO strings and Date objects
    const dateObject = new Date(date);
    
    // Check if the parsed date is valid
    if (isNaN(dateObject.getTime())) {
      throw new Error("Invalid date value");
    }

    // Format 
    return format(dateObject, displayFormat);
  } catch (error) {
    console.error("Failed to format date:", date, error);
    return fallback;
  }
}