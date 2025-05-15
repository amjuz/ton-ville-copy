import { z } from 'zod'

export const MAX_BIO_LENGTH = 90
export const MAX_SKILL_TITLE_LENGTH = 20
export const MAX_DISPLAY_NAME_LENGTH = 20

export const skillSchema = z.object({
  id: z.string(),
  title: z.string().min(3).max(MAX_SKILL_TITLE_LENGTH),
  subSkill: z.string(),
})
export const EditProfileSchema = z.object({
  displayName: z.string().min(3).max(MAX_DISPLAY_NAME_LENGTH).optional(),
  addBio: z.string().max(MAX_BIO_LENGTH),
  skill: skillSchema.array().optional(),
})
export type TSKillSchema = z.infer<typeof skillSchema>
export type TEditProfileSchema = z.infer<typeof EditProfileSchema>
