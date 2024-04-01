import { match } from 'assert'
import { supabase } from './conectSupabase.js'

export const getAllAdmin = () => {
    return new Promise( async (resolve, reject) => {
        const {data, error} = await supabase
        .from('admin')
        .select('*, persons!inner(names, lastNames, sex, email, phone, photo)')
        if(error) reject(null)
        const rest = data.map( ({id, IdPersons:IdPerson, persons}) => {
            return{
                IdAdmin:id,
                IdPerson,
                ...persons
            }
        })
        resolve(rest)
    })
}

export const insertSingle = (table:string, insertData:any) => {
    return new Promise( async (resolve, reject) => {
        const { data, error, } = await supabase.from(table).insert(insertData).select()
        if(error) reject(null)
        resolve(data[0])
    })
}

export const updateSingle = (table:string, {id, ...data}) => {
    return new Promise( async (resolve, reject) => {
        const { error } = await supabase.from(table).update(data).eq('id', id)
        if (error) reject(null)
        resolve({affectedRows:true})
    })
}

export const deleteSingle = (table:string, {id}:{id:number}) => {
    return new Promise( async (resolve, reject) => {
        const { error } = await supabase.from(table).delete().eq('id', id)
        if(error) reject(null)
        resolve({affectedRows:true})
    })
}

export const insertMult = (table:string,_,data:any[]) => {
    return new Promise( async (resolve, reject)=>{
        const newData = data.map(({id,...rest})=>(rest))
        const { error } = await supabase
            .from(table)
            .insert(newData)
        if(error) reject(null)
        resolve({insertId:true})
    })
}

export const updateMult = (table:string, _, __, dataUpdate:any) => {
    return new Promise( async (resolve, reject) => {
        const { data, error } = await supabase
            .from(table)
            .upsert(dataUpdate)
            .select()
        if(error) reject(null)
        resolve({
            insertId:true,
            affectedRows:data.length
        })
    })
}

export const deleteMult = (table:string, dataDelete:number[]) => {
    return new Promise( async (resolve, reject) => {
        const { error } = await supabase
            .from(table)
            .delete()
            .in('id', dataDelete)
        if(error) reject(null)
        resolve({affectedRows:true})
    })
}

export const getAll = (table:string) => {
    return new Promise( async (resolve, reject) => {
        const {data, error} = await supabase.from(table).select()
        if(error) reject(null)
        resolve(data)
    })
}

export const getById = (table:string,{id}:{id:number}) => {
    return new Promise( async (resolve, reject) => {
        const {data, error} = await supabase.from(table).select().eq('id', id)
        if(error) reject(null)
        resolve(data[0])
    })
}

export const getPersonByRole = (role:number) => {
    return new Promise( async (resolve, reject) => {
        const {data, error} = await supabase.from('persons').select().eq('role', role)
        if(error) reject(null)
        resolve(data)
    })
}

export const getAllTeachers2 = () => {
    return new Promise( async (resolve, reject) => {
        const {data, error} = await supabase.from('teachers').select()
        if(error) reject(null)
        resolve(data)
    })
}

export const getTeacher2 = (IdPersons:number) => {
    return new Promise( async (resolve, reject) => {
        const {data, error} = await supabase.from('teachers').select().eq('IdPersons', IdPersons)
        if(error) reject(null)
        resolve(data)
    })
}

export const getStudentsByIdPersons = (IdPersons) => {
    return new Promise( async (resolve, reject) => {
        const {data, error} = await supabase.from('students').select().eq('IdPersons', IdPersons)
        if(error) reject(null)
        resolve(data[0])
    })
}

export const getScoresByIdStudent = (IdStudents) => {
    return new Promise( async (resolve, reject) => {
        const {data, error} = await supabase.from('scores').select().eq('IdStudents', IdStudents)
        if(error) reject(null)
        resolve(data)
    })
}

export const getClassesByProfessionAndSemesters = (IdProfession:number, IdSemesters:number) => {
    return new Promise( async (resolve, reject) => {
        const {data, error} = await supabase
            .from('pensum')
            .select('id:IdClasses, classes!inner(names)')
            .eq('IdProfession', IdProfession)
            .eq('IdSemesters', IdSemesters)
            .order('IdClasses')
        if(error) reject(null)
        const res = data.map(({id, classes})=>({id,...classes}))
        resolve(res)
    })
}

export const getTeachersByProfessionAndSemesters = (IdProfession:number, IdSemesters:number) => {
    return new Promise( async (resolve, reject) => {
        const {data, error} = await supabase
            .from('teachers')
            .select('id, IdPersons, IdClasses, IdShifts, IdSections, persons!inner(names, lastNames)')
            .eq('IdProfession', IdProfession)
            .eq('IdSemesters', IdSemesters)
            .order('IdPersons')
            .order('IdClasses')
        if(error) reject(null)
        const res = data.map(({persons, ...rest})=>({...rest,...persons}))
        resolve(res)
    })
}

export const getPensum = (IdProfession:number) => {
    return new Promise( async (resolve, reject) => {
        const {data, error} = await supabase
            .from('pensum')
            .select('id, classes!inner(IdClasses:id, Name_Classes:names), semesters!inner(IdSemesters:id, Name_Semesters:names)')
            .eq('IdProfession', IdProfession)
        if(error) reject(null)
        const res = data.map(({semesters, classes, id})=>({id,...semesters, ...classes}))
        resolve(res)
    })
}

export const deleteByIdPerson = (table:string, {idPersons}:{idPersons:number}) => {
    return new Promise( async (resolve, reject) => {
        const {error} = await supabase
        .from(table)
        .delete()
        .eq('IdPersons', idPersons)
        if(error) reject(null)
        resolve(true)
    })
}

export const login = (rest) => {
    return new Promise( async (resolve, reject) => {
        const {data, error} = await supabase
            .from('persons')
            .select('*, login!inner()')
            .eq('login.user', rest.user)
            .eq('login.pass', rest.pass)
        if(error) reject(null)
        resolve(data[0])
    })
}