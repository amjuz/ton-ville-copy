'use client'

import { type PropsWithChildren } from 'react'
import { DevelopmentToolsProvider } from './development-tools-provider'
import { TelegramSDKProvider } from './telegram-sdk-provider'
import { TelegramThemeProvider } from './telegram-theme-provider'
import { useDidMount } from '@/hooks/useDidMount'

export function TelegramAppRoot(props: PropsWithChildren) {
  const didMount = useDidMount()

  if (!didMount) {
    return null
  }

  return (
    <TelegramSDKProvider>
      <DevelopmentToolsProvider>
        <TelegramThemeProvider>{props.children}</TelegramThemeProvider>
      </DevelopmentToolsProvider>
    </TelegramSDKProvider>
  )
}
