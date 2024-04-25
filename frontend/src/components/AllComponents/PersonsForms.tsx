import { useEffect, useState } from "react";
import { fieldNotEmptied } from "../../ultil";
import { Popup, Select, Button, Input } from "../";
// import { useMutation } from "@apollo/client/react/hooks";
import useStorePersons from "../../zustanStore/persons";
import { ADD_PERSON, ROLES, TABLE_NAME, UPDATE_PERSON } from "../../ultil/const";
import useStoreRoles from "../../zustanStore/roles";
import { useShallow } from "zustand/react/shallow";
import useStoreLoading from "../../zustanStore/loading";
import useStoreSupabase from "../../zustanStore/supabase";
import useStoreModal from "../../zustanStore/modal";
import { useSupabase } from "../../hooks/useSupabase";
import { supaService } from "../../supabase/supaService";

type Role = {
    id: number | null | undefined,
    names: string | null | undefined,
}

interface props {
    children:React.ReactNode,
    saveChildren:React.MutableRefObject<any>,
    changeRole:Function,
    type:string,
    style?:string
}

const selectSex = [
    {id:"M", names:"Masculino"},
    {id:"F", names:"Femenino"},
]

function PersonsForms({children, saveChildren, changeRole, type, style}:props){
    const { supabase } = useStoreSupabase(useShallow(state=>({
        supabase:state.supabase
    })))
    const {insertSingle, updateSingle} = supaService(supabase)

    const {handlerChange, typeModal} = useStoreModal(useShallow((state=>({
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

    const {handlerLoading, handlerError} = useStoreLoading(useShallow((state=>({
        handlerError: state.handlerError,
        handlerLoading: state.handlerLoading
    }))))

    const {person, clearPerson, changePerson, addPerson, updatePersons} = useStorePersons(
        useShallow((state=>({
            person: state.data.person,
            clearPerson: state.clearPerson,
            changePerson: state.changePerson,
            addPerson: state.addPerson,
            updatePersons: state.updatePersons
        })))
    )

    const {insertSupabase, updateSupabase} = useSupabase(TABLE_NAME.PERSONS,handlerLoading, handlerError)

    const [selectRole, setSelectRole] = useState(0)

    useEffect(() => {
        if(roles.length > 0){
            const ID = roles.find(r=>r.names===type)?.id || 0
            setSelectRole(ID)
        }
    
        return () => {}
    }, [roles])   

    const cancelEdit = () => {
        clearPerson()
        handlerChange({type:"",value:false, data:{id:0,names:""}})
    }

    const changeDataPerson = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const camp = e.target.name;
        const value = e.target.value;
        changePerson(camp, value)
    }

    const chargeData = (data:any) => {
        if(person.id === 0){
            saveChildren.current.save(data?.id);
            addPerson(data)
            clearPerson()
        }else{

        }
    }

    const newData = async () => {
        const {names, lastNames, email, phone, sex} = person;
        const notEmptied:boolean = fieldNotEmptied({names, lastNames, email, phone, sex});
        const newData = {
            names, lastNames, email, sex,
            phone:Number(phone),
            role:selectRole,
            photo:null
        };
        if(notEmptied){
            try{
                insertSupabase(insertSingle, newData, chargeData)
            }catch(error){
                console.log("error");
            }
        }
    }

    const editData = () => {
        handlerChange({type:"edit",value:true, data:{id:0,names:""}})
    }

    const save = () => {
        person.id === 0 ? newData() : editData();
    }

    const update = async () => {
        if(person){
            const newData = {
                names: person.names,
                lastNames: person.lastNames,
                sex: person.sex,
                email: person.email,
                phone: person.phone,
                photo: person.photo,
                role: person.role,
            }
            const eqObj = {
                eq:"id",
                eqData: person.id
            }
            updateSupabase(updateSingle, newData, eqObj, updatePersons)
            saveChildren.current.save();
        }
    }

    const aceptCallback = (type:string, data?:any | {id:number}) => {
        switch (type) {
            case "edit":
                update();
                break;
        }
        handlerChange({type:"",value:false, data:{id:0,names:""}})
    }

    const cancelCallBack = () => {
        handlerChange({type:"",value:false, data:{id:0,names:""}})
    }

    const bodyModal = (type:string, value:string, data:any, valueModal:boolean):JSX.Element | any => {
        if(type === "edit") return <p>¿Desea Guardar los cambios?</p>
    }

    return(
        <form className="grid gap-y-4 mb-4 border-solid border border-gray-200 p-4 rounded-lg shadow" onSubmit={(e)=>e.preventDefault()} >
            <div className="grid grid-cols-3 grid-rows-[1.8rem_auto] gap-y-4 gap-x-4">
                <div className="grid grid-cols-[auto_1fr] grid-rows-1 min-h-7 gap-x-2">
                    <label className="font-semibold" htmlFor="names">Nombre Completo</label>
                    <Input className="w-full" id="names" name="names" type="text" value={person.names} onChange={(e)=>changeDataPerson(e)} />
                </div>
                <div className="grid grid-cols-[auto_1fr] grid-rows-1 min-h-7 gap-x-2">
                    <label className="font-semibold" htmlFor="lastNames">Apellido Completo</label>
                    <Input className="w-full" id="lastNames" name="lastNames" type="text" value={person.lastNames} onChange={(e)=>changeDataPerson(e)} />
                </div>
                <div className="grid grid-cols-[auto_1fr] grid-rows-1 min-h-7 gap-x-2">
                    <label className="font-semibold" htmlFor="selectSex">Genero</label>
                    <Select identify="sex" value={person.sex} data={selectSex} changeSelect={(e)=>changeDataPerson(e)} />
                </div>
                <div className="grid grid-cols-[auto_1fr] min-h-7 gap-x-2 col-start-1 col-end-4 gap-y-4">
                    <label className="font-semibold" htmlFor="email">Email</label>
                    <Input className="w-full min-h-7" id="email" name="email" type="email" value={person.email} onChange={(e)=>changeDataPerson(e)} />
                    <label className="font-semibold" htmlFor="phone">Telefono</label>
                    <Input className="w-full min-h-7" id="phone" name="phone" type="number" value={person.phone || ""} onChange={(e)=>changeDataPerson(e)} />
                    <label className="font-semibold" htmlFor="role">Rol</label>
                    <Select identify="role" changeSelect={(e)=>changeRole(e)} value={selectRole} data={roles} disabled={true} />
                    <label className="font-semibold" htmlFor="photo">Foto</label>
                    <Input className="w-full min-h-7 text-sm" id="phophotone" name="photo" type="file" value={person.photo || ""} onChange={(e)=>changeDataPerson(e)} disabled={true} />
                </div>
                {type === ROLES.STUDENT && children}
            </div>
                {type === ROLES.TEACHER && children}
                
            <div className="grid grid-cols-[auto_auto] gap-x-2 justify-end">
                {
                    person.id === 0 ?
                    <Button type="button" color="green" className="font-semibold text-white" onClick={save} >Guardar</Button> :
                    <>
                        <Button type="button" color="red" className="font-semibold text-white" onClick={cancelEdit} >Cancelar</Button>
                        <Button type="button" color="yellow" className="font-semibold" onClick={save} >Guardar cambios</Button>
                    </>
                }
            </div>
            { typeModal === "edit" && <Popup key={'PersonsForms'} cancelCallBack={cancelCallBack} aceptCallback={aceptCallback} bodyModal={bodyModal} />}
        </form>
    );
}

export default PersonsForms;
export {PersonsForms};