import { useEffect } from "react";
import useStorePersons from "../../zustanStore/persons";
import { TABLE_NAME } from "../../ultil/const";
import { useShallow } from "zustand/react/shallow";
import useStoreSupabase from "../../zustanStore/supabase";
import useStoreLoading from "../../zustanStore/loading";
import useStoreRoles from "../../zustanStore/roles";
import useStoreModal from "../../zustanStore/modal";
import { useSupabase } from "../../hooks/useSupabase";
import { supaService } from "../../supabase/supaService";
import DeletePopUp from "./DeletePopUp";
import TableComponent from "./TableComponent";
import Popup from "./Popup";

type Person = {
    email: string,
    id: number,
    lastNames: string,
    names: string,
    phone: number,
    role: number,
    sex: string,
    idPerson: number,
    name:string,
    photo?: string | undefined | null,
}

interface props{
    type:string,
    deleteChildren:  React.MutableRefObject<any>,
    preCarga?:Person[],
    scores?:boolean,
}
const columnsHeaders=["Nombres", "Apellidos", "Correo", "Telefono" ]

function TablePersons({type, deleteChildren, preCarga=[], scores=false}:props){

    const { supabase } = useStoreSupabase(useShallow(state=>({
        supabase:state.supabase
    })))
    const {getAll, removeSingle} = supaService(supabase)

    const {handlerLoading, handlerError} = useStoreLoading(useShallow((state=>({
        handlerError: state.handlerError,
        handlerLoading: state.handlerLoading
    }))))

    const {handlerChange, dataModal, typeModal} = useStoreModal(useShallow((state=>({
        handlerChange: state.handlerChange,
        dataModal: state.data,
        typeModal: state.type,
        value: state.value
    }))))

    const {roles} = useStoreRoles(
        useShallow((state=>({
            roles: state.roles,
        })))
    )

    const {persons,selectPerson, setPersons, removePerson} = useStorePersons(
        useShallow((state=>({
            persons: state.data.persons,
            selectPerson: state.selectPerson,
            setPersons: state.setPersons,
            removePerson: state.removePerson
        })))
    )

    const {getSupabase:getPR, deleteSupabase} = useSupabase(TABLE_NAME.PERSONS,handlerLoading, handlerError)

    const data = (preCarga.length>0) ? preCarga : persons    

    useEffect(() => {
        if(roles.length > 0){
            const rol = roles.find(r=>r.names===type)?.id || 0
            if((persons.length > 0 && persons[0].role !== rol )|| persons.length <= 0){
                const eqObj = {eq:"role", eqData:rol}
                getPR(getAll, setPersons, eqObj)
            }
        }
        return () => {}
    }, [roles]);

    const edit = (data:any) => {
        if(persons){
            selectPerson({...data, idPerson:data.id, name:data.names})
        }else{
            selectPerson({...preCarga[0]})
        }
    }
    const deletePerson = (idx:number) => {
        const eqObj={
            eq:"id",
            eqData:idx
        }
        deleteSupabase(removeSingle, eqObj, removePerson)
    }

    const deleteTeacher = (idx:number) => {
        deleteChildren?.current?.deleteChildren(idx)
        deletePerson(idx)
    }

    const aceptCallback = (type:string) => {
        switch (type) {
            case "delete":
                deleteTeacher(dataModal.id);
                break;
        }
        handlerChange({type:"",value:false, data:{id:0,names:""}})
    }

    const cancelCallBack = () => {
        handlerChange({type:"",value:false, data:{id:0,names:""}})
    }

    const remove = (data:any) => {
        if(scores){
            handlerChange({type:"scoresDelete",value:true, data:{id:0,names:""}})
        }else{
            handlerChange({type:"delete",value:true, data:{id:data.id,names:data.names}})
        }
    }

    const bodyModal = (type:string, value:string, data:any, valueModal:boolean) => {
        if(type === "delete") return <DeletePopUp value={dataModal.names} textIni={"¿Desea eliminar a:"} textFin={"?"} />
        if(type === "scoresDelete") return <p className="text-center">Esta acción esta prohibida en este modulo.</p>
    }

    return(
        <>
            <TableComponent
                edit={edit}
                remove={remove}
                data={data}
                columnsHeaders={columnsHeaders}
            />
            {
                (typeModal === "delete" || typeModal === "scoresDelete") && 
                <Popup key={'TablePersons'} cancelCallBack={cancelCallBack} aceptCallback={aceptCallback} bodyModal={bodyModal} />
            }
        </>
    );
}

export default TablePersons;
export {TablePersons};