/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type ClasseFormatPensum = {
  __typename?: 'ClasseFormatPensum';
  IdClasses: Scalars['Int']['output'];
  Name_Classes: Scalars['String']['output'];
  id: Scalars['Int']['output'];
};

export type ClassePensum = {
  IdClasses?: InputMaybe<Scalars['Int']['input']>;
  IdProfession?: InputMaybe<Scalars['Int']['input']>;
  IdSemesters?: InputMaybe<Scalars['Int']['input']>;
  Name_Classes?: InputMaybe<Scalars['String']['input']>;
};

export type ClassesByProfessionAndSemesters = {
  __typename?: 'ClassesByProfessionAndSemesters';
  id: Scalars['Int']['output'];
  names: Scalars['String']['output'];
};

export type DataPensum = {
  body?: InputMaybe<Array<InputMaybe<ClassePensum>>>;
  p?: InputMaybe<Scalars['Int']['input']>;
};

export type InputSemester = {
  id?: InputMaybe<Scalars['Int']['input']>;
  names?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addClasses?: Maybe<Classes>;
  addClassesPensum?: Maybe<Scalars['Boolean']['output']>;
  addPerson?: Maybe<Person>;
  addProfession?: Maybe<Profession>;
  addRole?: Maybe<Role>;
  addScore?: Maybe<Scalars['Boolean']['output']>;
  addSection?: Maybe<Shift>;
  addSemester?: Maybe<Semester>;
  addShift?: Maybe<Shift>;
  addStudents?: Maybe<Student>;
  addTeacher?: Maybe<Scalars['Boolean']['output']>;
  deleteClassePensum?: Maybe<Scalars['Boolean']['output']>;
  deleteClasses?: Maybe<Scalars['Int']['output']>;
  deletePerson?: Maybe<Scalars['Int']['output']>;
  deleteProfession?: Maybe<Scalars['Int']['output']>;
  deleteRole?: Maybe<Scalars['Int']['output']>;
  deleteSection?: Maybe<Scalars['Int']['output']>;
  deleteSemester?: Maybe<Scalars['Int']['output']>;
  deleteShift?: Maybe<Scalars['Int']['output']>;
  deleteStudentByIdPerson?: Maybe<Scalars['Int']['output']>;
  deleteTeacher?: Maybe<Scalars['Boolean']['output']>;
  deleteTeacherByIdPerson?: Maybe<Scalars['Int']['output']>;
  updateClasses?: Maybe<Classes>;
  updatePerson?: Maybe<Person>;
  updateProfession?: Maybe<Profession>;
  updateRole?: Maybe<Role>;
  updateScore?: Maybe<Scalars['Boolean']['output']>;
  updateSection?: Maybe<Shift>;
  updateSemester?: Maybe<Semester>;
  updateShift?: Maybe<Shift>;
  updateStudent?: Maybe<Student>;
  updateTeacher?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationAddClassesArgs = {
  dataClasse?: InputMaybe<InputClasse>;
};


export type MutationAddClassesPensumArgs = {
  DataPensum?: InputMaybe<DataPensum>;
};


export type MutationAddPersonArgs = {
  dataPerson?: InputMaybe<InputPerson>;
};


export type MutationAddProfessionArgs = {
  dataProfession?: InputMaybe<InputProfession>;
};


export type MutationAddRoleArgs = {
  dataRole?: InputMaybe<InputRole>;
};


export type MutationAddScoreArgs = {
  dataScores?: InputMaybe<Array<InputMaybe<InputScore>>>;
};


export type MutationAddSectionArgs = {
  dataSection?: InputMaybe<InputSection>;
};


export type MutationAddSemesterArgs = {
  dataSemester?: InputMaybe<InputSemester>;
};


export type MutationAddShiftArgs = {
  dataShift?: InputMaybe<InputShift>;
};


export type MutationAddStudentsArgs = {
  dataStudent?: InputMaybe<InputStudent>;
};


export type MutationAddTeacherArgs = {
  dataTeacher?: InputMaybe<Array<InputMaybe<InputTeacher>>>;
};


export type MutationDeleteClassePensumArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDeleteClassesArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDeletePersonArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDeleteProfessionArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDeleteRoleArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDeleteSectionArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDeleteSemesterArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDeleteShiftArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDeleteStudentByIdPersonArgs = {
  IdPersons?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDeleteTeacherArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};


export type MutationDeleteTeacherByIdPersonArgs = {
  IdPersons?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateClassesArgs = {
  dataClasse?: InputMaybe<InputClasse>;
};


export type MutationUpdatePersonArgs = {
  dataPerson?: InputMaybe<InputPerson>;
};


export type MutationUpdateProfessionArgs = {
  dataProfession?: InputMaybe<InputProfession>;
};


export type MutationUpdateRoleArgs = {
  dataRole?: InputMaybe<InputRole>;
};


export type MutationUpdateScoreArgs = {
  dataScores?: InputMaybe<Array<InputMaybe<InputScore>>>;
};


export type MutationUpdateSectionArgs = {
  dataSection?: InputMaybe<InputSection>;
};


export type MutationUpdateSemesterArgs = {
  dataSemester?: InputMaybe<InputSemester>;
};


export type MutationUpdateShiftArgs = {
  dataShift?: InputMaybe<InputShift>;
};


export type MutationUpdateStudentArgs = {
  dataStudent?: InputMaybe<InputStudent>;
};


export type MutationUpdateTeacherArgs = {
  dataTeacher?: InputMaybe<Array<InputMaybe<InputTeacher>>>;
};

export type Pensum = {
  __typename?: 'Pensum';
  Classes: Array<Maybe<ClasseFormatPensum>>;
  IdSemesters: Scalars['Int']['output'];
  Name_Semesters: Scalars['String']['output'];
};

export type ProfessionAndSemesters = {
  IdProfession?: InputMaybe<Scalars['Int']['input']>;
  IdSemesters?: InputMaybe<Scalars['Int']['input']>;
};

export type Profile = {
  __typename?: 'Profile';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastNames: Scalars['String']['output'];
  names: Scalars['String']['output'];
  phone: Scalars['Int']['output'];
  photo?: Maybe<Scalars['String']['output']>;
  role: Scalars['Int']['output'];
  sex: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  allAdmin?: Maybe<Array<Maybe<AllAdminAndDataPersons>>>;
  allClasses?: Maybe<Array<Maybe<Classes>>>;
  allPersons: Array<Person>;
  allProfession?: Maybe<Array<Maybe<Profession>>>;
  allRoles?: Maybe<Array<Maybe<Role>>>;
  allSections?: Maybe<Array<Maybe<Section>>>;
  allSemesters?: Maybe<Array<Maybe<Semester>>>;
  allShifts?: Maybe<Array<Maybe<Shift>>>;
  getClassesByProfessionAndSemesters?: Maybe<Array<Maybe<ClassesByProfessionAndSemesters>>>;
  getPensumById?: Maybe<Array<Maybe<Pensum>>>;
  getPersonById: Person;
  getPersonByRole: Array<Person>;
  getProfile?: Maybe<Profile>;
  getScores?: Maybe<Array<Maybe<Score>>>;
  getStudents?: Maybe<Array<Maybe<Student>>>;
  getStudentsByPerson?: Maybe<Student>;
  getTeacherByPerson: Array<Teacher>;
  getTeachers?: Maybe<Array<Maybe<Teacher>>>;
  getTeachersByProfessionAndSemesters?: Maybe<Array<Maybe<TeachersByProfessionAndSemesters>>>;
  login?: Maybe<Token>;
};


export type QueryGetClassesByProfessionAndSemestersArgs = {
  ProfessionAndSemesters?: InputMaybe<ProfessionAndSemesters>;
};


export type QueryGetPensumByIdArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetPersonByIdArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetPersonByRoleArgs = {
  role?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetScoresArgs = {
  idStudents?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetStudentsByPersonArgs = {
  IdPersons?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetTeacherByPersonArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetTeachersByProfessionAndSemestersArgs = {
  ProfessionAndSemesters?: InputMaybe<ProfessionAndSemesters>;
};


export type QueryLoginArgs = {
  pass?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type TeachersByProfessionAndSemesters = {
  __typename?: 'TeachersByProfessionAndSemesters';
  IdClasses: Scalars['Int']['output'];
  IdPersons: Scalars['Int']['output'];
  IdSections: Scalars['Int']['output'];
  IdShifts: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  lastNames: Scalars['String']['output'];
  names: Scalars['String']['output'];
};

export type Token = {
  __typename?: 'Token';
  token: Scalars['String']['output'];
};

export type AllAdminAndDataPersons = {
  __typename?: 'allAdminAndDataPersons';
  IdAdmin: Scalars['String']['output'];
  IdPerson: Scalars['String']['output'];
  email: Scalars['String']['output'];
  lastNames: Scalars['String']['output'];
  names: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  photo?: Maybe<Scalars['String']['output']>;
  sex: Scalars['String']['output'];
};

export type Classes = {
  __typename?: 'classes';
  id: Scalars['Int']['output'];
  names: Scalars['String']['output'];
};

export type InputClasse = {
  id?: InputMaybe<Scalars['Int']['input']>;
  names?: InputMaybe<Scalars['String']['input']>;
};

export type InputGetPersonById = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type InputPerson = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  lastNames?: InputMaybe<Scalars['String']['input']>;
  names?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['Int']['input']>;
  photo?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['Int']['input']>;
  sex?: InputMaybe<Scalars['String']['input']>;
};

export type InputProfession = {
  id?: InputMaybe<Scalars['Int']['input']>;
  names?: InputMaybe<Scalars['String']['input']>;
};

export type InputRole = {
  id?: InputMaybe<Scalars['Int']['input']>;
  names?: InputMaybe<Scalars['String']['input']>;
};

export type InputScore = {
  IdClasses?: InputMaybe<Scalars['Int']['input']>;
  IdSections?: InputMaybe<Scalars['Int']['input']>;
  IdShifts?: InputMaybe<Scalars['Int']['input']>;
  IdStudents?: InputMaybe<Scalars['Int']['input']>;
  IdTeachers?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  score?: InputMaybe<Scalars['Int']['input']>;
};

export type InputSection = {
  id?: InputMaybe<Scalars['Int']['input']>;
  names?: InputMaybe<Scalars['String']['input']>;
};

export type InputShift = {
  id?: InputMaybe<Scalars['Int']['input']>;
  names?: InputMaybe<Scalars['String']['input']>;
};

export type InputStudent = {
  IdPersons?: InputMaybe<Scalars['Int']['input']>;
  IdProfession?: InputMaybe<Scalars['Int']['input']>;
  IdSemesters?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type InputTeacher = {
  IdClasses?: InputMaybe<Scalars['Int']['input']>;
  IdPersons?: InputMaybe<Scalars['Int']['input']>;
  IdProfession?: InputMaybe<Scalars['Int']['input']>;
  IdSections?: InputMaybe<Scalars['Int']['input']>;
  IdSemesters?: InputMaybe<Scalars['Int']['input']>;
  IdShifts?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type InsertId = {
  __typename?: 'insertId';
  insertId: Scalars['Int']['output'];
};

export type Person = {
  __typename?: 'person';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastNames: Scalars['String']['output'];
  names: Scalars['String']['output'];
  phone: Scalars['Int']['output'];
  photo?: Maybe<Scalars['String']['output']>;
  role: Scalars['Int']['output'];
  sex: Scalars['String']['output'];
};

export type Profession = {
  __typename?: 'profession';
  id: Scalars['Int']['output'];
  names: Scalars['String']['output'];
};

export type Role = {
  __typename?: 'role';
  id: Scalars['Int']['output'];
  names: Scalars['String']['output'];
};

export type Score = {
  __typename?: 'score';
  IdClasses: Scalars['Int']['output'];
  IdSections: Scalars['Int']['output'];
  IdShifts: Scalars['Int']['output'];
  IdStudents: Scalars['Int']['output'];
  IdTeachers: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  score: Scalars['Int']['output'];
};

export type Section = {
  __typename?: 'section';
  id: Scalars['Int']['output'];
  names: Scalars['String']['output'];
};

export type Semester = {
  __typename?: 'semester';
  id: Scalars['Int']['output'];
  names: Scalars['String']['output'];
};

export type Shift = {
  __typename?: 'shift';
  id: Scalars['Int']['output'];
  names: Scalars['String']['output'];
};

export type Student = {
  __typename?: 'student';
  IdPersons: Scalars['Int']['output'];
  IdProfession: Scalars['Int']['output'];
  IdSemesters: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
};

export type Teacher = {
  __typename?: 'teacher';
  IdClasses: Scalars['Int']['output'];
  IdPersons: Scalars['Int']['output'];
  IdProfession: Scalars['Int']['output'];
  IdSections: Scalars['Int']['output'];
  IdSemesters: Scalars['Int']['output'];
  IdShifts: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
};

export type AllClassesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllClassesQuery = { __typename?: 'Query', allClasses?: Array<{ __typename?: 'classes', id: number, names: string } | null> | null };

export type AddClassesMutationVariables = Exact<{
  dataClasse?: InputMaybe<InputClasse>;
}>;


export type AddClassesMutation = { __typename?: 'Mutation', addClasses?: { __typename?: 'classes', id: number, names: string } | null };

export type UpdateClassesMutationVariables = Exact<{
  dataClasse?: InputMaybe<InputClasse>;
}>;


export type UpdateClassesMutation = { __typename?: 'Mutation', updateClasses?: { __typename?: 'classes', id: number, names: string } | null };

export type DeleteClassesMutationVariables = Exact<{
  deleteClassesId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DeleteClassesMutation = { __typename?: 'Mutation', deleteClasses?: number | null };

export type AllProfessionQueryVariables = Exact<{ [key: string]: never; }>;


export type AllProfessionQuery = { __typename?: 'Query', allProfession?: Array<{ __typename?: 'profession', id: number, names: string } | null> | null };

export type GetPensumByIdQueryVariables = Exact<{
  getPensumByIdId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPensumByIdQuery = { __typename?: 'Query', getPensumById?: Array<{ __typename?: 'Pensum', IdSemesters: number, Name_Semesters: string, Classes: Array<{ __typename?: 'ClasseFormatPensum', id: number, IdClasses: number, Name_Classes: string } | null> } | null> | null };

export type AddClassesPensumMutationVariables = Exact<{
  dataPensum?: InputMaybe<DataPensum>;
}>;


export type AddClassesPensumMutation = { __typename?: 'Mutation', addClassesPensum?: boolean | null };

export type DeleteClassePensumMutationVariables = Exact<{
  deleteClassePensumId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DeleteClassePensumMutation = { __typename?: 'Mutation', deleteClassePensum?: boolean | null };

export type AddProfessionMutationVariables = Exact<{
  dataProfession?: InputMaybe<InputProfession>;
}>;


export type AddProfessionMutation = { __typename?: 'Mutation', addProfession?: { __typename?: 'profession', id: number, names: string } | null };

export type UpdateProfessionMutationVariables = Exact<{
  dataProfession?: InputMaybe<InputProfession>;
}>;


export type UpdateProfessionMutation = { __typename?: 'Mutation', updateProfession?: { __typename?: 'profession', id: number, names: string } | null };

export type DeleteProfessionMutationVariables = Exact<{
  deleteProfessionId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DeleteProfessionMutation = { __typename?: 'Mutation', deleteProfession?: number | null };

export type AllRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllRolesQuery = { __typename?: 'Query', allRoles?: Array<{ __typename?: 'role', id: number, names: string } | null> | null };

export type AddPersonMutationVariables = Exact<{
  dataPerson?: InputMaybe<InputPerson>;
}>;


export type AddPersonMutation = { __typename?: 'Mutation', addPerson?: { __typename?: 'person', id: number, names: string, lastNames: string, sex: string, email: string, phone: number, photo?: string | null, role: number } | null };

export type UpdatePersonMutationVariables = Exact<{
  dataPerson?: InputMaybe<InputPerson>;
}>;


export type UpdatePersonMutation = { __typename?: 'Mutation', updatePerson?: { __typename?: 'person', id: number, names: string, lastNames: string, sex: string, email: string, phone: number, photo?: string | null, role: number } | null };

export type AddTeacherMutationVariables = Exact<{
  dataTeacher?: InputMaybe<Array<InputMaybe<InputTeacher>> | InputMaybe<InputTeacher>>;
}>;


export type AddTeacherMutation = { __typename?: 'Mutation', addTeacher?: boolean | null };

export type GetStudentsByPersonQueryVariables = Exact<{
  idPersons?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetStudentsByPersonQuery = { __typename?: 'Query', getStudentsByPerson?: { __typename?: 'student', id: number, IdPersons: number, IdProfession: number, IdSemesters: number } | null };

export type AddStudentsMutationVariables = Exact<{
  dataStudent?: InputMaybe<InputStudent>;
}>;


export type AddStudentsMutation = { __typename?: 'Mutation', addStudents?: { __typename?: 'student', id: number, IdPersons: number, IdProfession: number, IdSemesters: number } | null };

export type UpdateStudentMutationVariables = Exact<{
  dataStudent?: InputMaybe<InputStudent>;
}>;


export type UpdateStudentMutation = { __typename?: 'Mutation', updateStudent?: { __typename?: 'student', id: number, IdPersons: number, IdProfession: number, IdSemesters: number } | null };

export type DeleteStudentByIdPersonMutationVariables = Exact<{
  idPersons?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DeleteStudentByIdPersonMutation = { __typename?: 'Mutation', deleteStudentByIdPerson?: number | null };

export type GetProfileAndRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileAndRolesQuery = { __typename?: 'Query', getProfile?: { __typename?: 'Profile', id: number, names: string, lastNames: string, sex: string, email: string, phone: number, photo?: string | null, role: number } | null, allRoles?: Array<{ __typename?: 'role', id: number, names: string } | null> | null };

export type DataScoreQueryVariables = Exact<{
  professionAndSemesters?: InputMaybe<ProfessionAndSemesters>;
  idStudents?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DataScoreQuery = { __typename?: 'Query', getClassesByProfessionAndSemesters?: Array<{ __typename?: 'ClassesByProfessionAndSemesters', id: number, names: string } | null> | null, getTeachersByProfessionAndSemesters?: Array<{ __typename?: 'TeachersByProfessionAndSemesters', id: number, IdPersons: number, names: string, lastNames: string, IdClasses: number, IdShifts: number, IdSections: number } | null> | null, getScores?: Array<{ __typename?: 'score', id: number, IdStudents: number, IdTeachers: number, IdClasses: number, IdShifts: number, IdSections: number, score: number } | null> | null };

export type MutationMutationVariables = Exact<{
  dataScores?: InputMaybe<Array<InputMaybe<InputScore>> | InputMaybe<InputScore>>;
}>;


export type MutationMutation = { __typename?: 'Mutation', addScore?: boolean | null };

export type UpdateScoreMutationVariables = Exact<{
  dataScores?: InputMaybe<Array<InputMaybe<InputScore>> | InputMaybe<InputScore>>;
}>;


export type UpdateScoreMutation = { __typename?: 'Mutation', updateScore?: boolean | null };

export type GetPersonByRoleQueryVariables = Exact<{
  role?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPersonByRoleQuery = { __typename?: 'Query', getPersonByRole: Array<{ __typename?: 'person', id: number, names: string, lastNames: string, sex: string, email: string, phone: number, photo?: string | null, role: number }> };

export type DeleteTeacherByIdPersonMutationVariables = Exact<{
  idPersons?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DeleteTeacherByIdPersonMutation = { __typename?: 'Mutation', deleteTeacherByIdPerson?: number | null };

export type DeletePersonMutationVariables = Exact<{
  deletePersonId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DeletePersonMutation = { __typename?: 'Mutation', deletePerson?: number | null };

export type GetTeacherByPersonQueryVariables = Exact<{
  getTeacherByPersonId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetTeacherByPersonQuery = { __typename?: 'Query', getTeacherByPerson: Array<{ __typename?: 'teacher', id: number, IdPersons: number, IdProfession: number, IdSemesters: number, IdClasses: number, IdShifts: number, IdSections: number }> };

export type UpdateTeacherMutationVariables = Exact<{
  dataTeacher?: InputMaybe<Array<InputMaybe<InputTeacher>> | InputMaybe<InputTeacher>>;
}>;


export type UpdateTeacherMutation = { __typename?: 'Mutation', updateTeacher?: boolean | null };

export type DeleteTeacherMutationVariables = Exact<{
  ids?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>> | InputMaybe<Scalars['Int']['input']>>;
}>;


export type DeleteTeacherMutation = { __typename?: 'Mutation', deleteTeacher?: boolean | null };

export type LoginQueryVariables = Exact<{
  user?: InputMaybe<Scalars['String']['input']>;
  pass?: InputMaybe<Scalars['String']['input']>;
}>;


export type LoginQuery = { __typename?: 'Query', login?: { __typename: 'Token', token: string } | null };

export type AllShiftsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllShiftsQuery = { __typename?: 'Query', allShifts?: Array<{ __typename?: 'shift', id: number, names: string } | null> | null };

export type AllSectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSectionsQuery = { __typename?: 'Query', allSections?: Array<{ __typename?: 'section', id: number, names: string } | null> | null };

export type AllSemestersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSemestersQuery = { __typename?: 'Query', allSemesters?: Array<{ __typename?: 'semester', id: number, names: string } | null> | null };


export const AllClassesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllClasses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allClasses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"names"}}]}}]}}]} as unknown as DocumentNode<AllClassesQuery, AllClassesQueryVariables>;
export const AddClassesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddClasses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dataClasse"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"inputClasse"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addClasses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dataClasse"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dataClasse"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"names"}}]}}]}}]} as unknown as DocumentNode<AddClassesMutation, AddClassesMutationVariables>;
export const UpdateClassesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateClasses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dataClasse"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"inputClasse"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClasses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dataClasse"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dataClasse"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"names"}}]}}]}}]} as unknown as DocumentNode<UpdateClassesMutation, UpdateClassesMutationVariables>;
export const DeleteClassesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteClasses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteClassesId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteClasses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteClassesId"}}}]}]}}]} as unknown as DocumentNode<DeleteClassesMutation, DeleteClassesMutationVariables>;
export const AllProfessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllProfession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allProfession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"names"}}]}}]}}]} as unknown as DocumentNode<AllProfessionQuery, AllProfessionQueryVariables>;
export const GetPensumByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPensumById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getPensumByIdId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPensumById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getPensumByIdId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IdSemesters"}},{"kind":"Field","name":{"kind":"Name","value":"Name_Semesters"}},{"kind":"Field","name":{"kind":"Name","value":"Classes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"IdClasses"}},{"kind":"Field","name":{"kind":"Name","value":"Name_Classes"}}]}}]}}]}}]} as unknown as DocumentNode<GetPensumByIdQuery, GetPensumByIdQueryVariables>;
export const AddClassesPensumDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddClassesPensum"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dataPensum"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DataPensum"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addClassesPensum"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"DataPensum"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dataPensum"}}}]}]}}]} as unknown as DocumentNode<AddClassesPensumMutation, AddClassesPensumMutationVariables>;
export const DeleteClassePensumDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteClassePensum"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteClassePensumId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteClassePensum"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteClassePensumId"}}}]}]}}]} as unknown as DocumentNode<DeleteClassePensumMutation, DeleteClassePensumMutationVariables>;
export const AddProfessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddProfession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dataProfession"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"inputProfession"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addProfession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dataProfession"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dataProfession"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"names"}}]}}]}}]} as unknown as DocumentNode<AddProfessionMutation, AddProfessionMutationVariables>;
export const UpdateProfessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProfession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dataProfession"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"inputProfession"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProfession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dataProfession"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dataProfession"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"names"}}]}}]}}]} as unknown as DocumentNode<UpdateProfessionMutation, UpdateProfessionMutationVariables>;
export const DeleteProfessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteProfession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteProfessionId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProfession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteProfessionId"}}}]}]}}]} as unknown as DocumentNode<DeleteProfessionMutation, DeleteProfessionMutationVariables>;
export const AllRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"names"}}]}}]}}]} as unknown as DocumentNode<AllRolesQuery, AllRolesQueryVariables>;
export const AddPersonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddPerson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dataPerson"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"inputPerson"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addPerson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dataPerson"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dataPerson"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"names"}},{"kind":"Field","name":{"kind":"Name","value":"lastNames"}},{"kind":"Field","name":{"kind":"Name","value":"sex"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<AddPersonMutation, AddPersonMutationVariables>;
export const UpdatePersonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePerson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dataPerson"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"inputPerson"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePerson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dataPerson"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dataPerson"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"names"}},{"kind":"Field","name":{"kind":"Name","value":"lastNames"}},{"kind":"Field","name":{"kind":"Name","value":"sex"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<UpdatePersonMutation, UpdatePersonMutationVariables>;
export const AddTeacherDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddTeacher"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dataTeacher"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"inputTeacher"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addTeacher"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dataTeacher"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dataTeacher"}}}]}]}}]} as unknown as DocumentNode<AddTeacherMutation, AddTeacherMutationVariables>;
export const GetStudentsByPersonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStudentsByPerson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"idPersons"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getStudentsByPerson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"IdPersons"},"value":{"kind":"Variable","name":{"kind":"Name","value":"idPersons"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"IdPersons"}},{"kind":"Field","name":{"kind":"Name","value":"IdProfession"}},{"kind":"Field","name":{"kind":"Name","value":"IdSemesters"}}]}}]}}]} as unknown as DocumentNode<GetStudentsByPersonQuery, GetStudentsByPersonQueryVariables>;
export const AddStudentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddStudents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dataStudent"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"inputStudent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addStudents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dataStudent"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dataStudent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"IdPersons"}},{"kind":"Field","name":{"kind":"Name","value":"IdProfession"}},{"kind":"Field","name":{"kind":"Name","value":"IdSemesters"}}]}}]}}]} as unknown as DocumentNode<AddStudentsMutation, AddStudentsMutationVariables>;
export const UpdateStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dataStudent"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"inputStudent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dataStudent"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dataStudent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"IdPersons"}},{"kind":"Field","name":{"kind":"Name","value":"IdProfession"}},{"kind":"Field","name":{"kind":"Name","value":"IdSemesters"}}]}}]}}]} as unknown as DocumentNode<UpdateStudentMutation, UpdateStudentMutationVariables>;
export const DeleteStudentByIdPersonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteStudentByIdPerson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"idPersons"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteStudentByIdPerson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"IdPersons"},"value":{"kind":"Variable","name":{"kind":"Name","value":"idPersons"}}}]}]}}]} as unknown as DocumentNode<DeleteStudentByIdPersonMutation, DeleteStudentByIdPersonMutationVariables>;
export const GetProfileAndRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProfileAndRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"names"}},{"kind":"Field","name":{"kind":"Name","value":"lastNames"}},{"kind":"Field","name":{"kind":"Name","value":"sex"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"Field","name":{"kind":"Name","value":"allRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"names"}}]}}]}}]} as unknown as DocumentNode<GetProfileAndRolesQuery, GetProfileAndRolesQueryVariables>;
export const DataScoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"dataScore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"professionAndSemesters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ProfessionAndSemesters"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"idStudents"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getClassesByProfessionAndSemesters"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ProfessionAndSemesters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"professionAndSemesters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"names"}}]}},{"kind":"Field","name":{"kind":"Name","value":"getTeachersByProfessionAndSemesters"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ProfessionAndSemesters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"professionAndSemesters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"IdPersons"}},{"kind":"Field","name":{"kind":"Name","value":"names"}},{"kind":"Field","name":{"kind":"Name","value":"lastNames"}},{"kind":"Field","name":{"kind":"Name","value":"IdClasses"}},{"kind":"Field","name":{"kind":"Name","value":"IdShifts"}},{"kind":"Field","name":{"kind":"Name","value":"IdSections"}}]}},{"kind":"Field","name":{"kind":"Name","value":"getScores"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"idStudents"},"value":{"kind":"Variable","name":{"kind":"Name","value":"idStudents"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"IdStudents"}},{"kind":"Field","name":{"kind":"Name","value":"IdTeachers"}},{"kind":"Field","name":{"kind":"Name","value":"IdClasses"}},{"kind":"Field","name":{"kind":"Name","value":"IdShifts"}},{"kind":"Field","name":{"kind":"Name","value":"IdSections"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}}]}}]} as unknown as DocumentNode<DataScoreQuery, DataScoreQueryVariables>;
export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dataScores"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"inputScore"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addScore"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dataScores"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dataScores"}}}]}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const UpdateScoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateScore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dataScores"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"inputScore"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateScore"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dataScores"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dataScores"}}}]}]}}]} as unknown as DocumentNode<UpdateScoreMutation, UpdateScoreMutationVariables>;
export const GetPersonByRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPersonByRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"role"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPersonByRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"role"},"value":{"kind":"Variable","name":{"kind":"Name","value":"role"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"names"}},{"kind":"Field","name":{"kind":"Name","value":"lastNames"}},{"kind":"Field","name":{"kind":"Name","value":"sex"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<GetPersonByRoleQuery, GetPersonByRoleQueryVariables>;
export const DeleteTeacherByIdPersonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTeacherByIdPerson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"idPersons"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTeacherByIdPerson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"IdPersons"},"value":{"kind":"Variable","name":{"kind":"Name","value":"idPersons"}}}]}]}}]} as unknown as DocumentNode<DeleteTeacherByIdPersonMutation, DeleteTeacherByIdPersonMutationVariables>;
export const DeletePersonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePerson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deletePersonId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePerson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deletePersonId"}}}]}]}}]} as unknown as DocumentNode<DeletePersonMutation, DeletePersonMutationVariables>;
export const GetTeacherByPersonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTeacherByPerson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getTeacherByPersonId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTeacherByPerson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getTeacherByPersonId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"IdPersons"}},{"kind":"Field","name":{"kind":"Name","value":"IdProfession"}},{"kind":"Field","name":{"kind":"Name","value":"IdSemesters"}},{"kind":"Field","name":{"kind":"Name","value":"IdClasses"}},{"kind":"Field","name":{"kind":"Name","value":"IdShifts"}},{"kind":"Field","name":{"kind":"Name","value":"IdSections"}}]}}]}}]} as unknown as DocumentNode<GetTeacherByPersonQuery, GetTeacherByPersonQueryVariables>;
export const UpdateTeacherDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTeacher"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dataTeacher"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"inputTeacher"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTeacher"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dataTeacher"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dataTeacher"}}}]}]}}]} as unknown as DocumentNode<UpdateTeacherMutation, UpdateTeacherMutationVariables>;
export const DeleteTeacherDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTeacher"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTeacher"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteTeacherMutation, DeleteTeacherMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pass"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}},{"kind":"Argument","name":{"kind":"Name","value":"pass"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pass"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<LoginQuery, LoginQueryVariables>;
export const AllShiftsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllShifts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allShifts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"names"}}]}}]}}]} as unknown as DocumentNode<AllShiftsQuery, AllShiftsQueryVariables>;
export const AllSectionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllSections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allSections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"names"}}]}}]}}]} as unknown as DocumentNode<AllSectionsQuery, AllSectionsQueryVariables>;
export const AllSemestersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllSemesters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allSemesters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"names"}}]}}]}}]} as unknown as DocumentNode<AllSemestersQuery, AllSemestersQueryVariables>;