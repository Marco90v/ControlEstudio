import { SupabaseClient } from "@supabase/supabase-js"
import { transfomDataPemsun } from "../ultil"


interface eqObj{
    eq:string,
    eqData:number | number[]
}

export function supaService(supabase:SupabaseClient<any, any, any>){

    async function getAll(table:string, eqObj?:eqObj) {
        if(eqObj){
            const {data, error} = await supabase.from(table).select().eq(eqObj.eq, eqObj.eqData)
            return {data, error}
        }
        const {data, error} = await supabase.from(table).select()
        return {data, error}
    }
    
    async function insertSingle(table:string, d:any | any[], select?:string) {
        const {data, error} = await supabase.from(table).insert(d).select(select)
        return {data, error}
    }
    
    async function updateSingle(table:string, d:any, eqObj:eqObj){
        const {data, error} = await supabase.from(table).update(d).eq(eqObj.eq, eqObj.eqData).select()
        return {data, error}
    }
    
    async function removeSingle(table:string, eqObj:eqObj){
        const {status, error} = await supabase.from(table).delete().eq(eqObj.eq, eqObj.eqData)
        return {status, error, eqObj}
    }

    async function getPensumByID(tabla:string, eq:number){
        const {data, error} = await supabase
            .from(tabla)
            .select('id, classes!inner(IdClasses:id, Name_Classes:names), semesters!inner(IdSemesters:id, Name_Semesters:names)')
            .eq('IdProfession', eq)
        if(data){
            const newData:any[] = data.map(({semesters, classes, id})=>({id,...semesters, ...classes}))
            return {data:transfomDataPemsun(newData), error}
        }
        return {data, error}
    }

    async function updateMultiple(tabla:string, d:any[]){
        const {data, error} = await supabase.from(tabla).upsert(d)
        return {data, error}
    }

    async function removeMultiple(table:string, eqObj:eqObj){
        const { data, error } = await supabase.from(table).delete().in(eqObj.eq, eqObj.eqData as number[])
        return {data, error}
    }

    async function getClassesByProfessionAndSemesters(IdProfession:number, IdSemesters:number){
        const {data, error} = await supabase
            .from('pensum')
            .select('id:IdClasses, classes!inner(names)')
            .eq('IdProfession', IdProfession)
            .eq('IdSemesters', IdSemesters)
            .order('IdClasses')
        return {
            data: data?.map(({id,classes})=>({id,...classes})),
            error
        }
    }
    async function getTeachersByProfessionAndSemesters(IdProfession:number, IdSemesters:number) {
        const {data, error} = await supabase
            .from('teachers')
            .select('id, IdPersons, IdClasses, IdShifts, IdSections, persons!inner(names, lastNames)')
            .eq('IdProfession', IdProfession)
            .eq('IdSemesters', IdSemesters)
            .order('IdPersons')
            .order('IdClasses')
        return {
            data: data?.map(({persons, ...rest})=>({...rest,...persons})),
            error
        }
    }

    return {
        getAll, insertSingle, updateSingle, removeSingle,
        getPensumByID, updateMultiple, removeMultiple,
        getClassesByProfessionAndSemesters, getTeachersByProfessionAndSemesters
    }
}
