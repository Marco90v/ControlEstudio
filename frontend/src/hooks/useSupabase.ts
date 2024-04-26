import { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

interface eqObj{
    eq:string,
    eqData:number | number[]
}

interface returnSupabase{
    error: PostgrestError | null,
    data?: any | any[] | null,
    eqObj?:eqObj,
    status?:number
}


interface pensumNotFormat {
    id: number
    IdSemesters: number
    Name_Semesters: string
    IdClasses: number
    Name_Classes: string
}

export interface classesFormat {
    id: number
    IdClasses: number
    Name_Classes: string
}

export interface pensumFormat {
    IdSemesters: number
    Name_Semesters: string
    Classes: classesFormat[]
}

type globalState = (data:any | any[]) => void
type setLodingGlobal = (value:boolean) => void
type setErrorGlobal = (message:string) => void

type propsGet = (table:string, eqObj?:eqObj)=> Promise<returnSupabase>
type propsInsert = (table:string, data:any, select?:string)=> Promise<returnSupabase>
type propsUpdate = (table:string, data:any, eqObj:eqObj)=> Promise<returnSupabase>
type propsDelete = (table:string, eqObj:eqObj)=> Promise<returnSupabase>

type propsUpdateMultiple = (table:string, data:any[])=> Promise<returnSupabase>


type propsGetByID = (table:string, eq:number) => Promise<{data: pensumFormat[], error: null} | { data: null, error: PostgrestError; }>

export function useSupabase(table:string, setLodingGlobal?:setLodingGlobal, setErrorGlobal?:setErrorGlobal, supaCall?:propsGet, globalState?:globalState){

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<{message:string} | null>(null)
    const [data, setData] = useState<any[] | null>(null)

    const handlerLoading = (value:boolean) => {
        if(setLodingGlobal){
            setLodingGlobal(value)
        }else{
            setLoading(value)
        }
    }

    const handlerError = (message:string) => {
        if(setErrorGlobal){
            setErrorGlobal(message)
        }else{
            setError({message})
        }
    }
    
    const getSupabase = async (supaCall:propsGet, globalState?:globalState, eqObj?:eqObj) => {
        handlerLoading(true)
        try {
            const {data, error} = await supaCall(table, eqObj)
            if(error) handlerError(error.message)
            if(data && data.length > 0){
                if(globalState){
                    globalState(data)
                }else{
                    setData(data)
                }
            }
        } catch (error) {
            handlerError('Error getSupabase')
        } finally {
            handlerLoading(false)
        }
    }

    useEffect(() => {
        if(supaCall) getSupabase(supaCall,globalState)
        return () => {}
    }, [])

    const insertSupabase = async (supaCall:propsInsert, dataInsert:any, globalState?:globalState, select?:string) => {
        handlerLoading(true)
        try {
            const {data, error} = await supaCall(table, dataInsert, select)
            if(error) handlerError(error.message)
            if(data && data.length > 0) {
                if(globalState){
                    globalState(data[0])
                }else{
                    setData(e=>{
                        if(e){
                            return [...e,...data]
                        }else{
                            return data
                        }
                    })
                }
            }
        } catch (error) {
            handlerError('Error insertSupabase')
        } finally {
            handlerLoading(false)
        }
    }

    const insertMultipleSupabase = async (supaCall:propsInsert, dataInsert:any[], globalState?:globalState, select?:string) => {
        handlerLoading(true)
        try {
            const {data, error} = await supaCall(table, dataInsert, select)
            if(error) handlerError(error.message)
            if(data && data.length > 0) {
                if(globalState){
                    globalState(data)
                }else{
                    setData(e=>{
                        if(e){
                            return [...e,...data]
                        }else{
                            return data
                        }
                    })
                }
            }
        } catch (error) {
            handlerError('Error insertSupabase')
        } finally {
            handlerLoading(false)
        }
    }

    const updateSupabase = async (supaCall:propsUpdate, dataUpdate:any, eqObj:eqObj, globalState?:globalState) => {
        handlerLoading(true)
        try {
            const {data, error} = await supaCall(table, dataUpdate, eqObj)
            if(error) handlerError(error.message)
            if(data && data.length > 0) {
                if(globalState){
                    globalState(data[0])
                }else{
                    setData(e=>{
                        if(e){
                            return e.map(v=>v.id === data[0].id ? data[0]: v)
                        }else{
                            return data
                        }
                    })
                }
            }
        } catch (error) {
            handlerError('Error updateSupabase')
        } finally {
            handlerLoading(false)
        }
    }

    const deleteSupabase = async (supaCall:propsDelete, eqOb:eqObj, globalState?:globalState) => {
        handlerLoading(true)
        try {
            const {status, error, eqObj} = await supaCall(table,eqOb)
            if(error) {
                if(error) handlerError(error.message)
            }else if(status === 204){
                if(globalState){
                    globalState(eqOb.eqData)
                }else{
                    setData(e=>{
                        if(e){
                            return e.filter(v=>v.id !== eqObj?.eqData)
                        }else{
                            return []
                        }
                    })
                }
            }
        } catch (error) {
            handlerError('Error deleteSupabase')
        } finally {
            handlerLoading(false)
        }
    }

    const getSupabaseByID = async (supaCall:propsGetByID, eq:number, globalState?:globalState) => {
        handlerLoading(true)
        try {
            const {data, error} = await supaCall(table, eq)
            if(error) handlerError(error.message)
            if(data && data.length > 0){
                if(globalState){
                    globalState(data)
                }else{
                    setData(data)
                }
            }
        } catch (error) {
            handlerError('Error getSupabase')
        } finally {
            handlerLoading(false)
        }
    }

    const updateMultipleSupabase = async (supaCall:propsUpdateMultiple, dataUpdate:any[], globalState?:globalState) => {
        handlerLoading(true)
        try {
            const {data, error} = await supaCall(table, dataUpdate)
            if(error) handlerError(error.message)
            if(data && data.length > 0) {
                if(globalState){
                    globalState(data)
                }else{
                    setData(e=>{
                        if(e){
                            return e.map(v=>{
                                // v.id === data[0].id ? data: v
                                const d = data.find((e:any)=>e.id===v.id)
                                if(d){
                                    return d
                                }else{
                                    return v
                                }
                            })
                        }else{
                            return data
                        }
                    })
                }
            }
        } catch (error) {
            handlerError('Error updateSupabase')
        } finally {
            handlerLoading(false)
        }
    }

    const getClassesOrTeacherByProfessionAndSemesters = async (supaCall:(IdProfession:number, IdSemesters:number)=>Promise<returnSupabase>, eqObj2:{IdProfession:number,IdSemesters:number}, globalState?:globalState) => {
        handlerLoading(true)
        try {
            const {data, error} = await supaCall(eqObj2.IdProfession, eqObj2.IdSemesters)
            if(error) handlerError(error.message)
            if(data && data.length > 0) {
                if(globalState){
                    globalState(data)
                }else{
                    setData(data)
                }
            }
        } catch (error) {
            handlerError('Error updateSupabase')
        } finally {
            handlerLoading(false)
        }
    }

    return {
        getSupabase,
        insertSupabase,
        insertMultipleSupabase,
        updateSupabase,
        deleteSupabase,
        getSupabaseByID,
        updateMultipleSupabase,
        getClassesOrTeacherByProfessionAndSemesters,
        data,
        loading,
        error
    }

}