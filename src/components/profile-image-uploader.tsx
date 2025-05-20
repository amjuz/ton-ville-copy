'use client'

import { useEffect } from 'react'
import { AlertCircleIcon, ImageUpIcon, XIcon } from 'lucide-react'
import Image from 'next/image'
import { useFileUpload } from '@/hooks/use-file-upload'

export default function ProfileImage({
  handleUpload,
}: {
  handleUpload: (file: File) => void
  cancelButtonVisibility: boolean
}) {
  // const maxSizeMB = 5
  // const maxSize = maxSizeMB * 1024 * 1024 // 5MB default

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
      rawFiles,
    },
  ] = useFileUpload({
    accept: 'image/*',
    // maxSize,
  })
  const previewUrl = files[0]?.preview || null

  useEffect(() => {
    async function Upload() {
      await handleUpload(rawFiles[0])
    }
    Upload()
    return () => {
      // Revoke object URLs to avoid memory leaks
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview)
        }
      })
    }
  }, [rawFiles, files, handleUpload])
  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        {/* Drop area */}
        <div
          role="button"
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className="has-disabled:pointer-events-none has-disabled:opacity-50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-input bg-secondary p-4 transition-colors hover:bg-accent/50 has-[img]:border-none has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50"
        >
          <input {...getInputProps()} className="sr-only" aria-label="Upload file" />
          {previewUrl ? (
            <div className="absolute inset-0">
              <Image
                src={previewUrl}
                alt={files[0]?.file?.name || 'Uploaded image'}
                className="size-full object-cover"
                width={720}
                height={480}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              <div
                className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
                aria-hidden="true"
              >
                <ImageUpIcon className="size-4 opacity-60" />
              </div>
              <p className="text-md mb-1.5 font-bold">Change profile Photo</p>
              <p className="text-xs text-muted-foreground">Max size: 1MB</p>
            </div>
          )}
        </div>
        {previewUrl && (
          <div className="absolute right-4 top-4">
            <button
              type="button"
              className="z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-none transition-[color,box-shadow] hover:bg-black/80 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              onClick={() => removeFile(files[0]?.id)}
              aria-label="Remove image"
            >
              <XIcon className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div className="flex items-center gap-1 text-xs text-destructive" role="alert">
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  )
}
