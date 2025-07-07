import type { ProfessorAssignment } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRoles(role: number | null  | undefined) {
  switch (role) {
    case 1:
      return 'Admin'
    case 2:
      return 'Professor'
    case 3:
      return 'Student'
    default:
      return 'User'
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
  // return 0;
};

export const getTotalClassesByProfessor = (ProfessorAssignment: ProfessorAssignment[]) => {
  return ProfessorAssignment.length;
};
