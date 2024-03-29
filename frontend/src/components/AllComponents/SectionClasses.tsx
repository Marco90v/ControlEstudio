import { Button, Select } from "../"
import { useQuery } from "@apollo/client/react/hooks";
import { GET_CLASSES, GET_PROFESSIONS, GET_SECTIONS, GET_SEMESTERS, GET_SHIFTS } from "../../ultil/const";

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
    disabled:boolean
}

const SectionClasses =  ({ idx, teacher, changeSelect, deleteItem, disabled}:prop) => {
    const { IdProfession, IdSemesters, IdClasses, IdShifts, IdSections } = teacher;

    const { data:shifts } = useQuery(GET_SHIFTS);
    const { data:sections } = useQuery(GET_SECTIONS);
    const { data:professions } = useQuery(GET_PROFESSIONS);
    const { data:semesters } = useQuery(GET_SEMESTERS);
    const { data:classes } = useQuery(GET_CLASSES);

    return (
        <div className="grid gap-y-2 gap-x-4 grid-cols-3 grid-rows-2 bg-white p-2 rounded-lg border-solid border border-gray-200 hover:bg-gray-50 mb-4" >
            <div className="grid grid-cols-[auto_1fr] gap-x-2">
                <label htmlFor="profession">Profesiones/Carreras</label>
                <Select identify="IdProfession" changeSelect={(e)=>changeSelect(e,idx)} value={IdProfession} data={professions?.allProfession} disabled={disabled} />
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-2">
                <label htmlFor="semesters">Semestres</label>
                <Select identify="IdSemesters" changeSelect={(e)=>changeSelect(e,idx)} value={IdSemesters} data={semesters?.allSemesters} disabled={disabled} />
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-2">
                <label htmlFor="classes">Clases</label>
                <Select identify="IdClasses" changeSelect={(e)=>changeSelect(e,idx)} value={IdClasses} data={classes?.allClasses} disabled={disabled} />
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-2">
                <label htmlFor="shifts">Turnos</label>
                <Select identify="IdShifts" changeSelect={(e)=>changeSelect(e,idx)} value={IdShifts} data={shifts?.allShifts} disabled={disabled} />
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-2">
                <label htmlFor="sections">Secciones</label>
                <Select identify="IdSections" changeSelect={(e)=>changeSelect(e,idx)} value={IdSections} data={sections?.allSections} disabled={disabled} />
            </div>
            <div className="grid gap-x-2 grid-cols-[auto] row-start-1 row-end-3 col-start-4 col-end-5 py-5">
                <Button type="button" color="red" className="font-semibold text-white" onClick={()=>deleteItem(idx)} disabled={disabled} >Eliminar</Button>
            </div>
        </div>
    )
};

export default SectionClasses;
export {SectionClasses};