const NAMETABLE = {
    classes: "classes",
    semesters: "semesters",
    profession: "profession",
    shifts: "shifts",
    sections: "sections",
    roles: "roles",
    persons: "persons",
    teachers: "teachers",
    students: "students",
    scores: "scores"
}

const INSERT_LISTCOLUMN = {
    teacher: "IdPersons,IdProfession,IdSemesters,IdClasses,IdShifts,IdSections",
    scores: "IdStudents,IdClasses,IdTeachers,IdShifts,IdSections,score"
}

const UPDATE_LISTVALUES = {
    teacher:  "IdPersons = VALUES(IdPersons),\
    IdProfession = VALUES(IdProfession),\
    IdSemesters = VALUES(IdSemesters),\
    IdClasses = VALUES(IdClasses),\
    IdShifts = VALUES(IdShifts),\
    IdSections = VALUES(IdSections)",

    scores: "IdStudents = VALUES(IdStudents),\
    IdClasses = VALUES(IdClasses),\
    IdTeachers = VALUES(IdTeachers),\
    IdShifts = VALUES(IdShifts),\
    IdSections = VALUES(IdSections),\
    score = VALUES(score)"
}

export {NAMETABLE, INSERT_LISTCOLUMN, UPDATE_LISTVALUES}