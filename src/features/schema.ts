import { z } from "zod"

export const classSchema = z.object({
  id: z.string().min(1).max(50),
  code: z.string().min(4, 'Must be at least 4 characters long.').max(10, 'Must have a maximum of 10 characters'),
  name: z.string().min(1, 'Must be at least 1 character long.').max(50, 'Must have a maximum of 50 characters'),
  // credits: z.number().min(1).max(10),
  credits:  z.coerce.number().min(1, 'Must be at least 1 credits.').max(10, 'Must have a maximum of 10 credits'),
  description: z.string().optional()
})