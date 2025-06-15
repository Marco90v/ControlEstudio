export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  gender: 'Male' | 'Female' | 'Other';
  role: 'Admin' | 'Professor' | 'Student';
  profilePicture?: string;
  professionId?: string;
  currentSemester?: number;
}

export interface Class {
  id: string;
  name: string;
  code: string;
  credits: number;
  description?: string;
}

export interface Profession {
  id: string;
  name: string;
  code: string;
  totalSemesters: number;
  description?: string;
}

export interface PensumEntry {
  id: string;
  professionId: string;
  classId: string;
  semester: number;
  isElective: boolean;
}

export interface ProfessorAssignment {
  id: string;
  professorId: string;
  professionId: string;
  classId: string;
  semester: number;
  shift: 'Morning' | 'Afternoon' | 'Night';
  section: 'A' | 'B' | 'C';
}

export interface Grade {
  id: string;
  studentId: string;
  classId: string;
  semester: number;
  grade?: number;
  status: 'Pending' | 'Passed' | 'Failed';
}

export interface StudentEnrollment {
  id: string;
  studentId: string;
  professionId: string;
  currentSemester: number;
  enrollmentDate: string;
}