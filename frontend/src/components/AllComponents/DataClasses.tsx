import { useEffect } from "react";
import { useShallow } from 'zustand/react/shallow'
import useStoreClasses from "../../zustanStore/classes";
import useStoreLoading from "../../zustanStore/loading";
import useStoreModal from "../../zustanStore/modal";
import useStoreSupabase from "../../zustanStore/supabase";
import { useSupabase } from "../../hooks/useSupabase";
import { supaService } from "../../supabase/supaService";
import { TABLE_NAME } from "../../ultil/const";
import Input from "./Input";
import DeletePopUp from "./DeletePopUp";
import InputForm from "./InputForm";
import TableComponent from "./TableComponent";
import Popup from "./Popup";

function DataClasses() {

    const { supabase } = useStoreSupabase(useShallow(state=>({
        supabase:state.supabase
    })))
    const {getAll, insertSingle, removeSingle, updateSingle} = supaService(supabase)

    const {handlerChange} = useStoreModal(useShallow((state=>({
        handlerChange: state.handlerChange,
    }))))

    const {handlerLoading, handlerError} = useStoreLoading(useShallow((state=>({
        handlerError: state.handlerError,
        handlerLoading: state.handlerLoading
    }))))
    const {classes, addClasse, setClasses, updateClasse, deleteClasse} = useStoreClasses(
        useShallow( (state => ({
            classes: state.classes,
            addClasse: state.addClasse,
            setClasses: state.setClasses,
            updateClasse: state.updateClasse,
            deleteClasse: state.deleteClasse,
        })))
    )
    const {getSupabase, insertSupabase, updateSupabase, deleteSupabase} = useSupabase(TABLE_NAME.CLASSES,handlerLoading, handlerError)

    useEffect(() => {
        if(classes.length===0) getSupabase(getAll, setClasses)
        return () => {}
    }, [])

    
    const addClasses = async (names:{names:string}) => {
        insertSupabase(insertSingle, names, addClasse)
    }

    const upDate = async (data:any | {id:number}) => {
        updateSupabase(updateSingle, data, {eq:'id', eqData:data.id}, updateClasse)
    }

    const removeClasse = async (id:number) => {
        deleteSupabase(removeSingle,{eq:'id', eqData:id}, deleteClasse)
    }

    const edit = (data:classe) => {
        handlerChange({type:"edit",value:true, data})
    }

    const remove = (data:classe) => {
        handlerChange({type:"delete",value:true, data})
    }

    const aceptCallback = (type:string, data?:any | {id:number}) => {
        switch (type) {
            case "edit":
                upDate(data)
                break;
            case "delete":
                removeClasse(data.id)
                break;
        }
        handlerChange({type:"", value:false,  data:{id:0,names:""}})
    }

    const cancelCallBack = () => {
        handlerChange({type:"", value:false,  data:{id:0,names:""}})
    }

    const changeInputEdit = (e:React.ChangeEvent<HTMLInputElement>, data:any, type:string, valueModal:boolean)=>{
        handlerChange( {type, value:valueModal,  data:{...data, [e.target.name]:e.target.value }} )
    }

    const bodyModal = (type:string, value:string, data:any, valueModal:boolean) => {
        switch (type) {
            case "edit":
                return <Input type="text" id="names" name="names" className="w-[90%]" value={value} onChange={(e)=>changeInputEdit(e, data, type, valueModal)} />
            case "delete":
                return <DeletePopUp value={value} textIni={"¿Desea eliminar la Clases/Materia"} textFin={"?"} />
            default:
                return null;
        }
    }

    return(
        <div className="overflow-auto">
            <InputForm
                addCallBack={addClasses}
                title={"Clase/Materia"}
            />
            <div className="flex justify-center pb-12">
                <TableComponent
                    edit={edit}
                    remove={remove}
                    data={classes}
                />
            </div>
            <Popup cancelCallBack={cancelCallBack} aceptCallback={aceptCallback} bodyModal={bodyModal} />
        </div>
    );
}

export default DataClasses;
export {DataClasses};