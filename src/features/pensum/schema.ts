import { z } from "zod"

// export const pensumSchema = z.object({
//   id: z.string().min(1).max(50),
//   professionId: z.string(),
//   classId: z.string().min(1, 'You must select an item'),
//   semester:  z.coerce.number().min(1, 'Must be at least 1 semester.').max(20, 'Must have a maximum of 20 semesters'),
//   isElective: z.boolean()
// });

export const pensumSchema = z.object({
  id: z.string().min(1).max(50),
  IdProfession: z.string(),
  IdClasse: z.string().min(1, 'You must select an item'),
  IdSemester:  z.coerce.number().min(1, 'Must be at least 1 semester.').max(20, 'Must have a maximum of 20 semesters'),
  isElective: z.boolean()
});