'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export type ErrorPageProps = {
  error: Error & { digest?: string }
  reset?: () => void
}

export const ErrorDisplay = ({ error, reset }: ErrorPageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto mt-8 w-5/6 max-w-2xl rounded-lg bg-destructive/10 p-6 shadow-lg dark:bg-destructive/20"
    >
      <div className="mb-4 flex items-center">
        <h2>{error?.message || 'Something went wrong!'}</h2>
      </div>
      {error?.digest && (
        <pre className="mb-4 overflow-x-auto rounded-md border border-destructive bg-background p-4 text-sm text-foreground dark:bg-card">
          <code>{error.digest}</code>
        </pre>
      )}
      {reset && (
        <Button
          variant="outline"
          onClick={reset}
          className="flex w-full items-center justify-center"
        >
          Retry
        </Button>
      )}
    </motion.div>
  )
}
