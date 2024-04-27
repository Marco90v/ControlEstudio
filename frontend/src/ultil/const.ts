interface Roles_Protection {
    home:number[],
    classes:number[],
    profession:number[],
    pensums:number[],
    teachers:number[],
    students:number[],
    record:number[],
}

export const TABLE_NAME = {
    PERSONS: "persons",
    CLASSES: "classes",
    PROFESSION: "profession",
    PENSUM: "pensum",
    SEMESTERS: "semesters",
    ROLES: "roles",
    TEACHERS: "teachers",
    STUDENTS: "students",
    SHIFTS: "shifts",
    SECTIONS: "sections",
    SCORES: "scores"
}

export const COLORS = {
    yellow500: "bg-yellow-500",
    red600: "bg-red-600",
    red700: "bg-red-700",
    green600: "bg-green-600",
    green700: "bg-green-700",
}

export const ROLES = {
    TEACHER: "Profesor",
    STUDENT: "Estudiante"
}

export const identifySelect = {
    IDPROFESSION: "IdProfession",
    IDSEMESTERS: "IdSemesters",
    SEMESTERS: "semestres",
    PROFESSION: "profession",
    CLASSES: "classes",
}

export const ROLES_PROTECTION = {
    home:[1,2,3],
    classes:[1],
    profession:[1],
    pensums:[1],
    teachers:[1],
    students:[1],
    record:[1,2,3],
}

export const PAGES = {
    home:'Inicio',
    classes:'Clases',
    profession:'Profesión',
    pensums:'Pensums',
    teachers:'Profesores',
    students:'Estudiantes',
    record:'Notas',
}