/**
 * A reusable utility to safely format a date string or Date object in UTC.
 * This avoids timezone shifts and does NOT require any external libraries.
 *
 * @param date - The date to format (can be an ISO string, a Date object, or null/undefined).
 * @param displayFormat - The desired output format string. Currently only supports 'dd/MM/yyyy'.
 * @param fallback - The string to return if the date is invalid or null. Defaults to 'N/A'.
 * @returns The formatted date string in UTC, or the fallback string.
 */
export function formatDate(
  date: string | Date | null | undefined,
  displayFormat: string = 'dd/MM/yyyy',
  fallback: string = 'N/A'
): string {
  if (!date) {
    return fallback
  }

  try {
    const dateObject = new Date(date)

    // Check if the parsed date is valid
    if (isNaN(dateObject.getTime())) {
      throw new Error('Invalid date value')
    }

    if (displayFormat === 'dd/MM/yyyy') {
      const day = String(dateObject.getUTCDate()).padStart(2, '0')
      const month = String(dateObject.getUTCMonth() + 1).padStart(2, '0') // +1 because months are 0-indexed
      const year = dateObject.getUTCFullYear()

      return `${day}/${month}/${year}`
    } else if (displayFormat === 'MM/dd/yyyy') {
      const month = String(dateObject.getUTCMonth() + 1).padStart(2, '0')
      const day = String(dateObject.getUTCDate()).padStart(2, '0')
      const year = dateObject.getUTCFullYear()

      return `${month}/${day}/${year}`
    } else if (displayFormat === 'yyyy-MM-dd') {
      const year = dateObject.getUTCFullYear()
      const month = String(dateObject.getUTCMonth() + 1).padStart(2, '0')
      const day = String(dateObject.getUTCDate()).padStart(2, '0')

      return `${year}-${month}-${day}`
    } else if (displayFormat === 'do MMMM yyyy') {
      const day = dateObject.getUTCDate()
      const month = dateObject.toLocaleString('default', { month: 'long' })
      const year = dateObject.getUTCFullYear()

      return `${day}${['st', 'nd', 'rd'][((day % 10) - 1) % 3] || 'th'} ${month} ${year}`
    } else if (displayFormat === 'MMMM d, yyyy') {
      const month = dateObject.toLocaleString('default', { month: 'long' })
      const day = String(dateObject.getUTCDate()).padStart(2, '0')
      const year = dateObject.getUTCFullYear()

      return `${month} ${day}, ${year}`
    } else if (displayFormat === 'MMM d, yyyy') {
      const month = dateObject.toLocaleString('default', { month: 'short' })
      const day = String(dateObject.getUTCDate()).padStart(2, '0')
      const year = dateObject.getUTCFullYear()
      return `${month} ${day}, ${year}`
    }

    throw new Error(`Unsupported date format: ${displayFormat}`)
  } catch (error) {
    console.error('Failed to format date:', date, error)
    return fallback
  }
}
