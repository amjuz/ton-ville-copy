import { ImagePlusIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useFileUpload } from '@/hooks/use-file-upload'

export function AvatarPhoto({ avatarImage }: { avatarImage: (file: File) => void }) {
  // const maxSizeMB = 1
  // const maxSize = maxSizeMB * 1024 * 1024 // 5MB default

  const [{ files }, { openFileDialog, getInputProps, avatarPhoto }] = useFileUpload({
    accept: 'image/*',
    // maxSize
    //   initialFiles: initialAvatarImage,
  })

  const currentImage = files[0]?.preview || null

  useEffect(() => {
    avatarImage(avatarPhoto[0])
  }, [avatarPhoto])

  return (
    <div className="-mt-10 px-6">
      <div className="shadow-xs relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted shadow-black/10">
        {currentImage && (
          <img
            src={currentImage}
            className="size-full object-cover"
            width={80}
            height={80}
            alt="Profile image"
          />
        )}
        <button
          type="button"
          className="absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-none transition-[color,box-shadow] hover:bg-black/80 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          onClick={openFileDialog}
          aria-label="Change profile picture"
        >
          <ImagePlusIcon size={16} aria-hidden="true" />
        </button>
        <input {...getInputProps()} className="sr-only" aria-label="Upload profile picture" />
      </div>
    </div>
  )
}
