'use server'
import { z } from 'zod'
import { createServerAction } from 'zsa'
import { nanoid } from '@reduxjs/toolkit'
import { getServerClient } from '@/lib/supabase/server'

const fileSchema = z
  .instanceof(File, { message: 'Required file input is missing' })
  .refine((file) => file.size <= 5000000, { message: 'File size must be less than 5MB' })
  .refine((file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), {
    message: 'File must be JPEG, PNG, or WebP',
  })

export const handleImageUpload = createServerAction()
  .input(
    z.object({
      file: fileSchema,
    })
  )
  .handler(async ({ input }) => {
    try {
      const supabase = await getServerClient()

      const { data: userData, error: authErr } = await supabase.auth.getUser()
      if (authErr) {
        return { success: false, error: authErr.message }
      }
      const userId = userData.user.id

      const bucketName = 'images'

      const { file } = input

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
        return { success: false, error: error.message }
      }

      // Get the public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from(bucketName).getPublicUrl(filePath)

      return {
        success: true,
        publicUrl,
        fileDetails: {
          fileName,
          filePath,
          fileType: file.type,
          fileSize: file.size,
        },
      }
    } catch (error) {
      console.error('Server action error:', error)
      return {
        success: false,
        error:
          error instanceof z.ZodError
            ? error.errors.map((e) => e.message).join(', ')
            : 'Failed to upload image',
      }
    }
  })
// export async function handleImageUpload(formData: FormData) {
//     try {
//       // Extract file from FormData
//       const file = formData.get('file');

//       if (!file || !(file instanceof File)) {
//         return { error: 'No file provided' };
//       }

//       // Generate a unique file name
//       const fileExt = file.name.split('.').pop();
//       const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
//       const filePath = `profile-images/${fileName}`;

//       // Convert file to arrayBuffer for Supabase upload
//       const arrayBuffer = await file.arrayBuffer();
//       const buffer = new Uint8Array(arrayBuffer);

//       // Upload the file to Supabase Storage
//       const { data, error } = await supabase.storage
//         .from('profile-images')
//         .upload(filePath, buffer, {
//           contentType: file.type,
//           cacheControl: '3600',
//           upsert: false
//         });

//       if (error) {
//         console.error('Supabase upload error:', error);
//         return { error: error.message };
//       }

//       // Get the public URL
//       const { data: { publicUrl } } = supabase.storage
//         .from('profile-images')
//         .getPublicUrl(filePath);

//       // You could also update the user's profile in your database here
//       // Example:
//       // await updateUserProfileInDatabase({ userId, profileImage: publicUrl });

//       return { publicUrl };

//     } catch (error) {
//       console.error('Server action error:', error);
//       return { error: 'Failed to upload image' };
//     }
//   }
