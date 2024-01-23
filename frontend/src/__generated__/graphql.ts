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

export type ClassesByProfessionAndSemesters = {
  __typename?: 'ClassesByProfessionAndSemesters';
  id?: Maybe<Scalars['Int']['output']>;
  names?: Maybe<Scalars['String']['output']>;
};

export type InputSemester = {
  id?: InputMaybe<Scalars['Int']['input']>;
  names?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addClasses?: Maybe<Classes>;
  addPerson?: Maybe<Person>;
  addProfession?: Maybe<Profession>;
  addRole?: Maybe<Role>;
  addScore?: Maybe<Scalars['Boolean']['output']>;
  addSection?: Maybe<Shift>;
  addSemester?: Maybe<Semester>;
  addShift?: Maybe<Shift>;
  addStudents?: Maybe<Student>;
  addTeacher?: Maybe<Scalars['Boolean']['output']>;
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

export type ProfessionAndSemesters = {
  IdProfession?: InputMaybe<Scalars['Int']['input']>;
  IdSemesters?: InputMaybe<Scalars['Int']['input']>;
};

export type Profile = {
  __typename?: 'Profile';
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  lastNames?: Maybe<Scalars['String']['output']>;
  names?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['Int']['output']>;
  photo?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['Int']['output']>;
  sex?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  allAdmin?: Maybe<Array<Maybe<AllAdminAndDataPersons>>>;
  allClasses?: Maybe<Array<Maybe<Classes>>>;
  allPersons?: Maybe<Array<Maybe<Person>>>;
  allProfession?: Maybe<Array<Maybe<Profession>>>;
  allRoles?: Maybe<Array<Maybe<Role>>>;
  allSections?: Maybe<Array<Maybe<Section>>>;
  allSemesters?: Maybe<Array<Maybe<Semester>>>;
  allShifts?: Maybe<Array<Maybe<Shift>>>;
  getClassesByProfessionAndSemesters?: Maybe<Array<Maybe<ClassesByProfessionAndSemesters>>>;
  getPersonById?: Maybe<Person>;
  getPersonByRole?: Maybe<Array<Maybe<Person>>>;
  getProfile?: Maybe<Profile>;
  getScores?: Maybe<Array<Maybe<Score>>>;
  getStudents?: Maybe<Array<Maybe<Student>>>;
  getStudentsByPerson?: Maybe<Student>;
  getTeacherByPerson?: Maybe<Array<Maybe<Teacher>>>;
  getTeachers?: Maybe<Array<Maybe<Teacher>>>;
  getTeachersByProfessionAndSemesters?: Maybe<Array<Maybe<TeachersByProfessionAndSemesters>>>;
  login?: Maybe<Token>;
};


export type QueryGetClassesByProfessionAndSemestersArgs = {
  ProfessionAndSemesters?: InputMaybe<ProfessionAndSemesters>;
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
  IdClasses?: Maybe<Scalars['Int']['output']>;
  IdPersons?: Maybe<Scalars['Int']['output']>;
  IdSections?: Maybe<Scalars['Int']['output']>;
  IdShifts?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  lastNames?: Maybe<Scalars['String']['output']>;
  names?: Maybe<Scalars['String']['output']>;
};

export type Token = {
  __typename?: 'Token';
  token?: Maybe<Scalars['String']['output']>;
};

export type AllAdminAndDataPersons = {
  __typename?: 'allAdminAndDataPersons';
  IdAdmin?: Maybe<Scalars['String']['output']>;
  IdPerson?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  lastNames?: Maybe<Scalars['String']['output']>;
  names?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  photo?: Maybe<Scalars['String']['output']>;
  sex?: Maybe<Scalars['String']['output']>;
};

export type Classes = {
  __typename?: 'classes';
  id?: Maybe<Scalars['Int']['output']>;
  names?: Maybe<Scalars['String']['output']>;
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
  insertId?: Maybe<Scalars['Int']['output']>;
};

export type Person = {
  __typename?: 'person';
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  lastNames?: Maybe<Scalars['String']['output']>;
  names?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['Int']['output']>;
  photo?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['Int']['output']>;
  sex?: Maybe<Scalars['String']['output']>;
};

export type Profession = {
  __typename?: 'profession';
  id?: Maybe<Scalars['Int']['output']>;
  names?: Maybe<Scalars['String']['output']>;
};

export type Role = {
  __typename?: 'role';
  id?: Maybe<Scalars['Int']['output']>;
  names?: Maybe<Scalars['String']['output']>;
};

export type Score = {
  __typename?: 'score';
  IdClasses?: Maybe<Scalars['Int']['output']>;
  IdSections?: Maybe<Scalars['Int']['output']>;
  IdShifts?: Maybe<Scalars['Int']['output']>;
  IdStudents?: Maybe<Scalars['Int']['output']>;
  IdTeachers?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
};

export type Section = {
  __typename?: 'section';
  id?: Maybe<Scalars['Int']['output']>;
  names?: Maybe<Scalars['String']['output']>;
};

export type Semester = {
  __typename?: 'semester';
  id?: Maybe<Scalars['Int']['output']>;
  names?: Maybe<Scalars['String']['output']>;
};

export type Shift = {
  __typename?: 'shift';
  id?: Maybe<Scalars['Int']['output']>;
  names?: Maybe<Scalars['String']['output']>;
};

export type Student = {
  __typename?: 'student';
  IdPersons?: Maybe<Scalars['Int']['output']>;
  IdProfession?: Maybe<Scalars['Int']['output']>;
  IdSemesters?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type Teacher = {
  __typename?: 'teacher';
  IdClasses?: Maybe<Scalars['Int']['output']>;
  IdPersons?: Maybe<Scalars['Int']['output']>;
  IdProfession?: Maybe<Scalars['Int']['output']>;
  IdSections?: Maybe<Scalars['Int']['output']>;
  IdSemesters?: Maybe<Scalars['Int']['output']>;
  IdShifts?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type AllClassesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllClassesQuery = { __typename?: 'Query', allClasses?: Array<{ __typename?: 'classes', id?: number | null, names?: string | null } | null> | null };

export type AddClassesMutationVariables = Exact<{
  dataClasse?: InputMaybe<InputClasse>;
}>;


export type AddClassesMutation = { __typename?: 'Mutation', addClasses?: { __typename?: 'classes', id?: number | null, names?: string | null } | null };

export type UpdateClassesMutationVariables = Exact<{
  dataClasse?: InputMaybe<InputClasse>;
}>;


export type UpdateClassesMutation = { __typename?: 'Mutation', updateClasses?: { __typename?: 'classes', id?: number | null, names?: string | null } | null };

export type DeleteClassesMutationVariables = Exact<{
  deleteClassesId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DeleteClassesMutation = { __typename?: 'Mutation', deleteClasses?: number | null };

export type AllProfessionQueryVariables = Exact<{ [key: string]: never; }>;


export type AllProfessionQuery = { __typename?: 'Query', allProfession?: Array<{ __typename?: 'profession', id?: number | null, names?: string | null } | null> | null };

export type AddProfessionMutationVariables = Exact<{
  dataProfession?: InputMaybe<InputProfession>;
}>;


export type AddProfessionMutation = { __typename?: 'Mutation', addProfession?: { __typename?: 'profession', id?: number | null, names?: string | null } | null };

export type UpdateProfessionMutationVariables = Exact<{
  dataProfession?: InputMaybe<InputProfession>;
}>;


export type UpdateProfessionMutation = { __typename?: 'Mutation', updateProfession?: { __typename?: 'profession', id?: number | null, names?: string | null } | null };

export type DeleteProfessionMutationVariables = Exact<{
  deleteProfessionId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DeleteProfessionMutation = { __typename?: 'Mutation', deleteProfession?: number | null };

export type GetProfileAndRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileAndRolesQuery = { __typename?: 'Query', getProfile?: { __typename?: 'Profile', id?: number | null, names?: string | null, lastNames?: string | null, sex?: string | null, email?: string | null, phone?: number | null, photo?: string | null, role?: number | null } | null, allRoles?: Array<{ __typename?: 'role', id?: number | null, names?: string | null } | null> | null };

export type LoginQueryVariables = Exact<{
  user?: InputMaybe<Scalars['String']['input']>;
  pass?: InputMaybe<Scalars['String']['input']>;
}>;


export type LoginQuery = { __typename?: 'Query', login?: { __typename: 'Token', token?: string | null } | null };


export const AllClassesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllClasses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allClasses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"names"}}]}}]}}]} as unknown as DocumentNode<AllClassesQuery, AllClassesQueryVariables>;
export const AddClassesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddClasses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dataClasse"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"inputClasse"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addClasses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dataClasse"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dataClasse"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"names"}}]}}]}}]} as unknown as DocumentNode<AddClassesMutation, AddClassesMutationVariables>;
export const UpdateClassesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateClasses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dataClasse"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"inputClasse"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClasses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dataClasse"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dataClasse"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"names"}}]}}]}}]} as unknown as DocumentNode<UpdateClassesMutation, UpdateClassesMutationVariables>;
export const DeleteClassesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteClasses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteClassesId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteClasses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteClassesId"}}}]}]}}]} as unknown as DocumentNode<DeleteClassesMutation, DeleteClassesMutationVariables>;
export const AllProfessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllProfession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allProfession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"names"}}]}}]}}]} as unknown as DocumentNode<AllProfessionQuery, AllProfessionQueryVariables>;
export const AddProfessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddProfession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dataProfession"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"inputProfession"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addProfession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dataProfession"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dataProfession"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"names"}}]}}]}}]} as unknown as DocumentNode<AddProfessionMutation, AddProfessionMutationVariables>;
export const UpdateProfessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProfession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dataProfession"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"inputProfession"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProfession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dataProfession"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dataProfession"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"names"}}]}}]}}]} as unknown as DocumentNode<UpdateProfessionMutation, UpdateProfessionMutationVariables>;
export const DeleteProfessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteProfession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteProfessionId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProfession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteProfessionId"}}}]}]}}]} as unknown as DocumentNode<DeleteProfessionMutation, DeleteProfessionMutationVariables>;
export const GetProfileAndRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProfileAndRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"names"}},{"kind":"Field","name":{"kind":"Name","value":"lastNames"}},{"kind":"Field","name":{"kind":"Name","value":"sex"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"Field","name":{"kind":"Name","value":"allRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"names"}}]}}]}}]} as unknown as DocumentNode<GetProfileAndRolesQuery, GetProfileAndRolesQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pass"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}},{"kind":"Argument","name":{"kind":"Name","value":"pass"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pass"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<LoginQuery, LoginQueryVariables>;