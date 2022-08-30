export type dbAdmin = {
    IdPersons : number
}

export type dbClasses = {
    names :string
}

export type dbLogin = {
    user: string,
    pass: string,
    IdPersons: number
}

export type dbPensum = {
    IdProfession: number,
    IdSemesters: number,
    IdClasses: number
}

export type dbPersons = {
    names: string,
    lastNames: string,
    sex: string,
    email: string,
    phone: number,
    photo: string | null,
    role: number
}

export type dbProfession = {
    names: string
}

export type dbRoles = {
    names: string
}

export type dbScore = {
    IdStudents: number,
    IdClasses: number,
    IdTeachers: number,
    IdShifts: number,
    IdSections: number,
    score: number
}

export type dbSections = {
    names: string
}

export type dbSemesters = {
    names: string
}

export type dbShifts = {
    names: string
}

export type dbStudensts = {
    IdPersons: number,
    IdProfession: number,
    IdSemesters: number
}

export type dbTeachers = {
    IdPersons: number,
    IdProfession: number,
    IdSemesters: number,
    IdClasses: number,
    IdShifts: number,
    IdSections: number
}

export type pensumNotFormat = {
    IdSemesters : number,
    Name_Semesters: string,
    IdClasses: number,
    Name_Classes: string
}

export type classesFormat ={
    IdClasses: number,
    Name_Classes: string
}

export type pesumFormat = {
    IdSemesters: number,
    Name_Semesters: string,
    Classes: classesFormat[]
}