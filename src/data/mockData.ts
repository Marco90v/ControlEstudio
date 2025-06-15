import { Class, Profession, PensumEntry, ProfessorAssignment, Grade, StudentEnrollment, User } from '../types';

export const mockClasses: Class[] = [
  { id: '1', name: 'Cálculo I', code: 'MAT101', credits: 4, description: 'Introducción al cálculo diferencial e integral' },
  { id: '2', name: 'Programación I', code: 'CS101', credits: 3, description: 'Fundamentos de programación' },
  { id: '3', name: 'Física I', code: 'PHY101', credits: 4, description: 'Mecánica clásica' },
  { id: '4', name: 'Química General', code: 'CHE101', credits: 3, description: 'Principios básicos de química' },
  { id: '5', name: 'Historia Universal', code: 'HIS101', credits: 2, description: 'Historia mundial' },
  { id: '6', name: 'Cálculo II', code: 'MAT102', credits: 4, description: 'Cálculo multivariable' },
  { id: '7', name: 'Programación II', code: 'CS102', credits: 3, description: 'Programación orientada a objetos' },
  { id: '8', name: 'Física II', code: 'PHY102', credits: 4, description: 'Electromagnetismo' }
];

export const mockProfessions: Profession[] = [
  { id: '1', name: 'Ingeniería en Sistemas', code: 'IS', totalSemesters: 8, description: 'Carrera de ingeniería en sistemas computacionales' },
  { id: '2', name: 'Ingeniería Civil', code: 'IC', totalSemesters: 10, description: 'Carrera de ingeniería civil' },
  { id: '3', name: 'Medicina', code: 'MED', totalSemesters: 12, description: 'Carrera de medicina' },
  { id: '4', name: 'Derecho', code: 'DER', totalSemesters: 8, description: 'Carrera de derecho' }
];

export const mockPensum: PensumEntry[] = [
  { id: '1', professionId: '1', classId: '1', semester: 1, isElective: false },
  { id: '2', professionId: '1', classId: '2', semester: 1, isElective: false },
  { id: '3', professionId: '1', classId: '5', semester: 1, isElective: false },
  { id: '4', professionId: '1', classId: '6', semester: 2, isElective: false },
  { id: '5', professionId: '1', classId: '7', semester: 2, isElective: false },
  { id: '6', professionId: '1', classId: '3', semester: 2, isElective: false }
];

export const mockProfessors: User[] = [
  {
    id: '2',
    firstName: 'Dr. Carlos',
    lastName: 'Rodríguez',
    email: 'carlos.rodriguez@university.edu',
    contactNumber: '+1-555-0102',
    gender: 'Male',
    role: 'Professor',
    profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '4',
    firstName: 'Dra. Elena',
    lastName: 'Vásquez',
    email: 'elena.vasquez@university.edu',
    contactNumber: '+1-555-0104',
    gender: 'Female',
    role: 'Professor',
    profilePicture: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

export const mockStudents: User[] = [
  {
    id: '3',
    firstName: 'Ana',
    lastName: 'Martínez',
    email: 'ana.martinez@student.university.edu',
    contactNumber: '+1-555-0103',
    gender: 'Female',
    role: 'Student',
    professionId: '1',
    currentSemester: 3,
    profilePicture: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '5',
    firstName: 'José',
    lastName: 'Pérez',
    email: 'jose.perez@student.university.edu',
    contactNumber: '+1-555-0105',
    gender: 'Male',
    role: 'Student',
    professionId: '1',
    currentSemester: 2,
    profilePicture: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

export const mockProfessorAssignments: ProfessorAssignment[] = [
  { id: '1', professorId: '2', professionId: '1', classId: '1', semester: 1, shift: 'Morning', section: 'A' },
  { id: '2', professorId: '2', professionId: '1', classId: '6', semester: 2, shift: 'Morning', section: 'A' },
  { id: '3', professorId: '4', professionId: '1', classId: '2', semester: 1, shift: 'Afternoon', section: 'B' }
];

export const mockGrades: Grade[] = [
  { id: '1', studentId: '3', classId: '1', semester: 1, grade: 85, status: 'Passed' },
  { id: '2', studentId: '3', classId: '2', semester: 1, grade: 92, status: 'Passed' },
  { id: '3', studentId: '3', classId: '5', semester: 1, grade: 78, status: 'Passed' },
  { id: '4', studentId: '5', classId: '1', semester: 1, grade: 67, status: 'Passed' },
  { id: '5', studentId: '5', classId: '2', semester: 1, status: 'Pending' }
];

export const mockEnrollments: StudentEnrollment[] = [
  { id: '1', studentId: '3', professionId: '1', currentSemester: 3, enrollmentDate: '2023-08-15' },
  { id: '2', studentId: '5', professionId: '1', currentSemester: 2, enrollmentDate: '2024-01-20' }
];