const NAMETABLE = {
    classes: "classes",
    semesters: "semesters",
    profession: "profession",
    shifts: "shifts",
    sections: "sections",
    roles: "roles",
    persons: "persons",
    teachers: "teachers"
}

const INSERT_LISTCOLUMN = {
    teacher: "IdPersons,IdProfession,IdSemesters,IdClasses,IdShifts,IdSections"
}

const UPDATE_LISTVALUES = {
    teacher:  "IdPersons = VALUES(IdPersons),\
    IdProfession = VALUES(IdProfession),\
    IdSemesters = VALUES(IdSemesters),\
    IdClasses = VALUES(IdClasses),\
    IdShifts = VALUES(IdShifts),\
    IdSections = VALUES(IdSections)"
}

export {NAMETABLE, INSERT_LISTCOLUMN, UPDATE_LISTVALUES}