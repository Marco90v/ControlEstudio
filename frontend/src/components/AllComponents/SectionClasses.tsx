import { useGetClassesQuery } from "../../store/apis/classesApi";
import { useGetProfessionQuery } from "../../store/apis/professionApi";
import { useGetSectionsQuery } from "../../store/apis/sectionsApi";
import { useGetSemestersQuery } from "../../store/apis/semestersApi";
import { useGetShiftsQuery } from "../../store/apis/shiftsApi";
import { Select } from "../"
import useStoreClasses from "../../zustanStore/classes";
import useStoreProfessions from "../../zustanStore/profession";
import useStoreSemesters from "../../zustanStore/semesters";
import useStoreShifts from "../../zustanStore/shifts";
import useStoreSections from "../../zustanStore/sections";
import { useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { gql } from "../../__generated__";
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
        <div className="dataClasses" >
            <div className="listProfession">
                <label htmlFor="profession">Profesiones/Carreras</label>
                <Select identify="IdProfession" changeSelect={(e)=>changeSelect(e,idx)} value={IdProfession} data={professions?.allProfession} disabled={disabled} />
            </div>
            <div className="listSemesters">
                <label htmlFor="semesters">Semestres</label>
                <Select identify="IdSemesters" changeSelect={(e)=>changeSelect(e,idx)} value={IdSemesters} data={semesters?.allSemesters} disabled={disabled} />
            </div>
            <div className="listClasses">
                <label htmlFor="classes">Clases</label>
                <Select identify="IdClasses" changeSelect={(e)=>changeSelect(e,idx)} value={IdClasses} data={classes?.allClasses} disabled={disabled} />
            </div>
            <div className="listShifts">
                <label htmlFor="shifts">Turnos</label>
                <Select identify="IdShifts" changeSelect={(e)=>changeSelect(e,idx)} value={IdShifts} data={shifts?.allShifts} disabled={disabled} />
            </div>
            <div className="listSections">
                <label htmlFor="sections">Secciones</label>
                <Select identify="IdSections" changeSelect={(e)=>changeSelect(e,idx)} value={IdSections} data={sections?.allSections} disabled={disabled} />
            </div>
            <div className="delete">
                <button onClick={()=>deleteItem(idx)} disabled={disabled} >Eliminar</button>
            </div>
        </div>
    )
};

export default SectionClasses;
export {SectionClasses};