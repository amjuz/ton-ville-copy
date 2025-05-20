import { useCallback, useId } from 'react'
import { CheckIcon, ImagePlusIcon, XIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
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
import { BackgroundPhoto } from '../originui/dialog-form/background-photo'
import { AvatarPhoto } from '../originui/dialog-form/avatar-photo'
import { questFormSchema, TQuestFormSchema } from '@/lib/validators/forms'
import { uploadImageToS3Bucket } from '@/lib/supabase/image-upload'
import { createQuests } from '@/lib/supabase/quests/quests-table'

export default function CreateQuestForm({
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
    formState: { errors },
  } = useForm<TQuestFormSchema>({
    resolver: zodResolver(questFormSchema),
  })
  const { mutate } = useMutation({
    mutationFn: createQuests,
    onMutate() {
      toast.loading('Creating quests...')
    },
    onSuccess() {
      toast.dismiss()
      toast.success('Quest created successfully.')
      onOpenChange(false)
    },
    onError() {
      toast.dismiss()
      toast.error('Failed to create Quests')
    },
  })

  function onSubmit(values: TQuestFormSchema) {
    const { description, guidelines, questImage, subTitle, title } = values
    mutate({ description, guidelines, questImage, subTitle, tribesId: tribeId, title })
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

      register('questImage', { value: imageUrl })
    },
    [UploadToCloud, register]
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">Create Quests</DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Create your profile here. You can change your photo and set a quest name.
        </DialogDescription>
        <form className="overflow-y-auto" onSubmit={handleSubmit(onSubmit)}>
          <BackgroundPhoto backgroundImage={registerImageUrl} />
          {errors.questImage && (
            <p className="mt-1 flex justify-center text-sm text-red-500">
              {errors.questImage.message}
            </p>
          )}
          {/* <AvatarPhoto /> */}
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
                  <Label htmlFor={`${id}-last-name`}>Sub title</Label>
                  <Input placeholder="Welsh" type="text" {...register('subTitle')} />
                  {errors.subTitle && (
                    <p className="mt-1 text-sm text-red-500">{errors.subTitle.message}</p>
                  )}
                </div>
              </div>
              <div className="*:not-first:mt-2">
                <Label>Description </Label>
                <Textarea
                  placeholder="Write a few sentences for description"
                  aria-describedby={`description`}
                  {...register('description')}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
                )}
              </div>

              <div className="*:not-first:mt-2">
                <Label>Guidelines</Label>
                <Textarea
                  placeholder="Write a few sentences for guidelines"
                  aria-describedby={`guidelines`}
                  {...register('guidelines')}
                />
                {errors.guidelines && (
                  <p className="mt-1 text-sm text-red-500">{errors.guidelines.message}</p>
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
