import { z } from 'zod'
import { fileSchema } from './file'

export type TTribesValidator = z.infer<typeof tribesValidator>
export const tribesValidator = z.object({
  tribeProfilePhoto: fileSchema,
  tribeCoverPhoto: fileSchema,
  author: z.string(),
  tribeName: z.string(),
})
