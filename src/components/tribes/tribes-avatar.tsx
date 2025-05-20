import { useEffect } from 'react'
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { ImagePlusIcon } from 'lucide-react'
import Image from 'next/image'
import { useFileUpload } from '@/hooks/use-file-upload'
import { TTribesValidator } from '@/lib/validators/forms'

export function TribesProfilePhoto({
  register,
  setValue,
  errors,
}: {
  register: UseFormRegister<TTribesValidator>
  setValue: UseFormSetValue<TTribesValidator>
  errors: FieldErrors<TTribesValidator> | undefined
}) {
  const [{ files }, { openFileDialog, getInputProps, tribeProfilePhoto }] = useFileUpload({
    accept: 'image/*',
    // initialFiles: initialAvatarImage,
  })

  // useEffect(() => {
  //   setValue('tribeProfilePhoto', tribeProfilePhoto[0])
  //   register('tribeProfilePhoto')
  // }, [register, tribeProfilePhoto])

  const currentImage = files[0]?.preview || null

  return (
    <div className="-mt-10 px-6">
      <div className="shadow-xs relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted shadow-black/10">
        {currentImage && (
          <Image
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
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload profile picture"
          //   required
          //   onChange={(e) => {
          //     if (e.target.files && e.target.files.length > 0) {
          //       setValue('tribeProfilePhoto', e.target.files[0])
          //     }
          //   }}
        />
      </div>
    </div>
  )
}
