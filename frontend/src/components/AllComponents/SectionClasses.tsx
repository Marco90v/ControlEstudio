import { useGetClassesQuery } from "../../store/apis/classesApi";
import { useGetProfessionQuery } from "../../store/apis/professionApi";
import { useGetSectionsQuery } from "../../store/apis/sectionsApi";
import { useGetSemestersQuery } from "../../store/apis/semestersApi";
import { useGetShiftsQuery } from "../../store/apis/shiftsApi";
import { Select } from "../"

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

    const { data:shifts=[] } = useGetShiftsQuery();
    const { data:sections=[] } = useGetSectionsQuery();
    const { data:professions=[] } = useGetProfessionQuery();
    const { data:semesters=[] } = useGetSemestersQuery();
    const { data:classes=[] } = useGetClassesQuery();

    return (
        <div className="dataClasses" >
            <div className="listProfession">
                <label htmlFor="profession">Profesiones/Carreras</label>
                <Select identify="IdProfession" changeSelect={(e)=>changeSelect(e,idx)} value={IdProfession} data={professions} disabled={disabled} />
            </div>
            <div className="listSemesters">
                <label htmlFor="semesters">Semestres</label>
                <Select identify="IdSemesters" changeSelect={(e)=>changeSelect(e,idx)} value={IdSemesters} data={semesters} disabled={disabled} />
            </div>
            <div className="listClasses">
                <label htmlFor="classes">Clases</label>
                <Select identify="IdClasses" changeSelect={(e)=>changeSelect(e,idx)} value={IdClasses} data={classes} disabled={disabled} />
            </div>
            <div className="listShifts">
                <label htmlFor="shifts">Turnos</label>
                <Select identify="IdShifts" changeSelect={(e)=>changeSelect(e,idx)} value={IdShifts} data={shifts} disabled={disabled} />
            </div>
            <div className="listSections">
                <label htmlFor="sections">Secciones</label>
                <Select identify="IdSections" changeSelect={(e)=>changeSelect(e,idx)} value={IdSections} data={sections} disabled={disabled} />
            </div>
            <div className="delete">
                <button onClick={()=>deleteItem(idx)} disabled={disabled} >Eliminar</button>
            </div>
        </div>
    )
};

export {SectionClasses}