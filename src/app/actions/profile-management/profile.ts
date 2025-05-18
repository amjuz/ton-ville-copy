'use server'

import { z } from 'zod'
import { createServerAction } from 'zsa'
import { getServerClient } from '@/lib/supabase/server'

export const updateProfilePhoto = createServerAction()
  .input(
    z.object({
      imageUrl: z.string(),
    })
  )
  .handler(async ({ input: { imageUrl } }) => {
    try {
      const supabase = await getServerClient()

      const { data: userData, error: authErr } = await supabase.auth.getUser()

      if (authErr) {
        return { success: false, error: authErr.message }
      }
      const userId = userData.user.id

      const { data, error } = await supabase
        .from('profile')
        .update({ profile_photo: imageUrl })
        .eq('id', userId)

      if (error) {
        console.log('Error updating profile photo:', error)
        return { success: false, error: error.message }
      }

      return {
        success: true,
        data: data,
        message: 'Profile photo updated successfully',
      }
    } catch (error) {
      console.log('Unexpected error:', error)
      return {
        success: false,
        error: error,
      }
    }
  })
