import { z } from "zod"

export const professionSchema = z.object({
  id: z.string().min(1).max(50),
  code: z.string().min(2, 'Must be at least 2 characters long.').max(10, 'Must have a maximum of 10 characters'),
  name: z.string().min(1, 'Must be at least 1 character long.').max(50, 'Must have a maximum of 50 characters'),
  totalSemesters:  z.coerce.number().min(1, 'Must be at least 1 semesters.').max(20, 'Must have a maximum of 20 semesters'), 
  description: z.string().optional()
});