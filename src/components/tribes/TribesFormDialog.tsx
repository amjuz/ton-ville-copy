'use client'

import { useForm } from 'react-hook-form'
import { useCallback, useId, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
import { tribesValidator, TTribesValidator } from '@/lib/validators/forms'
import { BackgroundPhoto } from '../originui/dialog-form/background-photo'
import { AvatarPhoto } from '../originui/dialog-form/avatar-photo'
import { uploadImageToS3Bucket } from '@/lib/supabase/image-upload'
import { createTribes } from '@/lib/supabase/tribes/tribe-table'
import PrefillTribeButton from '@/containers/wrappers/buttons/prefill-tribe-button'
import { useAppSelector } from '@/hooks/reduxHooks'

export default function TribesFormDialog({
  label,
  open,
  setOpen,
}: {
  label: string
  setOpen: (state: boolean) => void
  open: boolean
}) {
  const id = useId()
  const router = useRouter()
  const toastId = useId()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<TTribesValidator>({
    resolver: zodResolver(tribesValidator),
    defaultValues: {
      author: '',
      tribeCoverPhoto: '',
      tribeName: '',
      tribeProfilePhoto: '',
    },
  })

  const { mutate } = useMutation({
    mutationFn: createTribes,
    onMutate() {
      toast.loading('Creating Tribes...')
    },
    onSuccess() {
      reset()
      toast.dismiss()
      toast.success('Tribes created successfully.')
      setOpen(false)
    },
    onError() {
      toast.dismiss()
      toast.error('Failed to create Tribes')
    },
  })
  async function onSubmit({
    author,
    tribeCoverPhoto,
    tribeName,
    tribeProfilePhoto,
  }: TTribesValidator) {
    mutate({
      author,
      tribeCoverPhoto,
      tribeName,
      tribeProfilePhoto,
    })
  }

  const { mutateAsync: UploadToCloud } = useMutation({
    mutationFn: uploadImageToS3Bucket,
    onMutate: () => {
      toast.loading('Adding image...', { id: `imageUrl-${id}` })
    },
    onSuccess: () => {
      toast.success('Image added', { id: `imageUrl-${id}` })
    },
    onError: () => {
      toast.error('Image Upload failed', { id: `imageUrl-${id}` })
    },
  })

  const maxSize = 1 * 1024 * 1024
  const registerBackgroundImageUrl = useCallback(
    async (file: File) => {
      if (!file) return
      if (file.size >= maxSize) {
        toast.error(
          'Image size must be less than 1 MB, Please reselect an image to complete validation'
        )
        return
      }
      const imageUrl = await UploadToCloud(file)

      register('tribeCoverPhoto', { value: imageUrl })
    },
    [UploadToCloud, register]
  )
  const registerAvatarImageUrl = useCallback(
    async (file: File) => {
      if (!file) return
      if (file.size >= maxSize) {
        toast.error(
          'Image size must be less than 1 MB, Please reselect an image to complete validation'
        )
        return
      }

      const imageUrl = await UploadToCloud(file)

      register('tribeProfilePhoto', { value: imageUrl })
    },
    [UploadToCloud, register]
  )
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ClaimBlue">{label}</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">Create new tribe</DialogTitle>
        </DialogHeader>
        {/* <DialogDescription className="sr-only">
          Make changes to your profile here. You can change your photo and set a username.
        </DialogDescription> */}
        {/* <TribesProfilePhoto
            register={register}
            setValue={setValue}
            errors={errors.tribeCoverPhoto}
            /> */}
        {/* <TribesCoverPhoto
            register={register}
            setValue={setValue}
            errors={errors.tribeCoverPhoto}
          /> */}
        <form className="overflow-y-auto" onSubmit={handleSubmit(onSubmit)}>
          <BackgroundPhoto backgroundImage={registerBackgroundImageUrl} />
          {errors.tribeCoverPhoto && (
            <p className="mt-1 flex justify-center text-sm text-red-500">
              {errors.tribeCoverPhoto.message}
            </p>
          )}
          <AvatarPhoto avatarImage={registerAvatarImageUrl} />
          {errors.tribeProfilePhoto && (
            <p className="mt-1 text-sm text-red-500">{errors.tribeProfilePhoto.message}</p>
          )}
          <div className="px-6 pb-6 pt-4">
            <div className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor={`${id}-last-name`}>Author</Label>
                    <PrefillTribeButton setValue={setValue} />
                  </div>
                  <Input
                    {...register('author')}
                    id={`${id}-author`}
                    placeholder="Enter author name"
                    // defaultValue="Villard"
                    type="text"
                    required
                  />
                  {errors.author && (
                    <p className="mt-1 text-sm text-red-500">{errors.author.message}</p>
                  )}
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
                  {errors.tribeName && (
                    <p className="mt-1 text-sm text-red-500">{errors.tribeName.message}</p>
                  )}
                </div>
              </div>
              {/* <DialogClose asChild> */}
              <div className="flex justify-between px-6 py-4">
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
