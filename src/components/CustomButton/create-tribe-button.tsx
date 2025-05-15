'use client'

import { Button } from '../ui/button'

export default function CreateTribeButton({ label }: { label: string }) {
  return (
    <Button variant={'ClaimBlue'} className="h-[36px] text-[13px] font-normal">
      {label}
    </Button>
  )
}
