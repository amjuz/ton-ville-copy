/**
 * Asserts that data is not null
 */
export function assertData<T>(data: T | null, message?: string): T {
  if (!data) throw new Error(message || 'Data is undefined')
  return data
}
