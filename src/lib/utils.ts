import type { Grade, Login, PensumEntry, Profession, Professor, ProfessorAssignment, Profile, Student } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ADMIN, NA, PENDING, PROFESSOR, STUDENT, USER } from "@/lib/const";
import { toast } from "sonner";

export type pensums = {
    id: string;
    IdProfession: string;
    IdClasse: string;
    IdSemester: number;
    isElective: boolean;
    nameClasse: string | undefined;
    code: string | undefined;
    credits: number | undefined;
    description: string | undefined;
}

export type semesterType = {
  id: string;
  IdClasse: string;
  nameClasse: string | undefined;
  code: string | undefined;
  credits: number | undefined;
  description: string | undefined;
  isElective: boolean;
};

export type NewPensum = {
  IdProfession: string;
  semester: {
    IdSemester: number;
    classes: semesterType[];
  }[];
};

export const demoCredentials:Login[] = [
  {email:'LeonadoCuellar@email.com', password:'1234', role:'Admin'},
  {email:'AlmaFranco@email.com', password:'1234', role:'Admin'},
  {email:'RafaCozar@email.com', password:'1234', role:'Professor'},
  {email:'OdalysMadrigal@email.com', password:'1234', role:'Professor'},
  {email:'AngelNavas@email.com', password:'1234', role:'Student'},
  {email:'TatianaEcheverria@email.com', password:'1234', role:'Student'},
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRoles(role: number | null  | undefined) {
  switch (role) {
    case 1:
      return ADMIN
    case 2:
      return PROFESSOR
    case 3:
      return STUDENT
    default:
      return USER
  }
}

export function transformPensum(data: pensums[]):NewPensum | undefined {
  if (data.length === 0) {
    // throw new Error("Input data cannot be empty");
    return undefined;
  }

  const { IdProfession } = data[0];

  const semestersMap = new Map<number, semesterType[]>();

  for (const item of data) {
    if (!semestersMap.has(item.IdSemester)) {
      semestersMap.set(item.IdSemester, []);
    }

    semestersMap.get(item.IdSemester)!.push({
      id: item.id,
      IdClasse: item.IdClasse,
      nameClasse: item.nameClasse,
      code: item.code,
      credits: item.credits,
      description: item.description,
      isElective: item.isElective,
    });
  }

  const semester = Array.from(semestersMap.entries()).map(([IdSemester, classes]) => ({
    IdSemester,
    classes,
  }));

  return {
    IdProfession,
    semester,
  };
}

export const getTotalCredits = (cls: semesterType[]) => {
  return cls.reduce((total, subject) => total + (subject.credits ?? 0), 0);
};

export const getTotalClassesByProfessor = (ProfessorAssignment: ProfessorAssignment[], professor:Professor) => {
  return ProfessorAssignment.filter(a => a.professorId === professor.id).length || 0;
};

export const protectedStudentsDemo = (id: string) => {
  const UUIDStudentsDemo = [
    "1d96e513-b127-48e2-a520-dd9e69fe25fe",
    "52437e39-f35d-4801-831e-a398b1887fb5",
  ]
  return UUIDStudentsDemo.includes(id) ? false : true
};

export const protectedProfessionsDemo = (id: string) => {
  const idProfessionsDemo = [
    "23cb51af-1b0e-4bc4-873e-a99c9b6d7ab2",
  ]
  return idProfessionsDemo.includes(id) ? false : true
};
export const protectedProfessorsDemo = (id: string) => {
  const idProfesorsDemo = [
    "8e832043-042e-46c9-8811-ba40cec0b495",
    "91547631-ac79-4778-941f-4fbaae94048c",
  ]
  return idProfesorsDemo.includes(id) ? false : true
};

export const getCurrentSemester = (students: Student[], profile: Profile | null) => {
  return students.filter(student => student.id === profile?.userUID)?.[0]?.currentSemester || null;
};

export const getNameProfession = (professions: Profession[], professionId: string) => {
  if(professions === undefined) return NA;
  if(professions.length === 0) return NA;
  if(professionId === undefined) return NA;
  return professions.filter(profession => profession.id === professionId)[0]?.names || NA;
};

export const search = <T>(data: T[], searchTerm: string, keys:(keyof T)[]):T[] => {
  if (!searchTerm) return data;
  const lowerSearch = searchTerm.toLowerCase();
  if (searchTerm) {
    return data.filter(item =>
      keys.some(key => {
        const value = item[key];
        return (
          typeof value === 'string' &&
          value.toLowerCase().includes(lowerSearch)
        );
      })
    );
  }
  return data;
};

// Get student grades for current user
export const getStudentGrades = (studentId: string | undefined, students: Student[], professions: Profession[], pensums: PensumEntry[], grades: Grade[]) => {
  if(!studentId) return [];
  const student = students.find(s => s.id === studentId);
  if (!student) return [];

  const studentProfession = professions.find(p => p.id === student.professionId);
  if (!studentProfession) return [];

  // Get all classes for current semester
  const currentSemester = student.currentSemester || 1;
  const semesterClasses = pensums
    .filter(p => p.IdProfession === student.professionId && p.IdSemester <= Number(currentSemester))
    .map(p => {
      const grade = grades.find(g => g.studentId === studentId && g.classId === p.IdClasse);
      return {
        id: grade?.id || crypto.randomUUID(),
        studentId: studentId,
        classId: p.IdClasse,
        semester: p.IdSemester,
        grade: grade?.grade || undefined,
        status: grade?.status || PENDING,
      };
    });
  return semesterClasses;
};

export const getGPA = (studentId: string | undefined, grades: Grade[]) => {
  if(!studentId) return 0;
  const studentGrades = grades.filter(g => g.studentId === studentId && g.grade !== undefined);
  if (studentGrades.length === 0) return 0;
  
  const totalGrades = studentGrades.reduce((sum, g) => sum + (g.grade || 0), 0);
  return Math.round((totalGrades / studentGrades.length) * 100) / 100;
};

 // Filter students based on user role
  export const getAvailableStudents = (students: Student[], profile: Profile | null, professorAssignments: ProfessorAssignment[], grades: Grade[]) => {
    if (getRoles(profile?.role) === ADMIN) {
      return students;
    } else if (getRoles(profile?.role) === PROFESSOR) {
      // Professor can only see students from their assigned classes
      const newProfessorAssignments = professorAssignments.filter(a => a.professorId === profile?.id.toString());
      const assignedClassIds = newProfessorAssignments.map(a => a.classId);
      
      return students.filter(student => {
        const studentGrades = grades.filter(g => g.studentId === student.id);
        return studentGrades.some(grade => assignedClassIds.includes(grade.classId));
      });
    }
    return [];
  };

  export const alert = (title: string, description: string) => {
    toast(title, {
      description: description,
      action: {
        label: "Undo",
        onClick: () => null,
      },
    })
  }