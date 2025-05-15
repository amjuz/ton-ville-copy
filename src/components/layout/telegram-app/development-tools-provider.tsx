'use client'

import { type PropsWithChildren, useEffect } from 'react'

type DevelopmentToolsProviderProps = PropsWithChildren

export function DevelopmentToolsProvider({ children }: DevelopmentToolsProviderProps) {
  const debug = process.env.NODE_ENV === 'development'

  useEffect(() => {
    if (debug) {
      void import('eruda').then((lib) => lib.default.init())
    }
  }, [debug])

  return <>{children}</>
}
