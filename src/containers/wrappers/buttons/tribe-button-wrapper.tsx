import { EllipsisVertical } from 'lucide-react'
import React, { useState } from 'react'
import { DialogContent } from '@radix-ui/react-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import Uploader from '@/components/uploader'

export default function TribeProfileButtonWrapper({
  setOpenQuestDialog,
  setOpenEventDialog,
}: {
  setOpenQuestDialog: (state: boolean) => void
  setOpenEventDialog: (state: boolean) => void
}) {
  // const [open, setOpen] = useState(false)
  return (
    <div className="mt-6 flex gap-2">
      <Button size={'lg'} className="basis-full rounded-xl">
        Edit Tribe
      </Button>
      <Button size={'lg'} variant={'secondary'} className="basis-full rounded-xl">
        Share
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size={'icon'}
            variant={'secondary'}
            className="basis-32 rounded-xl bg-secondary/70"
          >
            <EllipsisVertical size={20} />{' '}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2 mt-2">
          <DropdownMenuLabel>Manage Tribe</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenQuestDialog(true)}>
            Create Quests
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenEventDialog(true)}>
            Create Events
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/*  */}
    </div>
  )
}
