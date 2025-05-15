import React from 'react'
import { cn } from '@/lib/utils/cn'

export const Dot = ({ className = '', isActive = false, ...props }) => {
  const classes = cn('h-4', className, isActive ? 'opacity-100' : 'opacity-25')

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 8 8"
      fill="none"
      className={classes}
      {...props}
    >
      <circle cx="4" cy="4" r="4" fill="currentColor" />
    </svg>
  )
}
