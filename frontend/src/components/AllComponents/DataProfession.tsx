import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import useStoreProfessions from "../../zustanStore/profession";
import useStoreLoading from "../../zustanStore/loading";
import useStoreModal from "../../zustanStore/modal";
import useStoreSupabase from "../../zustanStore/supabase";
import { useSupabase } from "../../hooks/useSupabase";
import { supaService } from "../../supabase/supaService";
import { DeletePopUp, Input, InputForm, Popup, TableComponent } from "../";
import { TABLE_NAME } from "../../ultil/const";
import useStorePersons from "../../zustanStore/persons";

function DataProfession(){
    
    const { supabase } = useStoreSupabase(useShallow(state=>({
        supabase:state.getSupabase
    })))
    const {getAll, insertSingle, removeSingle, updateSingle} = supaService(supabase())

    const {handlerChange} = useStoreModal(useShallow((state=>({
        handlerChange: state.handlerChange,
    }))))

    const {handlerLoading, handlerError} = useStoreLoading(useShallow((state=>({
        handlerError: state.handlerError,
        handlerLoading: state.handlerLoading
    }))))

    const {professions, addProfession, setProfessions, updateProfession, deleteProfession} = useStoreProfessions(
        useShallow( (state => ({
            professions: state.professions,
            addProfession: state.addProfession,
            setProfessions: state.setProfessions,
            updateProfession: state.updateProfession,
            deleteProfession: state.deleteProfession,
        })))
    )
    const { clearPerson } = useStorePersons(useShallow(state=>({
        clearPerson: state.clearPerson
    })))

    const {getSupabase, insertSupabase, updateSupabase, deleteSupabase} = useSupabase(TABLE_NAME.PROFESSION,handlerLoading, handlerError)

    useEffect(() => {
        if(professions.length===0) getSupabase(getAll, setProfessions)
        return () => {
            clearPerson()
        }
    }, [])

    const add = (names:{names:string}) => {
        insertSupabase(insertSingle, names, addProfession)
    }

    const edit = (data:profession) => {
        handlerChange({type:"edit",value:true, data})
    }

    const remove = (data:profession) => {
        handlerChange({type:"delete",value:true, data})
    }

    const upDate = (data:any | {id:number}) => {
        updateSupabase(updateSingle, data, {eq:'id', eqData:data.id}, updateProfession)
    }

    const removeClasse = (id:number) => {
        deleteSupabase(removeSingle,{eq:'id', eqData:id}, deleteProfession)
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

    const changeInputEdit = (e:React.ChangeEvent<HTMLInputElement>, data:any, type:string, valueModal:boolean)=>{
        handlerChange( {type, value:valueModal,  data:{...data, [e.target.name]:e.target.value }} )
    }

    const cancelCallBack = () => {
        handlerChange({type:"", value:false,  data:{id:0,names:""}})
    }

    const bodyModal = (type:string, value:string, data:any, valueModal:boolean) => {
        switch (type) {
            case "edit":
                return <Input type="text" id="names" name="names" className="w-[90%]" value={value} onChange={(e)=>changeInputEdit(e, data, type, valueModal)} />
            case "delete":
                return <DeletePopUp value={value} textIni={"¿Desea eliminar la Profesión"} textFin={"?"} />
            default:
                return null;
        }
    }

    return(
        <div className="overflow-auto">
            <InputForm
                addCallBack={add}
                title={"Profesiones"}
            />
            <div className="flex justify-center pb-12">
                <TableComponent
                    edit={edit}
                    remove={remove}
                    data={professions}
                />
            </div>
            <Popup cancelCallBack={cancelCallBack} aceptCallback={aceptCallback} bodyModal={bodyModal} />
        </div>
    );
}

export default DataProfession;
export {DataProfession};