'use client'

import toast from 'react-hot-toast'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { handleImageUpload } from '@/app/actions/image-upload'
import { updateProfilePhoto } from '@/app/actions/profile-management/profile'
import { Button } from '@/components/ui/button'
// import profileImage from '@/assets/images/mock/Ape_Red_Mock.png'

export default function ImageUploadComponent({ imageUrl }: { imageUrl?: string }) {
  const [profileImage, setProfileImage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [buttonVisibility, setButtonVisibility] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Handle file selection
  const handleFileChange = async (event: any) => {
    try {
      setUploading(true)

      const file = event.target.files[0]
      if (!file) return

      const [data, err] = await handleImageUpload({ file })

      if (!data || !data.publicUrl) {
        toast.error('Failed to add image, please try again')
        return
      }
      setProfileImage(data?.publicUrl)
      // console.log(profileImage)
      setButtonVisibility(true)
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error uploading image. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleConfirmUpload = async () => {
    try {
      setUploading(true)

      const [data, err] = await updateProfilePhoto({ imageUrl: profileImage })
      if (err) {
        toast.error('Image upload failed')
      }

      setUploading(false)
      setButtonVisibility(false)
    } catch (error) {
      console.error('Unexpected error in handleConfirmUpload:', error)
      toast.error('An unexpected error occurred')
      setUploading(false)
    }
  }
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  return (
    <div className="flex flex-col items-center justify-center pb-2">
      <div className="relative cursor-pointer" onClick={triggerFileInput}>
        {profileImage ? (
          <Image
            width={160}
            height={160}
            className="aspect-square max-w-40 rounded-2xl object-cover"
            alt=""
            src={profileImage}
            unoptimized
          />
        ) : (
          <div className="h-[160px] w-[160px] rounded-2xl bg-gray-400/5"></div>
        )}
        <div className="absolute left-0 right-0 top-0 flex h-full w-full items-center justify-center rounded-2xl bg-black/50 transition-opacity hover:bg-black/60">
          <p className="font-bold tracking-wide text-white">
            {uploading ? 'Adding...' : profileImage ? '' : 'Change Photo'}
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
        />
      </div>
      {buttonVisibility && (
        <Button onClick={handleConfirmUpload} variant={'underline'}>
          Confirm Changes
        </Button>
      )}
    </div>
  )
}
