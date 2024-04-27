import { forwardRef, useEffect, useImperativeHandle } from "react";
import { fieldNotEmptied } from "../../ultil";
import { Select } from ".."
import { TABLE_NAME, identifySelect } from "../../ultil/const";
import { useShallow } from "zustand/react/shallow";
import useStorePersons from "../../zustanStore/persons";
import useStoreStudentProfessionSemester from "../../zustanStore/studentClasses";
import useStoreLoading from "../../zustanStore/loading";
import useStoreProfessions from "../../zustanStore/profession";
import useStoreSemesters from "../../zustanStore/semesters";
import useStoreSupabase from "../../zustanStore/supabase";
import { supaService } from "../../supabase/supaService";
import { useSupabase } from "../../hooks/useSupabase";

const ProfessionSemester = forwardRef( (_, ref) => {
    const { supabase } = useStoreSupabase(useShallow(state=>({
        supabase:state.supabase
    })))
    const {getAll, insertSingle, updateSingle, removeSingle} = supaService(supabase)

    const {handlerLoading, handlerError} = useStoreLoading(useShallow((state=>({
        handlerError: state.handlerError,
        handlerLoading: state.handlerLoading
    }))))
    const {idPerson, clearPerson} = useStorePersons(
        useShallow((state=>({
            idPerson: state.data.person.idPerson,
            clearPerson: state.clearPerson,
        })))
    )
    const {professionSemester, setProfessionSemester, changeProfessionSemester, clearProfessionSemester} = useStoreStudentProfessionSemester(
        useShallow((state=>({
            professionSemester: state.professionSemester,
            setProfessionSemester:state.setProfessionSemester,
            changeProfessionSemester:state.changeProfessionSemester,
            clearProfessionSemester:state.clearProfessionSemester,
        })))
    )

    const {professions, setProfessions} = useStoreProfessions(
        useShallow((state=>({
            professions: state.professions,
            setProfessions:state.setProfessions,
        })))
    )
    const {semesters, setSemesters} = useStoreSemesters(
        useShallow((state=>({
            semesters: state.semesters,
            setSemesters:state.setSemesters,
        })))
    )

    const {getSupabase:getP} = useSupabase(TABLE_NAME.PROFESSION,handlerLoading, handlerError)
    const {getSupabase:getS} = useSupabase(TABLE_NAME.SEMESTERS,handlerLoading, handlerError)
    const {getSupabase:getStu, insertSupabase:insertStu, updateSupabase:updateStu, deleteSupabase} = useSupabase(TABLE_NAME.STUDENTS,handlerLoading, handlerError)

    useEffect(() => {
        professions.length <= 0 && getP(getAll, setProfessions)
        semesters.length <= 0 && getS(getAll, setSemesters)
        return () => {}
    }, [])
    

    useEffect(() => {
      if(idPerson > 0){
        if(professionSemester.IdPersons !== idPerson){
            const eqObj = {
                eq:"IdPersons",
                eqData:idPerson
            }
            getStu(getAll, setProfessionSemester, eqObj)
        }
      }
      if(idPerson === 0){
        clearProfessionSemester()
      }
    
      return () => {}
    }, [idPerson])
        

    const changeSelect = (e:any) => {
        const element = e.target.id;
        const value = e.target.value;
        changeProfessionSemester(element, value)
    }

    const newData = (IdPersons:number) => {
        if(professionSemester.IdProfession !== 0 && professionSemester.IdSemesters !== 0){
            const {id, ...newData} = {...professionSemester, IdPersons}
            insertStu(insertSingle, newData, clearProfessionSemester)
        }
    }

    const editData = () => {
        const {id,IdPersons,...rStudent} = professionSemester;
        const notEmptiedStudent:boolean = fieldNotEmptied(rStudent);

        if(notEmptiedStudent){
            if(id === 0 && IdPersons === 0){
                const {id, ...newData} = {...professionSemester, IdPersons:idPerson}
                insertStu(insertSingle, newData, clearProfessionSemester)
            }else{
                const {id, ...newData} = professionSemester
                const eqObj={
                    eq:"id",
                    eqData:id
                }
                const clear = () => {
                    clearPerson()
                    clearProfessionSemester()
                }
                updateStu(updateSingle, newData, eqObj, clear)
            }
        }
    }

    const deleteChildren = (idPersons:number) => {
        const eqObj={
            eq:"IdPersons",
            eqData:idPersons
        }
        deleteSupabase(removeSingle, eqObj, clearProfessionSemester)
    }

    const save = (IdPersons:number=0) => {
        IdPersons !== 0 ? newData(IdPersons) : editData();
    }

    useImperativeHandle(ref, () => {
        return { save, deleteChildren }
    });   

    return(
        <div className="col-start-1 col-end-4 grid grid-rows-[1fr] grid-cols-[auto_auto] gap-4">
            <div className="grid grid-rows-[1fr] grid-cols-[auto_1fr] gap-x-4">
                <label htmlFor="selectProfession">Profesión</label>
                <Select
                    identify={identifySelect.IDPROFESSION}
                    changeSelect={(e)=>changeSelect(e)}
                    value={professionSemester.IdProfession}
                    data={professions}
                />
            </div>
            <div className="grid grid-rows-[1fr] grid-cols-[auto_1fr] gap-x-4">
                <label htmlFor="selectSemester">Semestres</label>
                <Select
                    identify={identifySelect.IDSEMESTERS}
                    changeSelect={(e)=>changeSelect(e)}
                    value={professionSemester.IdSemesters}
                    data={semesters}
                />
            </div>
        </div>
    )
})

export default ProfessionSemester;
export {ProfessionSemester};