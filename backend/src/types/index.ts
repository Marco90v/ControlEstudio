export interface dbId {
  id: number
}

export interface dbIdPersons {
  idPersons: number
}

export interface dbAdmin {
  IdPersons: number
}

export interface dbClasses {
  names: string
}

export interface dbLogin {
  user: string
  pass: string
  IdPersons: number
}

export interface dbPensum {
  IdProfession: number
  IdSemesters: number
  IdClasses: number
}

export interface dbPersons {
  names: string
  lastNames: string
  sex: string
  email: string
  phone: number
  photo: string | null
  role: number
  id?: number
}

export interface dbProfession {
  names: string
}

export interface dbRoles {
  names: string
}

export interface dbScore {
  IdStudents: number
  IdClasses: number
  IdTeachers: number
  IdShifts: number
  IdSections: number
  score: number
}

export interface dbSections {
  names: string
}

export interface dbSemesters {
  names: string
}

export interface dbShifts {
  names: string
}

export interface dbStudensts {
  IdPersons: number
  IdProfession: number
  IdSemesters: number
}

export interface dbTeachers {
  IdPersons: number
  IdProfession: number
  IdSemesters: number
  IdClasses: number
  IdShifts: number
  IdSections: number
}

export type dbTeachers2 = {
  id: number
} & dbTeachers

export interface pensumNotFormat {
  id: number
  IdSemesters: number
  Name_Semesters: string
  IdClasses: number
  Name_Classes: string
}

export interface classesFormat {
  id: number
  IdClasses: number
  Name_Classes: string
}

export interface pesumFormat {
  IdSemesters: number
  Name_Semesters: string
  Classes: classesFormat[]
}

export interface detailStudents {
  IdStudent: number
  names: string
  lastNames: string
  sex: string
  email: string
  phone: number
  profession: string
  semester: string
}

export interface allStudents {
  totalStudents: number
  currentPage: number
  totalPages: number
  students: detailStudents[]
}

export interface profession {
  id: number
  name: string
  semesters: semester[]
}

export interface semester {
  id: number
  name: string
  classe: classe[]
}

export interface classe {
  id: number
  name: string
  shift: shift[]
}

export interface shift {
  id: number
  name: string
  section: section[]
}

export interface section {
  id: number
  name: string
}

export interface teacher {
  idPerson: number
  name: string
  lastNames: string
  sex: string
  email: string
  phone: string
  photo?: string
  profession: profession[]
}

export interface scores {
  IdStudents: number
  IdClasses: number
  IdTeachers: number
  IdShifts: number
  IdSections: number
  score: number
}

export interface token {
  id: number
  names: string
  lastNames: string
  sex: string
  email: string
  phone: number
  photo: string | null
  role: number
  iat: number
}

export type profile = Omit<token, 'iat'>

export interface oldFormat {
  idPerson: number
  names: string
  lastNames: string
  sex: string
  email: string
  phone: string
  photo?: string
  idProfession: number
  profession: string
  idSemester: number
  semester: string
  idClasse: number
  classe: string
  idShift: number
  shift: string
  idSection: number
  section: string
}
