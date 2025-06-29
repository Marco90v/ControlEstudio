import { z } from "zod"

export const studentSchema = z.object({
  id: z.string().min(1).max(50),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().email(),
  contactNumber: z.string().min(10).max(15),
  gender: z.enum(['Male', 'Female', 'Other']),
  professionId: z.string(),
  currentSemester: z.string(),
  profilePicture: z.string().url().optional(),
  role: z.enum(['Admin', 'Professor', 'Student']),
});