import { gql } from "../__generated__"

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