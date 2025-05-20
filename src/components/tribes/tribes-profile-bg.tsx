import { useEffect } from 'react'
import { ImagePlusIcon, XIcon } from 'lucide-react'
import {
  FieldError,
  FieldErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form'
import Image from 'next/image'
import { useFileUpload } from '@/hooks/use-file-upload'
import { TTribesValidator } from '@/lib/validators/tribes'

export function TribesCoverPhoto({
  register,
  setValue,
  errors,
}: {
  register: UseFormRegister<TTribesValidator>
  setValue: UseFormSetValue<TTribesValidator>
  errors: FieldErrors<TTribesValidator> | undefined
}) {
  const [{ files }, { removeFile, openFileDialog, getInputProps, tribeCoverPhoto }] = useFileUpload(
    {
      accept: 'image/*',
      // initialFiles: initialBgImage,
    }
  )
  const currentImage = files[0]?.preview || null

  useEffect(() => {
    setValue('tribeCoverPhoto', tribeCoverPhoto[0])
    register('tribeCoverPhoto')
  }, [register, tribeCoverPhoto, setValue])

  return (
    <div className="h-32">
      <div className="relative flex size-full items-center justify-center overflow-hidden bg-muted">
        {currentImage && (
          <Image
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
      <input
        {...getInputProps()}
        className="sr-only"
        aria-label="Upload image file"
        // required
        // {...register('tribeCoverPhoto')}
        // onChange={(e) => {
        //   if (e.target.files && e.target.files.length > 0) {
        //     setValue('tribeCoverPhoto', e.target.files[0])
        //   }
        // }}
      />
    </div>
  )
}
