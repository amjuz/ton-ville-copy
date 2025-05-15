import React from 'react'
import StoreProvider from './store-providers'

export default async function InitialStateDispatcher({ children }: { children: React.ReactNode }) {
  // const [] = await Promise.all([])
  return <StoreProvider>{children}</StoreProvider>
}
