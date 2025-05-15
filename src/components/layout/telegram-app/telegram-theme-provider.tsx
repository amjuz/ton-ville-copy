'use client'

import { isMiniAppDark, useLaunchParams } from '@telegram-apps/sdk-react'
import { AppRoot } from '@telegram-apps/telegram-ui'
import { type PropsWithChildren } from 'react'

type TelegramThemeProviderProps = PropsWithChildren

export function TelegramThemeProvider({ children }: TelegramThemeProviderProps) {
  const launchParams = useLaunchParams()
  const { platform } = launchParams

  return (
    <AppRoot
      appearance={isMiniAppDark() ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(platform) ? 'ios' : 'base'}
    >
      {children}
    </AppRoot>
  )
}
