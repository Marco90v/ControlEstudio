import { useEffect } from "react";
// import { useQuery } from "@apollo/client/react/hooks";
// import { GET_CLASSES, GET_PROFESSIONS, GET_SECTIONS, GET_SEMESTERS, GET_SHIFTS, TABLE_NAME } from "../../ultil/const";
import { TABLE_NAME } from "../../ultil/const";
import { useSupabase } from "../../hooks/useSupabase";
import { supaService } from "../../supabase/supaService";
import useStoreSupabase from "../../zustanStore/supabase";
import { useShallow } from "zustand/react/shallow";
import useStoreShifts from "../../zustanStore/shifts";
import useStoreProfessions from "../../zustanStore/profession";
import useStoreSections from "../../zustanStore/sections";
import useStoreSemesters from "../../zustanStore/semesters";
import useStoreClasses from "../../zustanStore/classes";
import useStoreLoading from "../../zustanStore/loading";
import { Button, Select } from "../"

type ids = {
    IdProfession:number,
    IdSemesters:number,
    IdClasses:number,
    IdShifts:number,
    IdSections:number
}
type prop = {
    idx:number,
    teacher:ids,
    changeSelect:Function,
    deleteItem:Function,
    disabled?:boolean
}

const SectionClasses =  ({ idx, teacher, changeSelect, deleteItem, disabled}:prop) => {
    const { IdProfession, IdSemesters, IdClasses, IdShifts, IdSections } = teacher;

    const { supabase } = useStoreSupabase(useShallow(state=>({
        supabase:state.supabase
    })))

    const {loading} = useStoreLoading(useShallow((state=>({
        loading: state.loading,
    }))))

    const {shifts, setShift} = useStoreShifts(
        useShallow((state=>({
            shifts: state.shifts,
            setShift: state.setShift
        })))
    )
    const {sections, setSections} = useStoreSections(
        useShallow((state=>({
            sections: state.sections,
            setSections: state.setSections
        })))
    )
    const {professions, setProfessions} = useStoreProfessions(
        useShallow((state=>({
            professions: state.professions,
            setProfessions: state.setProfessions
        })))
    )
    const {semesters, setSemesters} = useStoreSemesters(
        useShallow((state=>({
            semesters: state.semesters,
            setSemesters: state.setSemesters
        })))
    )
    const {classes, setClasses} = useStoreClasses(
        useShallow((state=>({
            classes: state.classes,
            setClasses: state.setClasses
        })))
    )

    const {getAll} = supaService(supabase)

    const {getSupabase:getShifts} = useSupabase(TABLE_NAME.SHIFTS)
    const {getSupabase:getSections} = useSupabase(TABLE_NAME.SECTIONS)
    const {getSupabase:getProfesions} = useSupabase(TABLE_NAME.PROFESSION)
    const {getSupabase:getSemesters} = useSupabase(TABLE_NAME.SEMESTERS)
    const {getSupabase:getClasses} = useSupabase(TABLE_NAME.CLASSES)

    useEffect(() => {
        shifts.length <= 0 && getShifts(getAll, setShift)
        professions.length <= 0 && getProfesions(getAll, setProfessions)
        sections.length <= 0 && getSections(getAll, setSections)
        semesters.length <= 0 && getSemesters(getAll, setSemesters)
        semesters.length <= 0 && getClasses(getAll, setClasses)    
        return () => {}
    }, [])
    

    return (
        <div className="grid gap-y-2 gap-x-4 grid-cols-3 grid-rows-2 bg-white p-2 rounded-lg border-solid border border-gray-200 hover:bg-gray-50 mb-4" >
            <div className="grid grid-cols-[auto_1fr] gap-x-2">
                <label htmlFor="profession">Profesiones/Carreras</label>
                <Select identify="IdProfession" changeSelect={(e)=>changeSelect(e,idx)} value={IdProfession} data={professions} disabled={loading || disabled} />
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-2">
                <label htmlFor="semesters">Semestres</label>
                <Select identify="IdSemesters" changeSelect={(e)=>changeSelect(e,idx)} value={IdSemesters} data={semesters} disabled={loading || disabled} />
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-2">
                <label htmlFor="classes">Clases</label>
                <Select identify="IdClasses" changeSelect={(e)=>changeSelect(e,idx)} value={IdClasses} data={classes} disabled={loading || disabled} />
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-2">
                <label htmlFor="shifts">Turnos</label>
                <Select identify="IdShifts" changeSelect={(e)=>changeSelect(e,idx)} value={IdShifts} data={shifts} disabled={loading || disabled} />
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-2">
                <label htmlFor="sections">Secciones</label>
                <Select identify="IdSections" changeSelect={(e)=>changeSelect(e,idx)} value={IdSections} data={sections} disabled={loading || disabled} />
            </div>
            <div className="grid gap-x-2 grid-cols-[auto] row-start-1 row-end-3 col-start-4 col-end-5 py-5">
                <Button type="button" color="red" className="font-semibold text-white" onClick={()=>deleteItem(idx)} disabled={loading || disabled} >Eliminar</Button>
            </div>
        </div>
    )
};

export default SectionClasses;
export {SectionClasses};