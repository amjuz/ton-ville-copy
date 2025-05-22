'use client'

import { toast } from 'sonner'
import { useCallback, useId, useRef, useState } from 'react'
import { useServerAction } from 'zsa-react'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { updateProfilePhoto } from '@/app/actions/profile/profile'
import { Button } from '@/components/ui/button'
import ProfileImageUploader from '@/components/profile-image-uploader'
import { handleImageUploadAction } from '@/app/actions/image-upload-action'

export default function ImageUploadComponent({ imageUrl }: { imageUrl?: string }) {
  const [profileImage, setProfileImage] = useState(imageUrl ?? '')
  const [buttonVisibility, setButtonVisibility] = useState(false)
  const [cancelButtonVisibility, setCancelButtonVisibility] = useState(true)
  const toastId = useId()
  const query = useQueryClient()
  const params = useParams()
  const userId = params.userId as string
  const { execute: updateFile, isPending } = useServerAction(handleImageUploadAction, {
    onSuccess({ data }) {
      if (!data.publicUrl) {
        console.log('Failed to add image')
        return
      }
      setProfileImage(data.publicUrl)
      toast.dismiss(toastId)
      toast.success(`Image added`)
      setButtonVisibility(true)
    },
    onError({ err }) {
      toast.error(`Failed to upload image ,${err.message}`)
      toast.dismiss(toastId)
    },
  })
  if (isPending) {
    toast.loading('Processing...', { id: toastId })
  }

  const { execute: uploadImage, isPending: uploadImagePending } = useServerAction(
    updateProfilePhoto,
    {
      onSuccess() {
        setButtonVisibility(false)
        toast.success('Image updated successfully')
        query.invalidateQueries({ queryKey: ['profile-page', userId] })
        toast.dismiss(toastId)
        setCancelButtonVisibility(false)
      },
      onError({ err }) {
        toast.error('Image upload failed, Please try again')
        toast.dismiss(toastId)
      },
    }
  )

  if (uploadImagePending) {
    toast.loading('Uploading image...', { id: toastId })
  }

  const handleS3ImageUpload = useCallback(
    async (value: File) => {
      if (!value) return
      await updateFile({ file: value })
    },
    [updateFile]
  )

  return (
    <div className="">
      <ProfileImageUploader
        handleUpload={handleS3ImageUpload}
        cancelButtonVisibility={cancelButtonVisibility}
      />
      <div className="">
        {buttonVisibility ? (
          <Button
            variant={'secondary'}
            className="mt-2 w-full"
            onClick={async () => {
              await uploadImage({ imageUrl: profileImage })
            }}
          >
            Confirm Changes
          </Button>
        ) : null}
      </div>
    </div>
  )
}
