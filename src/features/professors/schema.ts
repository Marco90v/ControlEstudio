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


// id: string;
// firstName: string;
// lastName: string;
// email: string;
// contactNumber: string;
// gender: 'Male' | 'Female' | 'Other';
// profilePicture?: string;
// role: 'Admin' | 'Professor' | 'Student';
// professionId?: string;
// currentSemester?: number;

export const professorSchema = z.object({
  id: z.string().min(1).max(50),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().email(),
  contactNumber: z.string().min(10).max(15),
  gender: z.enum(['Male', 'Female', 'Other']),
  profilePicture: z.string().url().optional(),
  role: z.enum(['Admin', 'Professor', 'Student']),
});
