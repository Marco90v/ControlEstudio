type visibleSide = {
    status:boolean
  }
type classe = {
    id:number,
    names:string
}
type profession = {
    id:number,
    names:string
}
type ClassesPensum = {
    id: number | null | undefined,
    IdClasses: number | null  | undefined,
    Name_Classes: string | null   | undefined
}
type pensum = {
    IdSemesters: number | null | undefined,
    Name_Semesters: string | null | undefined,
    Classes: classes[]| null | undefined
}
type semesters = {
    id:number,
    names:string
}

type classeStore = {
    status:string,
    selctClasses:number,
    data: classe[]
}
type professionStore = {
    status:string,
    data: profession[]
}
type pensumStore = {
    status:string,
    selectPensum:number,
    data: pensum[]
}
type semestersStore = {
    status:string,
    selectSemester:number
    data:semesters[]
}
type role = {
    id:number,
    names:string
}
type rolesStore = {
    status:string,
    selectRole:number,
    data:role[]
}
type shifts = {
    id:number,
    names:string
}
type shiftsStore = {
    status:string,
    selectShift:number,
    data:shifts[]
}
type sections = {
    id:number,
    names:string
}
type sectionsStore = {
    status:string,
    selectSection:number,
    data:sections[]
}
type person = {
    id: number,
    names: string
    lastNames: string,
    sex: string,
    email: string,
    phone: number,
    photo: string | undefined | null,
    role: number,
    idPerson: number,
    name?: string,
}
type personStore = {
    status:string,
    selectPerson:number,
    data:person[]
}
type getTeacher = {
    idPerson: number,
    name: string,
    lastNames: string,
    sex: string,
    email: string,
    phone: number,
    photo: string,
    profession: profession[] & {
        semesters: semesters[] & {
            classe: classe[] & {
                shift: shift[] & {
                    section: section[]
                }
            }
        }
    }
}

type teacher = {
    id: number,
    IdPersons: number,
    IdProfession: number,
    IdSemesters: number,
    IdClasses: number,
    IdShifts: number,
    IdSections: number
}
type teachersStore = {
    status:string,
    selectTeachers:number,
    data:teacher[]
}
type students = {
    id: number,
    IdPersons: number,
    IdProfession: number,
    IdSemesters: number
}
type studentsStore = {
    status:string,
    selectStudents:number,
    data:students[]
}
type scores = {
    id:number,
    IdStudents:number,
    IdClasses:number,
    IdTeachers:number,
    IdShifts:number,
    IdSections:number,
    score:number
}
type teacherByPSC = {
    id: number,
    IdPersons: number,
    names: string,
    lastNames: string,
    IdClasses: number,
    IdShifts: number,
    IdSections: number
}
type scoresStore = {
    status:string,
    selectStudent:number,
    data:{
        classes:classe[],
        teacherByPS:teacherByPS[],
        scores:scores[]
    }
}
type profile = {
    id:number,
    names: string,
    lastNames: string,
    sex: string,
    email: string,
    phone: number,
    role: number,
    photo: string
}
type session = {
    token: string | null
}
type store = {
    sidebar: visibleSide,
    classes: classeStore,
    profession: professionStore,
    pensum: pensumStore,
    semesters: semestersStore,
    roles: rolesStore,
    shifts: shiftsStore,
    sections: sectionsStore,
    persons: personStore,
    teachers: teachersStore,
    students: studentsStore,
    scores: scoresStore,
    session: {token:string | null},
    profile: profile,
    person: {data:person},
    stateFetch: {data:boolean}
}