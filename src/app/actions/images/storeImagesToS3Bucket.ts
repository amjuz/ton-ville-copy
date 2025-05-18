import { nanoid } from '@reduxjs/toolkit'
import { SupabaseClient } from '@supabase/supabase-js'

export const storeImagesToS3Bucket = async ({
  file,
  supabase,
  userId,
}: {
  file: File
  userId: string
  supabase: SupabaseClient
}) => {
  try {
    const bucketName = 'images'

    // Generate a unique file name
    const fileExt = file.name.split('.').pop()
    const randomId = nanoid(16)
    const fileName = userId
      ? `user-${userId}-${randomId}.${fileExt}`
      : `upload-${randomId}.${fileExt}`

    const filePath = `${bucketName}/${fileName}`

    // Convert file to arrayBuffer for Supabase upload
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    // Upload the file to Supabase Storage
    const { error } = await supabase.storage.from(bucketName).upload(filePath, buffer, {
      contentType: file.type,
      cacheControl: '3600',
      upsert: false,
    })

    if (error) {
      console.error('Supabase upload error:', error)
      return { success: false, error: error.message, data: null }
    }

    // Get the public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucketName).getPublicUrl(filePath)

    return { publicUrl, error: null, success: true }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      data: null,
      error: error,
    }
  }
}
