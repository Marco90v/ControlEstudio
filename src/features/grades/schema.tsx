// id: string;
// studentId: string;
// classId: string;
// semester: number;
// grade?: number;
// status: 'Pending' | 'Passed' | 'Failed';

import { z } from "zod"

export const gradeSchema = z.object({
  id: z.string().min(1).max(50),
  studentId: z.string(),
  classId: z.string(),
  semester: z.number(),
  grade: z.number().optional(),
  status: z.enum(['Pending', 'Passed', 'Failed']),
});