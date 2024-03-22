import { gql } from "../__generated__"

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

export const GET_SHIFTS =gql(`
    query AllShifts {
        allShifts {
            id
            names
        }
    }
`)
export const GET_SECTIONS =gql(`
    query AllSections {
        allSections {
            id
            names
        }
    }
`)
export const GET_PROFESSIONS =gql(`
    query AllProfession {
        allProfession {
            id
            names
        }
    }
`)
export const GET_SEMESTERS =gql(`
    query AllSemesters {
        allSemesters {
            id
            names
        }
    }
`)
export const GET_CLASSES =gql(`
    query AllClasses {
        allClasses {
            id
            names
        }
    }
`)
export const LOGIN = gql(`
    query Login($user: String, $pass: String) {
        login(user: $user, pass: $pass) {
            token
            __typename
        }
    }
`);
export const GET_ClASSES = gql(`
    query AllClasses {
        allClasses {
            id
            names
        }
    }
`)
export const ADD_CLASSE = gql(`
    mutation AddClasses($dataClasse: inputClasse) {
        addClasses(dataClasse: $dataClasse) {
            id
            names
        }
    }
`)
export const UPDATE_CLASSE = gql(`
    mutation UpdateClasses($dataClasse: inputClasse) {
        updateClasses(dataClasse: $dataClasse) {
            id
            names
        }
    }
`)
export const DELETE_CLASSE = gql(`
    mutation DeleteClasses($deleteClassesId: Int) {
        deleteClasses(id: $deleteClassesId)
    }
`)
export const GET_PENSUM = gql(`
    query GetPensumById($getPensumByIdId: Int) {
        getPensumById(id: $getPensumByIdId) {
            IdSemesters
            Name_Semesters
            Classes {
                id
                IdClasses   
                Name_Classes
            }
  }
    }
`)
export const ADD_CLASSES_PENSUM = gql(`
    mutation AddClassesPensum($dataPensum: DataPensum) {
        addClassesPensum(DataPensum: $dataPensum)
    }
`)
export const DELETE_CLASSES_PENSUM = gql(`
    mutation DeleteClassePensum($deleteClassePensumId: Int) {
        deleteClassePensum(id: $deleteClassePensumId)
    }
`)
export const ADD_PROFESSION = gql(`
    mutation AddProfession($dataProfession: inputProfession) {
        addProfession(dataProfession: $dataProfession) {
            id
            names
        }
    }
`)
export const UPDATE_PROFESSION = gql(`
    mutation UpdateProfession($dataProfession: inputProfession) {
        updateProfession(dataProfession: $dataProfession) {
            id
            names
        }
    }
`)
export const DELETE_PROFESSION = gql(`
    mutation DeleteProfession($deleteProfessionId: Int) {
        deleteProfession(id: $deleteProfessionId)
    }
`)

export const GET_ROLES = gql(`
    query AllRoles {
        allRoles {
            id
            names
        }
    }
`)
export const ADD_PERSON = gql(`
    mutation AddPerson($dataPerson: inputPerson) {
        addPerson(dataPerson: $dataPerson) {
            id
            names
            lastNames
            sex
            email
            phone
            photo
            role
        }
    }
`)
export const UPDATE_PERSON = gql(`
    mutation UpdatePerson($dataPerson: inputPerson) {
        updatePerson(dataPerson: $dataPerson) {
            id
            names
            lastNames
            sex
            email
            phone
            photo
            role
        }
    }
`)
export const ADD_TEACHER = gql(`
    mutation AddTeacher($dataTeacher: [inputTeacher]) {
        addTeacher(dataTeacher: $dataTeacher)
    }
`)
export const GET_PROFESSION_SEMESTER_BY_PERSON = gql(`
    query GetStudentsByPerson($idPersons: Int) {
        getStudentsByPerson(IdPersons: $idPersons) {
            id
            IdPersons
            IdProfession
            IdSemesters
        }
    }
`)
export const ADD_STUDENT = gql(`
    mutation AddStudents($dataStudent: inputStudent) {
        addStudents(dataStudent: $dataStudent) {
            id
            IdPersons
            IdProfession
            IdSemesters
        }
    }
`)
export const UPDATE_STUDENT = gql(`
    mutation UpdateStudent($dataStudent: inputStudent) {
        updateStudent(dataStudent: $dataStudent) {
            id
            IdPersons
            IdProfession
            IdSemesters
        }
    }
`)
export const DELETE_STUDENT_BY_PERSON = gql(`
    mutation DeleteStudentByIdPerson($idPersons: Int) {
        deleteStudentByIdPerson(IdPersons: $idPersons)
    }
`)
export const GET_PROFILE_AND_ROLES = gql(`
    query GetProfileAndRoles {
        getProfile {
            id
            names
            lastNames
            sex
            email
            phone
            photo
            role
        }
        allRoles {
            id
            names
        }
    }
`)
export const GET_STUDENT_BY_PERSON = gql(`
    query GetStudentsByPerson($idPersons: Int) {
        getStudentsByPerson(IdPersons: $idPersons) {
            id
            IdPersons
            IdProfession
            IdSemesters
        }
    }
`)
export const ADD_SCORE = gql(`
    mutation Mutation($dataScores: [inputScore]) {
        addScore(dataScores: $dataScores)
    }
`)

export const UPDATE_SCORE = gql(`
    mutation UpdateScore($dataScores: [inputScore]) {
        updateScore(dataScores: $dataScores)
    }
`)
export const DATA_SCORES = gql(`
    query dataScore($professionAndSemesters: ProfessionAndSemesters, $idStudents: Int) {
        getClassesByProfessionAndSemesters(ProfessionAndSemesters: $professionAndSemesters) {
            id
            names
        }
        getTeachersByProfessionAndSemesters(ProfessionAndSemesters: $professionAndSemesters) {
            id
            IdPersons
            names
            lastNames
            IdClasses
            IdShifts
            IdSections
        }
        getScores(idStudents: $idStudents) {
            id
            IdStudents
            IdTeachers
            IdClasses
            IdShifts
            IdSections
            score
        }
    }
`)
export const GET_PERSON_BY_ROLE = gql(`
    query GetPersonByRole($role: Int) {
        getPersonByRole(role: $role) {
            id
            names
            lastNames
            sex
            email
            phone
            photo
            role
        }
    }
`)
export const DELETE_TEACHER_BY_PERSON = gql(`
    mutation DeleteTeacherByIdPerson($idPersons: Int) {
        deleteTeacherByIdPerson(IdPersons: $idPersons)
    }
`)
export const DELETE_PERSON = gql(`
    mutation DeletePerson($deletePersonId: Int) {
        deletePerson(id: $deletePersonId)
    }
`)
export const GET_TEACHER_BY_PERSON = gql(`
    query GetTeacherByPerson($getTeacherByPersonId: Int) {
        getTeacherByPerson(id: $getTeacherByPersonId) {
            id
            IdPersons
            IdProfession
            IdSemesters
            IdClasses
            IdShifts
            IdSections
        }
    }
`)
export const UPDATE_TEACHER = gql(`
    mutation UpdateTeacher($dataTeacher: [inputTeacher]) {
        updateTeacher(dataTeacher: $dataTeacher)
    }
`)
export const DELETE_TEACHER = gql(`
    mutation DeleteTeacher($ids: [Int]) {
        deleteTeacher(ids: $ids)
    }
`)
