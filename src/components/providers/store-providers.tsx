'use client'

import { useRef } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { AppStore, makeStore } from '@/store/store'
import { setUserId } from '@/store/features/profile'

interface IStoreProvider {
  children: React.ReactNode
  userId?: string
}

export default function StoreProvider({ children, userId }: IStoreProvider) {
  const dispatch = useDispatch()

  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }
  if (userId) {
    dispatch(setUserId({ id: userId }))
  }
  return <Provider store={storeRef.current}>{children}</Provider>
}
