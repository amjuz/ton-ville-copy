'use client'

import { init } from '@telegram-apps/sdk-react'
import { type PropsWithChildren, useEffect } from 'react'
import { useTelegramMock } from '@/hooks/useTelegramMock'

type TelegramSDKProviderProps = PropsWithChildren

export function TelegramSDKProvider({ children }: TelegramSDKProviderProps) {
  // Always call the hook, but conditionally execute its logic
  useTelegramMock()
  useEffect(() => {
    // Initialize SDK on mount
    init()
  }, [])

  return <>{children}</>
}
