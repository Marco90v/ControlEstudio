/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    query AllShifts {\n        allShifts {\n            id\n            names\n        }\n    }\n": types.AllShiftsDocument,
    "\n    query AllSections {\n        allSections {\n            id\n            names\n        }\n    }\n": types.AllSectionsDocument,
    "\n    query AllProfession {\n        allProfession {\n            id\n            names\n        }\n    }\n": types.AllProfessionDocument,
    "\n    query AllSemesters {\n        allSemesters {\n            id\n            names\n        }\n    }\n": types.AllSemestersDocument,
    "\n    query AllClasses {\n        allClasses {\n            id\n            names\n        }\n    }\n": types.AllClassesDocument,
    "\n    query Login($user: String, $pass: String) {\n        login(user: $user, pass: $pass) {\n            token\n            __typename\n        }\n    }\n": types.LoginDocument,
    "\n    mutation AddClasses($dataClasse: inputClasse) {\n        addClasses(dataClasse: $dataClasse) {\n            id\n            names\n        }\n    }\n": types.AddClassesDocument,
    "\n    mutation UpdateClasses($dataClasse: inputClasse) {\n        updateClasses(dataClasse: $dataClasse) {\n            id\n            names\n        }\n    }\n": types.UpdateClassesDocument,
    "\n    mutation DeleteClasses($deleteClassesId: Int) {\n        deleteClasses(id: $deleteClassesId)\n    }\n": types.DeleteClassesDocument,
    "\n    query GetPensumById($getPensumByIdId: Int) {\n        getPensumById(id: $getPensumByIdId) {\n            IdSemesters\n            Name_Semesters\n            Classes {\n                id\n                IdClasses   \n                Name_Classes\n            }\n  }\n    }\n": types.GetPensumByIdDocument,
    "\n    mutation AddClassesPensum($dataPensum: DataPensum) {\n        addClassesPensum(DataPensum: $dataPensum)\n    }\n": types.AddClassesPensumDocument,
    "\n    mutation DeleteClassePensum($deleteClassePensumId: Int) {\n        deleteClassePensum(id: $deleteClassePensumId)\n    }\n": types.DeleteClassePensumDocument,
    "\n    mutation AddProfession($dataProfession: inputProfession) {\n        addProfession(dataProfession: $dataProfession) {\n            id\n            names\n        }\n    }\n": types.AddProfessionDocument,
    "\n    mutation UpdateProfession($dataProfession: inputProfession) {\n        updateProfession(dataProfession: $dataProfession) {\n            id\n            names\n        }\n    }\n": types.UpdateProfessionDocument,
    "\n    mutation DeleteProfession($deleteProfessionId: Int) {\n        deleteProfession(id: $deleteProfessionId)\n    }\n": types.DeleteProfessionDocument,
    "\n    query AllRoles {\n        allRoles {\n            id\n            names\n        }\n    }\n": types.AllRolesDocument,
    "\n    mutation AddPerson($dataPerson: inputPerson) {\n        addPerson(dataPerson: $dataPerson) {\n            id\n            names\n            lastNames\n            sex\n            email\n            phone\n            photo\n            role\n        }\n    }\n": types.AddPersonDocument,
    "\n    mutation UpdatePerson($dataPerson: inputPerson) {\n        updatePerson(dataPerson: $dataPerson) {\n            id\n            names\n            lastNames\n            sex\n            email\n            phone\n            photo\n            role\n        }\n    }\n": types.UpdatePersonDocument,
    "\n    mutation AddTeacher($dataTeacher: [inputTeacher]) {\n        addTeacher(dataTeacher: $dataTeacher)\n    }\n": types.AddTeacherDocument,
    "\n    query GetStudentsByPerson($idPersons: Int) {\n        getStudentsByPerson(IdPersons: $idPersons) {\n            id\n            IdPersons\n            IdProfession\n            IdSemesters\n        }\n    }\n": types.GetStudentsByPersonDocument,
    "\n    mutation AddStudents($dataStudent: inputStudent) {\n        addStudents(dataStudent: $dataStudent) {\n            id\n            IdPersons\n            IdProfession\n            IdSemesters\n        }\n    }\n": types.AddStudentsDocument,
    "\n    mutation UpdateStudent($dataStudent: inputStudent) {\n        updateStudent(dataStudent: $dataStudent) {\n            id\n            IdPersons\n            IdProfession\n            IdSemesters\n        }\n    }\n": types.UpdateStudentDocument,
    "\n    mutation DeleteStudentByIdPerson($idPersons: Int) {\n        deleteStudentByIdPerson(IdPersons: $idPersons)\n    }\n": types.DeleteStudentByIdPersonDocument,
    "\n    query GetProfileAndRoles {\n        getProfile {\n            id\n            names\n            lastNames\n            sex\n            email\n            phone\n            photo\n            role\n        }\n        allRoles {\n            id\n            names\n        }\n    }\n": types.GetProfileAndRolesDocument,
    "\n    mutation Mutation($dataScores: [inputScore]) {\n        addScore(dataScores: $dataScores)\n    }\n": types.MutationDocument,
    "\n    mutation UpdateScore($dataScores: [inputScore]) {\n        updateScore(dataScores: $dataScores)\n    }\n": types.UpdateScoreDocument,
    "\n    query dataScore($professionAndSemesters: ProfessionAndSemesters, $idStudents: Int) {\n        getClassesByProfessionAndSemesters(ProfessionAndSemesters: $professionAndSemesters) {\n            id\n            names\n        }\n        getTeachersByProfessionAndSemesters(ProfessionAndSemesters: $professionAndSemesters) {\n            id\n            IdPersons\n            names\n            lastNames\n            IdClasses\n            IdShifts\n            IdSections\n        }\n        getScores(idStudents: $idStudents) {\n            id\n            IdStudents\n            IdTeachers\n            IdClasses\n            IdShifts\n            IdSections\n            score\n        }\n    }\n": types.DataScoreDocument,
    "\n    query GetPersonByRole($role: Int) {\n        getPersonByRole(role: $role) {\n            id\n            names\n            lastNames\n            sex\n            email\n            phone\n            photo\n            role\n        }\n    }\n": types.GetPersonByRoleDocument,
    "\n    mutation DeleteTeacherByIdPerson($idPersons: Int) {\n        deleteTeacherByIdPerson(IdPersons: $idPersons)\n    }\n": types.DeleteTeacherByIdPersonDocument,
    "\n    mutation DeletePerson($deletePersonId: Int) {\n        deletePerson(id: $deletePersonId)\n    }\n": types.DeletePersonDocument,
    "\n    query GetTeacherByPerson($getTeacherByPersonId: Int) {\n        getTeacherByPerson(id: $getTeacherByPersonId) {\n            id\n            IdPersons\n            IdProfession\n            IdSemesters\n            IdClasses\n            IdShifts\n            IdSections\n        }\n    }\n": types.GetTeacherByPersonDocument,
    "\n    mutation UpdateTeacher($dataTeacher: [inputTeacher]) {\n        updateTeacher(dataTeacher: $dataTeacher)\n    }\n": types.UpdateTeacherDocument,
    "\n    mutation DeleteTeacher($ids: [Int]) {\n        deleteTeacher(ids: $ids)\n    }\n": types.DeleteTeacherDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query AllShifts {\n        allShifts {\n            id\n            names\n        }\n    }\n"): (typeof documents)["\n    query AllShifts {\n        allShifts {\n            id\n            names\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query AllSections {\n        allSections {\n            id\n            names\n        }\n    }\n"): (typeof documents)["\n    query AllSections {\n        allSections {\n            id\n            names\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query AllProfession {\n        allProfession {\n            id\n            names\n        }\n    }\n"): (typeof documents)["\n    query AllProfession {\n        allProfession {\n            id\n            names\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query AllSemesters {\n        allSemesters {\n            id\n            names\n        }\n    }\n"): (typeof documents)["\n    query AllSemesters {\n        allSemesters {\n            id\n            names\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query AllClasses {\n        allClasses {\n            id\n            names\n        }\n    }\n"): (typeof documents)["\n    query AllClasses {\n        allClasses {\n            id\n            names\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query Login($user: String, $pass: String) {\n        login(user: $user, pass: $pass) {\n            token\n            __typename\n        }\n    }\n"): (typeof documents)["\n    query Login($user: String, $pass: String) {\n        login(user: $user, pass: $pass) {\n            token\n            __typename\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation AddClasses($dataClasse: inputClasse) {\n        addClasses(dataClasse: $dataClasse) {\n            id\n            names\n        }\n    }\n"): (typeof documents)["\n    mutation AddClasses($dataClasse: inputClasse) {\n        addClasses(dataClasse: $dataClasse) {\n            id\n            names\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateClasses($dataClasse: inputClasse) {\n        updateClasses(dataClasse: $dataClasse) {\n            id\n            names\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateClasses($dataClasse: inputClasse) {\n        updateClasses(dataClasse: $dataClasse) {\n            id\n            names\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteClasses($deleteClassesId: Int) {\n        deleteClasses(id: $deleteClassesId)\n    }\n"): (typeof documents)["\n    mutation DeleteClasses($deleteClassesId: Int) {\n        deleteClasses(id: $deleteClassesId)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetPensumById($getPensumByIdId: Int) {\n        getPensumById(id: $getPensumByIdId) {\n            IdSemesters\n            Name_Semesters\n            Classes {\n                id\n                IdClasses   \n                Name_Classes\n            }\n  }\n    }\n"): (typeof documents)["\n    query GetPensumById($getPensumByIdId: Int) {\n        getPensumById(id: $getPensumByIdId) {\n            IdSemesters\n            Name_Semesters\n            Classes {\n                id\n                IdClasses   \n                Name_Classes\n            }\n  }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation AddClassesPensum($dataPensum: DataPensum) {\n        addClassesPensum(DataPensum: $dataPensum)\n    }\n"): (typeof documents)["\n    mutation AddClassesPensum($dataPensum: DataPensum) {\n        addClassesPensum(DataPensum: $dataPensum)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteClassePensum($deleteClassePensumId: Int) {\n        deleteClassePensum(id: $deleteClassePensumId)\n    }\n"): (typeof documents)["\n    mutation DeleteClassePensum($deleteClassePensumId: Int) {\n        deleteClassePensum(id: $deleteClassePensumId)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation AddProfession($dataProfession: inputProfession) {\n        addProfession(dataProfession: $dataProfession) {\n            id\n            names\n        }\n    }\n"): (typeof documents)["\n    mutation AddProfession($dataProfession: inputProfession) {\n        addProfession(dataProfession: $dataProfession) {\n            id\n            names\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateProfession($dataProfession: inputProfession) {\n        updateProfession(dataProfession: $dataProfession) {\n            id\n            names\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateProfession($dataProfession: inputProfession) {\n        updateProfession(dataProfession: $dataProfession) {\n            id\n            names\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteProfession($deleteProfessionId: Int) {\n        deleteProfession(id: $deleteProfessionId)\n    }\n"): (typeof documents)["\n    mutation DeleteProfession($deleteProfessionId: Int) {\n        deleteProfession(id: $deleteProfessionId)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query AllRoles {\n        allRoles {\n            id\n            names\n        }\n    }\n"): (typeof documents)["\n    query AllRoles {\n        allRoles {\n            id\n            names\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation AddPerson($dataPerson: inputPerson) {\n        addPerson(dataPerson: $dataPerson) {\n            id\n            names\n            lastNames\n            sex\n            email\n            phone\n            photo\n            role\n        }\n    }\n"): (typeof documents)["\n    mutation AddPerson($dataPerson: inputPerson) {\n        addPerson(dataPerson: $dataPerson) {\n            id\n            names\n            lastNames\n            sex\n            email\n            phone\n            photo\n            role\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdatePerson($dataPerson: inputPerson) {\n        updatePerson(dataPerson: $dataPerson) {\n            id\n            names\n            lastNames\n            sex\n            email\n            phone\n            photo\n            role\n        }\n    }\n"): (typeof documents)["\n    mutation UpdatePerson($dataPerson: inputPerson) {\n        updatePerson(dataPerson: $dataPerson) {\n            id\n            names\n            lastNames\n            sex\n            email\n            phone\n            photo\n            role\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation AddTeacher($dataTeacher: [inputTeacher]) {\n        addTeacher(dataTeacher: $dataTeacher)\n    }\n"): (typeof documents)["\n    mutation AddTeacher($dataTeacher: [inputTeacher]) {\n        addTeacher(dataTeacher: $dataTeacher)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetStudentsByPerson($idPersons: Int) {\n        getStudentsByPerson(IdPersons: $idPersons) {\n            id\n            IdPersons\n            IdProfession\n            IdSemesters\n        }\n    }\n"): (typeof documents)["\n    query GetStudentsByPerson($idPersons: Int) {\n        getStudentsByPerson(IdPersons: $idPersons) {\n            id\n            IdPersons\n            IdProfession\n            IdSemesters\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation AddStudents($dataStudent: inputStudent) {\n        addStudents(dataStudent: $dataStudent) {\n            id\n            IdPersons\n            IdProfession\n            IdSemesters\n        }\n    }\n"): (typeof documents)["\n    mutation AddStudents($dataStudent: inputStudent) {\n        addStudents(dataStudent: $dataStudent) {\n            id\n            IdPersons\n            IdProfession\n            IdSemesters\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateStudent($dataStudent: inputStudent) {\n        updateStudent(dataStudent: $dataStudent) {\n            id\n            IdPersons\n            IdProfession\n            IdSemesters\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateStudent($dataStudent: inputStudent) {\n        updateStudent(dataStudent: $dataStudent) {\n            id\n            IdPersons\n            IdProfession\n            IdSemesters\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteStudentByIdPerson($idPersons: Int) {\n        deleteStudentByIdPerson(IdPersons: $idPersons)\n    }\n"): (typeof documents)["\n    mutation DeleteStudentByIdPerson($idPersons: Int) {\n        deleteStudentByIdPerson(IdPersons: $idPersons)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetProfileAndRoles {\n        getProfile {\n            id\n            names\n            lastNames\n            sex\n            email\n            phone\n            photo\n            role\n        }\n        allRoles {\n            id\n            names\n        }\n    }\n"): (typeof documents)["\n    query GetProfileAndRoles {\n        getProfile {\n            id\n            names\n            lastNames\n            sex\n            email\n            phone\n            photo\n            role\n        }\n        allRoles {\n            id\n            names\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation Mutation($dataScores: [inputScore]) {\n        addScore(dataScores: $dataScores)\n    }\n"): (typeof documents)["\n    mutation Mutation($dataScores: [inputScore]) {\n        addScore(dataScores: $dataScores)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateScore($dataScores: [inputScore]) {\n        updateScore(dataScores: $dataScores)\n    }\n"): (typeof documents)["\n    mutation UpdateScore($dataScores: [inputScore]) {\n        updateScore(dataScores: $dataScores)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query dataScore($professionAndSemesters: ProfessionAndSemesters, $idStudents: Int) {\n        getClassesByProfessionAndSemesters(ProfessionAndSemesters: $professionAndSemesters) {\n            id\n            names\n        }\n        getTeachersByProfessionAndSemesters(ProfessionAndSemesters: $professionAndSemesters) {\n            id\n            IdPersons\n            names\n            lastNames\n            IdClasses\n            IdShifts\n            IdSections\n        }\n        getScores(idStudents: $idStudents) {\n            id\n            IdStudents\n            IdTeachers\n            IdClasses\n            IdShifts\n            IdSections\n            score\n        }\n    }\n"): (typeof documents)["\n    query dataScore($professionAndSemesters: ProfessionAndSemesters, $idStudents: Int) {\n        getClassesByProfessionAndSemesters(ProfessionAndSemesters: $professionAndSemesters) {\n            id\n            names\n        }\n        getTeachersByProfessionAndSemesters(ProfessionAndSemesters: $professionAndSemesters) {\n            id\n            IdPersons\n            names\n            lastNames\n            IdClasses\n            IdShifts\n            IdSections\n        }\n        getScores(idStudents: $idStudents) {\n            id\n            IdStudents\n            IdTeachers\n            IdClasses\n            IdShifts\n            IdSections\n            score\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetPersonByRole($role: Int) {\n        getPersonByRole(role: $role) {\n            id\n            names\n            lastNames\n            sex\n            email\n            phone\n            photo\n            role\n        }\n    }\n"): (typeof documents)["\n    query GetPersonByRole($role: Int) {\n        getPersonByRole(role: $role) {\n            id\n            names\n            lastNames\n            sex\n            email\n            phone\n            photo\n            role\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteTeacherByIdPerson($idPersons: Int) {\n        deleteTeacherByIdPerson(IdPersons: $idPersons)\n    }\n"): (typeof documents)["\n    mutation DeleteTeacherByIdPerson($idPersons: Int) {\n        deleteTeacherByIdPerson(IdPersons: $idPersons)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeletePerson($deletePersonId: Int) {\n        deletePerson(id: $deletePersonId)\n    }\n"): (typeof documents)["\n    mutation DeletePerson($deletePersonId: Int) {\n        deletePerson(id: $deletePersonId)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetTeacherByPerson($getTeacherByPersonId: Int) {\n        getTeacherByPerson(id: $getTeacherByPersonId) {\n            id\n            IdPersons\n            IdProfession\n            IdSemesters\n            IdClasses\n            IdShifts\n            IdSections\n        }\n    }\n"): (typeof documents)["\n    query GetTeacherByPerson($getTeacherByPersonId: Int) {\n        getTeacherByPerson(id: $getTeacherByPersonId) {\n            id\n            IdPersons\n            IdProfession\n            IdSemesters\n            IdClasses\n            IdShifts\n            IdSections\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateTeacher($dataTeacher: [inputTeacher]) {\n        updateTeacher(dataTeacher: $dataTeacher)\n    }\n"): (typeof documents)["\n    mutation UpdateTeacher($dataTeacher: [inputTeacher]) {\n        updateTeacher(dataTeacher: $dataTeacher)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteTeacher($ids: [Int]) {\n        deleteTeacher(ids: $ids)\n    }\n"): (typeof documents)["\n    mutation DeleteTeacher($ids: [Int]) {\n        deleteTeacher(ids: $ids)\n    }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;