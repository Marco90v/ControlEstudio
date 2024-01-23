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
    "\n    query AllClasses {\n        allClasses {\n            id\n            names\n        }\n    }\n": types.AllClassesDocument,
    "\n    mutation AddClasses($dataClasse: inputClasse) {\n        addClasses(dataClasse: $dataClasse) {\n            id\n            names\n        }\n    }\n": types.AddClassesDocument,
    "\n    mutation UpdateClasses($dataClasse: inputClasse) {\n        updateClasses(dataClasse: $dataClasse) {\n            id\n            names\n        }\n    }\n": types.UpdateClassesDocument,
    "\n    mutation DeleteClasses($deleteClassesId: Int) {\n        deleteClasses(id: $deleteClassesId)\n    }\n": types.DeleteClassesDocument,
    "\n    query AllProfession {\n        allProfession {\n            id\n            names\n        }\n    }\n": types.AllProfessionDocument,
    "\n    mutation AddProfession($dataProfession: inputProfession) {\n        addProfession(dataProfession: $dataProfession) {\n            id\n            names\n        }\n    }\n": types.AddProfessionDocument,
    "\n    mutation UpdateProfession($dataProfession: inputProfession) {\n        updateProfession(dataProfession: $dataProfession) {\n            id\n            names\n        }\n    }\n": types.UpdateProfessionDocument,
    "\n    mutation DeleteProfession($deleteProfessionId: Int) {\n        deleteProfession(id: $deleteProfessionId)\n    }\n": types.DeleteProfessionDocument,
    "\n    query GetProfileAndRoles {\n        getProfile {\n            id\n            names\n            lastNames\n            sex\n            email\n            phone\n            photo\n            role\n        }\n        allRoles {\n            id\n            names\n        }\n    }\n": types.GetProfileAndRolesDocument,
    "\n    query Login($user: String, $pass: String) {\n        login(user: $user, pass: $pass) {\n            token\n            __typename\n        }\n    }\n": types.LoginDocument,
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
export function gql(source: "\n    query AllClasses {\n        allClasses {\n            id\n            names\n        }\n    }\n"): (typeof documents)["\n    query AllClasses {\n        allClasses {\n            id\n            names\n        }\n    }\n"];
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
export function gql(source: "\n    query AllProfession {\n        allProfession {\n            id\n            names\n        }\n    }\n"): (typeof documents)["\n    query AllProfession {\n        allProfession {\n            id\n            names\n        }\n    }\n"];
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
export function gql(source: "\n    query GetProfileAndRoles {\n        getProfile {\n            id\n            names\n            lastNames\n            sex\n            email\n            phone\n            photo\n            role\n        }\n        allRoles {\n            id\n            names\n        }\n    }\n"): (typeof documents)["\n    query GetProfileAndRoles {\n        getProfile {\n            id\n            names\n            lastNames\n            sex\n            email\n            phone\n            photo\n            role\n        }\n        allRoles {\n            id\n            names\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query Login($user: String, $pass: String) {\n        login(user: $user, pass: $pass) {\n            token\n            __typename\n        }\n    }\n"): (typeof documents)["\n    query Login($user: String, $pass: String) {\n        login(user: $user, pass: $pass) {\n            token\n            __typename\n        }\n    }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;