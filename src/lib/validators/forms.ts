import { z } from 'zod'
import { fileSchema } from './file'

export type TTribesValidator = z.infer<typeof tribesValidator>
export const tribesValidator = z.object({
  tribeProfilePhoto: z.string().url('Must be a valid URL'),
  tribeCoverPhoto: z.string().url('Must be a valid URL'),
  author: z.string(),
  tribeName: z.string(),
})

export const twitterSchema = z.object({
  twitterId: z.string().min(1, 'Required').max(10, 'Max 10 characters'),
  tribeId: z.string(),
})

export type TEventsFormSchema = z.infer<typeof eventsFormSchema>
export const eventsFormSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  eventPhoto: z.string().url('Must be a valid URL'),
  genre: z.string().min(1, 'Genre is required'),
  location: z.string().min(1, 'Location is required'),
  summary: z.string().min(10, 'Summary should be at least 10 characters'),
  title: z.string().min(1, 'Title is required'),
})

export type TQuestFormSchema = z.infer<typeof questFormSchema>
export const questFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subTitle: z.string().min(1, 'Subtitle is required'),
  questImage: z.string().url('Must be a valid image URL'),
  description: z.string().min(10, 'Description should be at least 10 characters'),
  guidelines: z.string().min(5, 'Guidelines should be at least 5 characters'),
})
