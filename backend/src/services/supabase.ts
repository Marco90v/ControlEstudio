import { match } from 'assert'
import { supabase } from './conectSupabase.js'

export const getAllAdmin = async () => {
    const {data, error} = await supabase
    .from('admin')
    .select('*, persons!inner(names, lastNames, sex, email, phone, photo)')
    if(error) return null
    return data.map( ({id, IdPersons:IdPerson, persons}) => {
        return{
            IdAdmin:id,
            IdPerson,
            ...persons
        }
    })
}

export const insertSingle = (...rest):any => {
    
}

export const updateSingle = (...rest):any => {
    
}

export const deleteSingle = (...rest):any => {
    
}

export const insertMult = (...rest):any => {
    
}

export const updateMult = (...rest):any => {
    
}

export const deleteMult = (...rest):any => {
    
}

export const getAll = async (table:string) => {
    const {data, error} = await supabase.from(table).select()
    if(error) return null
    return data
}

export const getById = async (table:string,{id}:{id:number}) => {
    const {data, error} = await supabase.from(table).select().eq('id', id)
    if(error) return null
    return data[0]
}

export const getPersonByRole = async (role:number) => {
    const {data, error} = await supabase.from('persons').select().eq('role', role)
    if(error) return null
    return data
}

export const getAllTeachers2 = async () => {
    const {data, error} = await supabase.from('teachers').select()
    if(error) return null
    return data
}

export const getTeacher2 = async (IdPersons:number) => {
    const {data, error} = await supabase.from('teachers').select().eq('IdPersons', IdPersons)
    if(error) return null
    return data
}

export const getStudentsByIdPersons = async (IdPersons) => {
    const {data, error} = await supabase.from('students').select().eq('IdPersons', IdPersons)
    if(error) return null
    return data[0]
}

export const getScoresByIdStudent = async (IdStudents) => {
    const {data, error} = await supabase.from('scores').select().eq('IdStudents', IdStudents)
    if(error) return null
    return data
}

export const getClassesByProfessionAndSemesters = async (IdProfession:number, IdSemesters:number) => {
    const {data, error} = await supabase
        .from('pensum')
        .select('id:IdClasses, classes!inner(names)')
        .eq('IdProfession', IdProfession)
        .eq('IdSemesters', IdSemesters)
        .order('IdClasses')
    if(error) return null
    return data.map(({id, classes})=>({id,...classes}))
}

export const getTeachersByProfessionAndSemesters = async (IdProfession:number, IdSemesters:number) => {
    const {data, error} = await supabase
        .from('teachers')
        .select('id, IdPersons, IdClasses, IdShifts, IdSections, persons!inner(names, lastNames)')
        .eq('IdProfession', IdProfession)
        .eq('IdSemesters', IdSemesters)
        .order('IdPersons')
        .order('IdClasses')
    if(error) return null
    return data.map(({persons, ...rest})=>({...rest,...persons}))
}

export const getPensum = async (IdProfession:number) => {
    const {data, error} = await supabase
        .from('pensum')
        .select('id, classes!inner(IdClasses:id, Name_Classes:names), semesters!inner(IdSemesters:id, Name_Semesters:names)')
        .eq('IdProfession', IdProfession)
    if(error) return null
    return data.map(({semesters, classes, id})=>({id,...semesters, ...classes}))
}

export const deleteByIdPerson = (...rest):any => {
    
}

export const login = async (rest) => {
    const {data, error} = await supabase
        .from('persons')
        .select('*, login!inner()')
        .eq('login.user', rest.user)
        .eq('login.pass', rest.pass)
    if(error) return null
    return data[0]
}