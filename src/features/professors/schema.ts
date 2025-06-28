import { z } from "zod"

// professorId: string;
// professionId: string;
// classId: string;
// semester: number;
// shift: 'Morning' | 'Afternoon' | 'Night';
// section: 'A' | 'B' | 'C';

export const assignmentSchema = z.object({
  id: z.string().min(1).max(50),
  professorId: z.string(),
  professionId: z.string(),
  classId: z.string(),
  // semester: z.number(),
  semester: z.coerce.number(),
  // shift: z.string(),
  // section: z.string(),
  shift: z.enum(['Morning', 'Afternoon', 'Night']),
  section: z.enum(['A', 'B', 'C']),
});
