'use client'
import React from 'react'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { AppStore, makeStore } from '@/store/store'

export default function ReactReduxProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | undefined>(undefined)
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
