import { useRef } from 'react'

export function useClientOnce(fn: () => void | Promise<void>): void {
  const canCall = useRef(true)

  if (typeof window !== 'undefined' && canCall.current) {
    canCall.current = false
    Promise.resolve(fn()).catch(console.error) // Handle the potential Promise
  }
}
