/**
 * Asserts that data is not null and returns it with type safety
 * @param data - The data to check
 * @param message - Optional custom error message
 */
export function assertData<T>(data: T | null, message?: string): T {
  if (!data) throw new Error(message || 'Data is undefined')
  return data
}

/**
 * Asserts that database row exists
 * @param data - Database query result
 * @param message - Optional custom error message
 */
export function assertDatabaseRow<T>(data: T | null, message?: string): NonNullable<T> {
  if (!data) throw new Error(message || 'Database row not found')
  return data as NonNullable<T>
}
