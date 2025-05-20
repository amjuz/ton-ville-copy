import { useCallback, useId, useState } from 'react'
import { CheckIcon, ImagePlusIcon, XIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { useCharacterLimit } from '@/hooks/use-character-limit'
import { useFileUpload } from '@/hooks/use-file-upload'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { eventsFormSchema, TEventsFormSchema } from '@/lib/validators/forms'
import { createEvents } from '@/lib/supabase/events/events-table'
import { uploadImageToS3Bucket } from '@/lib/supabase/image-upload'
import { BackgroundPhoto } from '../originui/dialog-form/background-photo'
import PopoverDatePicker from '../originui/calendar/popover-date-picker'
import DatePickerDialog from '../originui/calendar/date-picker-accordian'
import DatePickerAccordion from '../originui/calendar/date-picker-accordian'
import DateAndTimePicker from '../originui/calendar/date-and-time-picker'
import { Calendar } from '../ui/calendar'

export default function CreateEventForm({
  open,
  onOpenChange,
  tribeId,
}: {
  open: boolean
  onOpenChange: (state: boolean) => void
  tribeId: string
}) {
  const id = useId()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TEventsFormSchema>({
    resolver: zodResolver(eventsFormSchema),
  })

  const { mutate } = useMutation({
    mutationFn: createEvents,
    onMutate() {
      toast.loading('Creating Events...')
    },
    onSuccess() {
      toast.dismiss()
      toast.success('Events created successfully.')
      onOpenChange(false)
    },
    onError() {
      toast.dismiss()
      toast.error('Failed to create Events')
    },
  })
  function onSubmit(values: TEventsFormSchema) {
    const { date, eventPhoto, genre, location, summary, title } = values
    mutate({ date, eventPhoto, genre, location, summary, title, tribesId: tribeId })
  }

  // upload photo to s3 bucket and store image url to use form hook
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

  const registerImageUrl = useCallback(
    async (file: File) => {
      if (!file) return
      const imageUrl = await UploadToCloud(file)

      register('eventPhoto', { value: imageUrl })
    },
    [UploadToCloud, register]
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">Edit profile</DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Make changes to your profile here. You can change your photo and set a username.
        </DialogDescription>
        <form className="overflow-y-auto" onSubmit={handleSubmit(onSubmit)}>
          <BackgroundPhoto backgroundImage={registerImageUrl} />
          <div className="px-6 pb-6 pt-4">
            <div className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 space-y-2">
                  <Label>Title</Label>
                  <Input placeholder="Matt" type="text" {...register('title')} />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <Label>Genre</Label>
                  <Input placeholder="Matt" type="text" {...register('genre')} />
                  {errors.genre && (
                    <p className="mt-1 text-sm text-red-500">{errors.genre.message}</p>
                  )}
                </div>
                <Label>Date and time</Label>
                <DateAndTimePicker setValue={setValue} />

                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-last-name`}>Location</Label>
                  <Input placeholder="Welsh" type="text" {...register('location')} />
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-500">{errors.location.message}</p>
                  )}
                </div>
              </div>
              <div className="*:not-first:mt-2">
                <Label>Description </Label>
                <Textarea
                  placeholder="Write a few sentences for summary"
                  aria-describedby={`summary`}
                  {...register('summary')}
                />
                {errors.summary && (
                  <p className="mt-1 text-sm text-red-500">{errors.summary.message}</p>
                )}
              </div>

              <Button className="w-full">Submit</Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
