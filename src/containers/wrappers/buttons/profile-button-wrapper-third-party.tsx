import { EllipsisVertical } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'

export default function ProfileButtonWrapperThirdParty() {
  // make buttons individual component
  // add message Send Icon, to the individual button.
  return (
    <div className="mt-8 flex gap-2 px-2 sm:px-6">
      <Button size={'lg'} className="basis-full rounded-xl">
        Follow
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
