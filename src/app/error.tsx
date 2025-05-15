'use client'

import { ErrorDisplay, ErrorPageProps } from '@/components/error/error-display'

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return <ErrorDisplay error={error} reset={reset} />
}
