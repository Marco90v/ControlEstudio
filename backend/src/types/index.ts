export type dbId = {
    id: number
}

export type dbIdPersons = {
    idPersons: number
}

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
    role: number,
    id?:number
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

export type dbTeachers2 = {
    id:number
} & dbTeachers

export type pensumNotFormat = {
    id: number,
    IdSemesters : number,
    Name_Semesters: string,
    IdClasses: number,
    Name_Classes: string
}

export type classesFormat ={
    id: number,
    IdClasses: number,
    Name_Classes: string
}

export type pesumFormat = {
    IdSemesters: number,
    Name_Semesters: string,
    Classes: classesFormat[]
}

export type detailStudents = {
    IdStudent: number,
    names: string,
    lastNames: string,
    sex: string,
    email: string,
    phone: number,
    profession: string,
    semester: string
}

export type allStudents = {
    totalStudents: number,
    currentPage: number,
    totalPages: number,
    students: detailStudents[]
}

export type profession = {
    id:number,
    name:string,
    semesters: semester[]
}

export type semester = {
    id:number,
    name:string,
    classe: classe[]
}

export type classe = {
    id:number,
    name:string,
    shift:shift[]
}

export type shift = {
    id:number,
    name:string,
    section:section[]
}

export type section = {
    id:number,
    name:string
}

export type teacher = {
    idPerson:number,
    name:string,
    lastNames:string,
    sex:string,
    email:string,
    phone:string,
    photo?:string,
    profession:profession[]
}

export type scores = {
    IdStudents:number,
    IdClasses:number,
    IdTeachers:number,
    IdShifts:number,
    IdSections:number,
    score:number
}

export type oldFormat = {
    idPerson:number,
    names:string,
    lastNames:string,
    sex:string,
    email:string,
    phone:string,
    photo?:string,
    idProfession: number,
    profession:string,
    idSemester: number,
    semester:string,
    idClasse: number,
    classe:string,
    idShift: number,
    shift:string,
    idSection: number,
    section:string,
}

