import { forwardRef, useEffect, useImperativeHandle } from "react";
import { fieldNotEmptied } from "../../ultil";
import {TABLE_NAME} from "../../ultil/const";
import { Button, SectionClasses } from "../";
import { supaService } from "../../supabase/supaService";
import { useSupabase } from "../../hooks/useSupabase";
import useStoreSupabase from "../../zustanStore/supabase";
import useStorePersons from "../../zustanStore/persons";
import useStoreTeacherClasses from "../../zustanStore/teacherClasse";
import { useShallow } from "zustand/react/shallow";
import useStoreLoading from "../../zustanStore/loading";

const initialDataTeacher:teacher = {
    id:0,
    IdPersons:0,
    IdProfession:0,
    IdSemesters:0,
    IdClasses:0,
    IdShifts:0,
    IdSections:0
}

const Teacher = forwardRef( (_, ref) => {

    const { supabase } = useStoreSupabase(useShallow(state=>({
        supabase:state.getSupabase
    })))

    const {handlerLoading, handlerError} = useStoreLoading(useShallow((state=>({
        handlerError: state.handlerError,
        handlerLoading: state.handlerLoading
    }))))

    const {idPerson, clearPerson} = useStorePersons(
        useShallow((state=>({
            idPerson: state.data.person.idPerson,
            clearPerson: state.clearPerson
        })))
    )

    const {teacherClasses, idsDelete, setTeacherClasses, clearTeacherClasses, addTeacherClasse, changeTeacherClasse, deleteTeacherClasse} = useStoreTeacherClasses(
        useShallow((state=>({
            teacherClasses: state.teacherClasses,
            idsDelete: state.idsDelete,
            setTeacherClasses: state.setTeacherClasses,
            clearTeacherClasses: state.clearTeacherClasses,
            addTeacherClasse: state.addTeacherClasse,
            changeTeacherClasse: state.changeTeacherClasse,
            deleteTeacherClasse: state.deleteTeacherClasse,
        })))
    )

    const {getAll, insertSingle, removeSingle, removeMultiple, updateMultiple } = supaService(supabase())
    const {getSupabase:getTP, insertSupabase, updateMultipleSupabase, deleteSupabase} = useSupabase(TABLE_NAME.TEACHERS,handlerLoading, handlerError)

    useEffect(() => {
        if(idPerson > 0){
            if(teacherClasses[0]?.IdPersons === idPerson){
                setTeacherClasses(teacherClasses)
            }else{
                const eqObj = {eq:"IdPersons", eqData:idPerson}
                getTP(getAll, setTeacherClasses, eqObj)
            }
        }
        if(idPerson === 0){
            clearTeacherClasses()
        }
      return () => {}
    }, [idPerson])
    
    const addProfession = (e:any) => {
        addTeacherClasse(initialDataTeacher)
    }

    const changeSelect = (e:any,idx:number) => {
        const element = e.target.id;
        const value = e.target.value;
        changeTeacherClasse(element, value, idx)
    }

    const deleteItem = (idx:number) => {
        deleteTeacherClasse(idx)
    }

    const editData = () => {
        let newData:any = []
        let updateData:any = []

        teacherClasses.forEach((e,i)=>{
            const {id,IdPersons,...rTeacher} = e;
            const notEmptied:boolean = fieldNotEmptied(rTeacher);
            if(e.id === 0 && e.IdPersons === 0 && notEmptied){
                const {id, ...temp} = {...e, IdPersons:idPerson}
                newData.push(temp)
            }
            if(e.id > 0 && e.IdPersons > 0 && notEmptied){
                updateData.push(e)
            }
        })
      
        updateMultipleSupabase(updateMultiple, updateData)

        newData.length > 0 && insertSupabase(insertSingle, newData)

        const eqObj = {
            eq:"id",
            eqData: idsDelete
        }
        idsDelete.length > 0 && deleteSupabase(removeMultiple, eqObj)
        
        clearPerson()
    }

    const newData = (IdPersons:number) => {
        if(teacherClasses.length > 0){
            const newTeachers = teacherClasses.map(e=>{
                return{
                    IdPersons,
                    IdClasses: e.IdClasses,
                    IdProfession: e.IdProfession,
                    IdSections: e.IdSections,
                    IdSemesters: e.IdSemesters,
                    IdShifts: e.IdShifts,
                }
            })
            insertSupabase(insertSingle, newTeachers, clearTeacherClasses)
        }
    }

    const save = (IdPersons:number=0) => {
        IdPersons !== 0 ? newData(IdPersons) : editData();
    }

    const deleteChildren = (idPersons:number) => {
        const eqObj = {
            eq:"IdPersons",
            eqData:idPersons
        }
        deleteSupabase(removeSingle, eqObj)
    }

    useImperativeHandle(ref, () => {
        return { save, deleteChildren }
    });    

    return(
        <div className="">
            {
                teacherClasses.map((t:teacher,i)=>{
                    return (
                        <SectionClasses
                            key={i}
                            idx={i}
                            teacher={t}
                            changeSelect={changeSelect}
                            deleteItem={deleteItem}
                        />
                    )
                })
            }
            <div className="">
                <Button type="button" className="font-semibold text-white" color="blue" onClick={(e)=>addProfession(e)} >Agregar Clase</Button>
            </div>
        </div>
    )
});
export default Teacher;
export {Teacher};