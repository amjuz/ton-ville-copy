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
import TribesFormDialog from '@/components/tribes/TribesFormDialog'
import { Tables } from '@/types/database'

export default function TribeProfileButtonWrapper({
  setOpenQuestDialog,
  setOpenEventDialog,
  // setOpenTribeEditDialog,
  tribeData
}: {
  tribeData:Tables['tribes']['Row']
  setOpenQuestDialog: (state: boolean) => void
  setOpenEventDialog: (state: boolean) => void
  // setOpenTribeEditDialog: (state: boolean) => void
}) {
  const [openTribeEditDialog, setOpenTribeEditDialog] = useState(false)
  return (
    <div className="mt-6 flex gap-2">
      <TribesFormDialog
        open={openTribeEditDialog}
        setOpen={setOpenTribeEditDialog}
        label={'Update'}
        type="edit"
        tribeData={tribeData}
      >
        <Button size={'lg'} className="basis-full rounded-xl">
          Edit Tribe
        </Button>
      </TribesFormDialog>
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
