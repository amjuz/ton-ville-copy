import { useQuery } from '@tanstack/react-query'
import { ImagePlusIcon, XIcon } from 'lucide-react'
import { useEffect } from 'react'
import { FormState, Path, UseFormRegister } from 'react-hook-form'
import { uploadImageToS3Bucket } from '@/lib/supabase/image-upload'
import { useFileUpload } from '@/hooks/use-file-upload'

export function BackgroundPhoto({ backgroundImage }: { backgroundImage: (file: File) => void }) {
  // const maxSizeMB = 1
  // const maxSize = maxSizeMB * 1024 * 1024 // 5MB default

  const [{ files }, { removeFile, openFileDialog, getInputProps, backgroundPhoto }] = useFileUpload(
    {
      accept: 'image/*',
      // maxSize
      //   initialFiles: initialBgImage,
    }
  )

  const currentImage = files[0]?.preview || null

  useEffect(() => {
    backgroundImage(backgroundPhoto[0])
  }, [backgroundPhoto])

  return (
    <div className="h-32">
      <div className="relative flex size-full items-center justify-center overflow-hidden bg-muted">
        {currentImage && (
          <img
            className="size-full object-cover"
            src={currentImage}
            alt={files[0]?.preview ? 'Preview of uploaded image' : 'Default profile background'}
            width={512}
            height={96}
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <button
            type="button"
            className="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-none transition-[color,box-shadow] hover:bg-black/80 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            onClick={openFileDialog}
            aria-label={currentImage ? 'Change image' : 'Upload image'}
          >
            <ImagePlusIcon size={16} aria-hidden="true" />
          </button>
          {currentImage && (
            <button
              type="button"
              className="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-none transition-[color,box-shadow] hover:bg-black/80 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              onClick={() => removeFile(files[0]?.id)}
              aria-label="Remove image"
            >
              <XIcon size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      <input {...getInputProps()} className="sr-only" aria-label="Upload image file" />
    </div>
  )
}
