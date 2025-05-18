'use server'

import { z } from 'zod'
import { createServerAction, ZSAError } from 'zsa'
import { getServerClient } from '@/lib/supabase/server'
import { storeImagesToS3Bucket } from '../images/storeImagesToS3Bucket'
import { fileSchema } from '@/lib/validators/file'

const tribesValidatorSchema = z.object({
  tribe_cover_photo: fileSchema,
  tribe_name: z.string(),
  tribe_photo: fileSchema,
  author: z.string(),
})
export const createTribes = createServerAction()
  .input(tribesValidatorSchema)
  .handler(async ({ input: { tribe_cover_photo, tribe_name, tribe_photo, author } }) => {
    try {
      const supabase = await getServerClient()
      const { data: authData, error: authError } = await supabase.auth.getUser()
      if (authError || !authData?.user) {
        console.error('Authentication failed', authError)
        throw new ZSAError('NOT_AUTHORIZED')
      }
      const [
        { publicUrl: tribeCoverPhotoUrl, error: tribeCoverPhotoErr },
        { publicUrl: tribeProfilePhotoUrl, error: tribeProfilePhotoErr },
      ] = await Promise.all([
        storeImagesToS3Bucket({
          file: tribe_cover_photo,
          supabase,
          userId: authData.user.id,
        }),
        storeImagesToS3Bucket({ file: tribe_photo, supabase, userId: authData.user.id }),
      ])
      if (tribeCoverPhotoErr || tribeProfilePhotoErr) {
        throw new ZSAError('INTERNAL_SERVER_ERROR')
      }

      const { error: tribeError } = await supabase
        .from('tribes')
        .insert({
          author_id: authData.user.id,
          author,
          tribe_cover_photo: tribeCoverPhotoUrl,
          tribe_photo: tribeProfilePhotoUrl,
          tribe_name,
        })
        .eq('author_id', authData.user.id)

      if (tribeError) {
        console.error('Failed to insert tribe', tribeError)
        throw new ZSAError('INTERNAL_SERVER_ERROR')
      }
      return { success: true, error: null }
    } catch (error) {
      if (error instanceof ZSAError) {
        throw new ZSAError('INTERNAL_SERVER_ERROR')
      }

      console.error('Unexpected server error:', error)
      return {
        error: 'Unexpected server error. Please try again later.',
        success: false,
      }
    }
  })
