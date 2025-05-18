import { z } from 'zod'

export const fileSchema = z
  .instanceof(File, { message: 'Required file input is missing' })
  .refine((file) => file.size <= 5000000, { message: 'File size must be less than 5MB' })
  .refine((file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), {
    message: 'File must be JPEG, PNG, or WebP',
  })
