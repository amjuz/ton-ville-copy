'use client'

import { useForm } from 'react-hook-form'
import { useId, useState } from 'react'
import { useServerAction } from 'zsa-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { tribesValidator, TTribesValidator } from '@/lib/validators/tribes'
import { TribesCoverPhoto } from './tribes-profile-bg'
import { TribesProfilePhoto } from './tribes-avatar'
import { createTribes } from '@/app/actions/tribes/tribe-table'

export default function TribesFormDialog({ label }: { label: string }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const router = useRouter()
  const toastId = useId()
  const { execute, isPending } = useServerAction(createTribes, {
    onSuccess({ data }) {
      // toast.dismiss(toastId)
      toast.success(`Tribes creation successful`)
      toast.dismiss(toastId)
      setOpen(false)
      router.refresh()
    },
    onError({ err }) {
      toast.error(`Failed to create tribes.Please try again`)
      toast.dismiss(toastId)
    },
  })
  if (isPending) {
    toast.loading('Creating tribes...', { id: toastId })
  }

  const { register, handleSubmit, setValue } = useForm<TTribesValidator>({
    resolver: zodResolver(tribesValidator),
  })
  async function onSubmit({
    author,
    tribeCoverPhoto,
    tribeName,
    tribeProfilePhoto,
  }: TTribesValidator) {
    await execute({
      author,
      tribe_cover_photo: tribeCoverPhoto,
      tribe_name: tribeName,
      tribe_photo: tribeProfilePhoto,
    })
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ClaimBlue">{label}</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">Edit profile</DialogTitle>
        </DialogHeader>
        {/* <DialogDescription className="sr-only">
          Make changes to your profile here. You can change your photo and set a username.
        </DialogDescription> */}
        <form className="overflow-y-auto" onSubmit={handleSubmit(onSubmit)}>
          <TribesCoverPhoto register={register} setValue={setValue} />
          <TribesProfilePhoto register={register} setValue={setValue} />
          <div className="px-6 pb-6 pt-4">
            <div className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-last-name`}>Author</Label>
                  <Input
                    {...register('author')}
                    id={`${id}-author`}
                    placeholder="Enter author name"
                    // defaultValue="Villard"
                    type="text"
                    required
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-first-name`}>Tribe Name</Label>
                  <Input
                    {...register('tribeName')}
                    id={`${id}-tribe-name`}
                    placeholder="Enter tribe name"
                    // defaultValue="Margaret"
                    type="text"
                    required
                  />
                </div>
              </div>
              {/* <DialogClose asChild> */}
              <div className="flex justify-between border-t px-6 py-4">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant={'secondary'}
                  className="h-[36px] text-[13px] font-medium"
                >
                  {label}
                </Button>
              </div>
              {/* </DialogClose> */}
            </div>
          </div>
        </form>
        {/* <DialogFooter className="border-t px-6 py-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              variant={'ClaimBlue'}
              className="h-[36px] text-[13px] font-normal"
            >
              {label}
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}
