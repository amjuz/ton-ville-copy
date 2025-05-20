'use server'

import { nanoid } from '@reduxjs/toolkit'
import { getServerClient } from './server'

export async function uploadImageToS3Bucket(file: File) {
  const supabase = await getServerClient()

  const { data: userData, error: authErr } = await supabase.auth.getUser()
  if (authErr) throw new Error('Authentication failed')
  const userId = userData.user.id

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

  if (error) throw new Error('Storage Error')

  // Get the public URL
  const {
    data: { publicUrl },
  } = await supabase.storage.from(bucketName).getPublicUrl(filePath)

  return publicUrl
}
