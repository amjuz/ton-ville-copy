import { TDateFormatter } from '@/types/utils'
import {
  differenceInCalendarDays,
  differenceInHours,
  differenceInMilliseconds,
  differenceInMinutes,
  format,
  isValid,
  parseISO,
} from 'date-fns'

export const isProd = process.env.NODE_ENV !== 'development'

export function sleep(time: number) {
  if (isProd) return
  return new Promise((r) => setTimeout(r, time))
}

/**
 * Formats a number into a compact, human-readable string representation.
 *
 * @param value - The numeric value to be formatted
 * @returns A formatted string with appropriate suffix (K, M, or B)
 *
 * @example
 * ```typescript
 * FormatNumber(1234);    // Returns "1.2K"
 * FormatNumber(1000000); // Returns "1M"
 * FormatNumber(500000000); // Returns "5B"
 * ```
 *
 */
export function FormatNumber(value: number) {
  const thousands = 1000
  const million = 1000000
  const billion = 100000000

  const suffixItems = [
    { divisor: billion, suffix: 'B' },
    { divisor: million, suffix: 'M' },
    { divisor: thousands, suffix: 'K' },
  ]

  for (let i = 0; i < 3; i++) {
    if (value >= suffixItems[i].divisor) {
      const formattedNumber = (value / suffixItems[i].divisor).toFixed(1).replace(/\.0$/, '')
      return `${formattedNumber}${suffixItems[i].suffix}`
    }
  }
  return value.toString()
}

/**
 * Formats a date into a human-readable string with flexible formatting options.
 *
 * @example
 * format(new Date(), 'd M iii'),          // 15 3 Fri
 * format(new Date(), 'dd MM iiii'),    // 15 03 Friday
 * format(new Date(), 'd MMM iiiiii'), // 15 Mar Fr
 * format(new Date(), 'do MMMM iii'),  // 15th March Fri
 * format(new Date(), 'd/M/iii'),          // 15/3/Fri
 * format(new Date(), 'dd.MM (iiii)'), // 15.03 (Friday)
 * format(new Date(), 'd MMM, iiiiii'), // 15 Mar, Fr
 * format(new Date(), 'do MMMM at iii'), // 15th March at Fri
 * format(new Date(), 'd/M/yyyy iii'), // 15/3/2024 Fri
 * format(new Date(), 'd MMMM, yyyy (iiii)') // 15 March, 2024 (Friday)
 *
 * @param date
 * -
 * - Can be a Date object
 * - Can be an ISO date string
 * - Can be a timestamp (number of milliseconds since epoch)
 *
 */

export function formatDate(
  date: Date | string | number,
  formateString?: string,
  formatter?: TDateFormatter
): string {
  let parsedDate: Date

  if (typeof date === 'string') {
    parsedDate = parseISO(date)
  } else if (typeof date === 'number') {
    parsedDate = new Date(date)
  } else if (date instanceof Date) {
    parsedDate = date
  } else {
    return ''
  }

  if (!isValid(parsedDate)) {
    return ''
  }
  let formattedString
  if (formateString === '') {
    formattedString = formatter ?? 'do MMMM iii'
  }
  formattedString = formateString

  // formateString ?? formatter ??
  return format(parsedDate, formattedString ?? 'do MMMM iii')
}

/**
 * Truncates a text to a specified number of letters, adding an ellipsis if truncated
 *
 * @param sentence - The input text to be truncated
 * @param letters - The maximum number of letters to keep
 * @returns Truncated text with ellipsis if longer than specified length
 */

export function TruncateText(sentence: string, letters: number) {
  if (!sentence) return ''

  const trimmedSentence = sentence.trim()

  if (trimmedSentence.length <= letters) {
    return trimmedSentence
  }

  return `${trimmedSentence.slice(0, letters)}...`
}

/**
 *
 * @param IncomingDate - the date which needs to be formatted against current time
 * @returns difference in current time and incoming time and adds corresponding time suffix
 *
 * @example formatTimeDifference(new Date(04 12 2024 12:50pm))
 * // if current date time is 04 12 2024 - 12:55 pm
 * // output => 5 mins ago
 */
export function formatTimeDifference(IncomingDate: Date) {
  const CurrentTime = new Date(Date.now())

  const diffInDays = differenceInCalendarDays(CurrentTime, IncomingDate)
  const diffInHrs = differenceInHours(CurrentTime, IncomingDate)
  const diffInMins = differenceInMinutes(CurrentTime, IncomingDate)
  const diffInSec = differenceInMilliseconds(CurrentTime, IncomingDate)

  if (diffInDays === 0) {
    if (diffInHrs === 0) {
      if (diffInMins === 0) {
        return `${diffInSec} sec ago`
      }
      return `${diffInMins} mins ago`
    }
    return `${diffInHrs} hrs ago`
  }

  return `${diffInDays} days ago`
}
