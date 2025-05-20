'use client'

import { toast } from 'sonner'
import { useCallback, useId, useRef, useState } from 'react'
import { useServerAction } from 'zsa-react'
import { useRouter } from 'next/navigation'
import { handleImageUpload } from '@/app/actions/image-upload'
import { updateProfilePhoto } from '@/app/actions/profile/profile'
import { Button } from '@/components/ui/button'
import ProfileImageUploader from '@/components/profile-image-uploader'

export default function ImageUploadComponent({ imageUrl }: { imageUrl?: string }) {
  const [profileImage, setProfileImage] = useState(imageUrl ?? '')
  const [buttonVisibility, setButtonVisibility] = useState(false)
  const [cancelButtonVisibility, setCancelButtonVisibility] = useState(true)
  const toastId = useId()

  const { execute: updateFile, isPending } = useServerAction(handleImageUpload, {
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
  // console.log('image url :', profileImage)

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
      {/* <div className="relative cursor-pointer" >
        {profileImage ? (
          <Image
            width={160}
            height={160}
            className="aspect-square max-w-40 rounded-2xl object-cover"
            alt=""
            src={profileImage}
            unoptimized
          />
        ) : ( */}
      {/* )} */}
      {/* <div className="absolute left-0 right-0 top-0 flex h-full w-full items-center justify-center rounded-2xl bg-black/50 transition-opacity hover:bg-black/60">
          <p className="font-bold tracking-wide text-white">Change Photo</p>
        </div> */}
      {/* <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          // onChange={handleFileChange}
          disabled={uploading}
        /> */}
      {/* </div> */}
    </div>
  )
}
