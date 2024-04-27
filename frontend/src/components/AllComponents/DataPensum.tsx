import { useEffect, useState } from "react";
import { Popup, Select, BlockSemester, DeletePopUp, Button } from "../";
import { supaService } from "../../supabase/supaService";
import useStorePensum from "../../zustanStore/pensum";
import useStoreProfessions from "../../zustanStore/profession";
import { useShallow } from "zustand/react/shallow";
import useStoreClasses from "../../zustanStore/classes";
import useStoreSemesters from "../../zustanStore/semesters";
import useStoreLoading from "../../zustanStore/loading";
import useStoreSupabase from "../../zustanStore/supabase";
import useStoreModal from "../../zustanStore/modal";
import { useSupabase } from "../../hooks/useSupabase";
import { TABLE_NAME, identifySelect } from "../../ultil/const";

type data = {
    id: number,
    names: string,
}
type modalInitial = {
    type:string,
    value:boolean,
    data:data,
    IdSemesters:number,
    id:number,
    semesterName:string,
    ClasseName:string,
}

const modalInitial: modalInitial = {
    type:"",
    IdSemesters:0,
    value:false,
    data:{id:0,names:""},
    id:0, semesterName:"",
    ClasseName:""
};

function DataPensum(){

    const { supabase } = useStoreSupabase(useShallow(state=>({
        supabase:state.supabase
    })))

    const {handlerChange, dataModal, type, value} = useStoreModal(useShallow((state=>({
        handlerChange: state.handlerChange,
        dataModal: state.data,
        type: state.type,
        value: state.value
    }))))

    const {getAll, insertSingle, removeSingle, getPensumByID} = supaService(supabase)

    const {handlerLoading, handlerError} = useStoreLoading(useShallow((state=>({
        handlerError: state.handlerError,
        handlerLoading: state.handlerLoading
    }))))

    const {pensum, setPensum, addClassePensum, addSemesterPensum, removeClassePensum, clearPensum} = useStorePensum(
        useShallow((state=>({
            pensum: state.pensum,
            setPensum: state.setPensum,
            addClassePensum: state.addClassePensum,
            addSemesterPensum: state.addSemesterPensum,
            removeClassePensum: state.removeClassePensum,
            clearPensum: state.clearPensum
        })))
    )

    const {classes, setClasses} = useStoreClasses(
        useShallow( (state => ({
            classes: state.classes,
            setClasses: state.setClasses,
        })))
    )

    const {professions, setProfessions} = useStoreProfessions(
        useShallow( (state => ({
            professions: state.professions,
            setProfessions: state.setProfessions,
        })))
    )

    const {semesters, setSemesters} = useStoreSemesters(
        useShallow( (state => ({
            semesters: state.semesters,
            setSemesters: state.setSemesters,
        })))
    )

    const {getSupabase:getC} = useSupabase(TABLE_NAME.CLASSES,handlerLoading, handlerError, getAll)
    const {getSupabase:getPF} = useSupabase(TABLE_NAME.PROFESSION,handlerLoading, handlerError, getAll)
    const {getSupabase:getS} = useSupabase(TABLE_NAME.SEMESTERS,handlerLoading, handlerError, getAll)
    const {insertSupabase:insertPM, deleteSupabase:deletePM, getSupabaseByID} = useSupabase(TABLE_NAME.PENSUM,handlerLoading, handlerError)
    
    const [selectSemesters, setSelectSemesters] = useState<number>(0);
    const [selectPensum, setSelectPensum] = useState<number>(0);

    const [activeInsertSemester, setActiveInsertSemester] = useState(true);

    useEffect(() => {
        classes.length <= 0 && getC(getAll, setClasses)
        professions.length <= 0 && getPF(getAll, setProfessions)
        semesters.length <= 0 && getS(getAll, setSemesters)
        return () => {
            clearPensum()
        }
    }, [])

    useEffect(() => {
        selectPensum > 0 ? setActiveInsertSemester(false) : setActiveInsertSemester(true);
        return () => {}
    }, [selectPensum]);
    
    const aceptCallback = () => {
        switch (type) {
            case "insertClasse":
                const newData = {
                    IdProfession:selectPensum,
                    IdSemesters:dataModal.IdSemesters,
                    IdClasses:dataModal.id,
                }
                const SELECT = "id, IdProfession, IdSemesters, IdClasses, classes!inner(Name_Classes:names)"
                insertPM(insertSingle, newData, addClassePensum, SELECT)
                break;
            case "removeClasse":
                const eqObj = {eq:"id", eqData:dataModal.id}
                deletePM(removeSingle, eqObj, removeClassePensum)
                break;
        }
        handlerChange({type:"",value:false,data:{id:0,names:""}})
    }

    const changeSelectProfession = (e:any) => {
        const ID = Number(e.target.value);
        setSelectPensum(ID);
        getSupabaseByID(getPensumByID,ID, setPensum)
    }

    const changeSelectSemester = (e:any) => {
        const ID = Number(e.target.value);
        setSelectSemesters(ID);
    }

    const insertNewClasse = (IdSemesters:number) => {
        handlerChange({type:"insertClasse",value:true,data:{...dataModal,IdSemesters}})
    }

    const removeClasse = (id:number,semesterName:string,classeName:string) => {
        handlerChange({type:"removeClasse",value:true,data:{...dataModal,id, names:classeName, semesterName, classeName}})
    }

    const insertNewSemester = () => {
        const dataSemester = semesters ? ( semesters[selectSemesters - 1] || { id:0, names:"" } ) : { id:0, names:"" }
        if( selectSemesters > 0){
            const newSemester = {
                IdSemesters: dataSemester.id,
                Name_Semesters: dataSemester.names,
                Classes: []
            }
            if(pensum.length > 0){
                let exist = false
                pensum.forEach((item)=>{
                    if(item?.IdSemesters === dataSemester.id) exist = true
                })
                if(!exist) addSemesterPensum(newSemester)
            }else{
                addSemesterPensum(newSemester)
            }
        }
    }
    
    const changeSelectClasses = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const ID = Number(e.target.value);
        const newData = classes.find(item => item.id === ID) as data || { id:0, names:"" }
        handlerChange( {type, value,  data:{...dataModal, ...newData}} )
    }

    const cancelCallBack = () => {
        handlerChange({type:"",value:false,data:{id:0, names:""}})
    }

    const bodyModal = (type:string, value:string, data:any, valueModal:boolean) => {
        switch (type) {
            case "insertClasse":
                return (
                    <Select
                        identify={identifySelect.CLASSES}
                        changeSelect={(e)=>changeSelectClasses(e)}
                        value={dataModal.id}
                        data={classes}
                    />
                )
            case "removeClasse":
                return <DeletePopUp value={value} textIni={"¿Desea eliminar la Clases/Materia"} textFin={"?"} />
            default:
                return null;
        }
    }

    return(        
        <div className="p-5 m-5 overflow-auto">
            <div className="grid grid-cols-[200px_1fr] mb-5">
                <h2 className="text-lg font-semibold text-gray-800">Profesiones</h2>
                <Select
                    identify={identifySelect.PROFESSION}
                    changeSelect={changeSelectProfession}
                    value={selectPensum}
                    data={professions}
                />
            </div>
            <section>
                {
                    pensum.map((semester:pensum)=>{
                        return (
                            <BlockSemester
                                key={semester?.IdSemesters}
                                semester={semester}
                                insertNewClasse={insertNewClasse}
                                removeClasse={removeClasse}
                            />
                        )
                    })
                }
            </section>
            <div  className="grid grid-cols-[1fr_200px] gap-x-5 mt-5">
                <Select
                    identify={identifySelect.SEMESTERS}
                    changeSelect={changeSelectSemester}
                    value={selectSemesters}
                    data={semesters}
                />
                <Button type="button" color="green" className="font-semibold text-white" onClick={insertNewSemester} disabled={activeInsertSemester} >Agregar</Button>
            </div>
            <Popup key={'DataPensum'} cancelCallBack={cancelCallBack} aceptCallback={aceptCallback} bodyModal={bodyModal} />
        </div>
    );
}

export default DataPensum;
export {DataPensum};