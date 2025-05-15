'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { AppStore, makeStore } from '@/store/store'

interface IStoreProvider {
  children: React.ReactNode
}

export default function StoreProvider({ children }: IStoreProvider) {
  // const store = useAppStore()
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
