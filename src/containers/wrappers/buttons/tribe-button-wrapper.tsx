import { EllipsisVertical } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'

export default function TribeProfileButtonWrapper() {
  return (
    <div className="mt-6 flex gap-2">
      <Button size={'lg'} className="basis-full rounded-xl">
        Edit Tribe
      </Button>
      <Button size={'lg'} variant={'secondary'} className="basis-full rounded-xl">
        Share
      </Button>
      <Button size={'icon'} variant={'secondary'} className="basis-32 rounded-xl bg-secondary/70">
        <EllipsisVertical size={20} />{' '}
      </Button>
    </div>
  )
}
