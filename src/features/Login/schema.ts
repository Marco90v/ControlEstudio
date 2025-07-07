import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
  role: z.enum(['Admin', 'Professor', 'Student']) 
});