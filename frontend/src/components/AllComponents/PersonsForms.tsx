import { useEffect, useState } from "react";
import { fieldNotEmptied } from "../../ultil";
import { Popup, Select } from "../";
import { useMutation } from "@apollo/client";
import useStorePersons from "../../zustanStore/persons";
import { ADD_PERSON, ROLES, UPDATE_PERSON } from "../../ultil/const";
import InputPopUp from "./InputPopUp";

type Role = {
    id: number | null | undefined,
    names: string | null | undefined,
}

interface props {
    children:React.ReactNode,
    saveChildren:React.MutableRefObject<any>,
    changeRole:Function,
    roles:Role[],
    selectRole:number,
    type:string,
    style?:string
}

function PersonsForms({children, saveChildren, changeRole, roles, selectRole, type, style}:props){

    const [postPerson, { data:dataAddPerson, loading:loadingAddPerson, reset:resetAddPerson }] = useMutation(ADD_PERSON)
    const [updatePerson, { loading:loadingUpdatePerson }] = useMutation(UPDATE_PERSON)
    const {data:{person}, clearPerson, changePerson} = useStorePersons((state)=>state)
    const [modal,setModal] = useState({type:"", value:false, data:{id:0,names:""}});
    const loading = loadingAddPerson || loadingUpdatePerson

    const selectSex = [
        {id:0, names:""},
        {id:"M", names:"Masculino"},
        {id:"F", names:"Femenino"},
    ]

    useEffect(() => {
        if(dataAddPerson?.addPerson?.id){
            saveChildren.current.save(dataAddPerson?.addPerson?.id);
            resetAddPerson()
        }
        return () => {}
    }, [dataAddPerson])
    

    const cancelEdit = () => {
        clearPerson()
    }
    const changeDataPerson = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const camp = e.target.name;
        const value = e.target.value;
        changePerson(camp, value)
    }

    const newData = async () => {
        const {names, lastNames, email, phone, sex} = person;
        const notEmptied:boolean = fieldNotEmptied({names, lastNames, email, phone, sex});
        const newData = {...person, phone:Number(phone), role:selectRole};
        if(notEmptied){
            try{

                // ADD_PERSON
                postPerson({
                    variables: {
                        dataPerson: {
                            sex: newData.sex,
                            role: newData.role,
                            photo: newData.photo,
                            names: newData.names,
                            phone: newData.phone,
                            lastNames: newData.lastNames,
                            email: newData.email,
                        }
                    }
                })
            }catch(error){
                console.log("error");
            }
        }
    }

    const editData = () => {
        setModal({type:"edit",value:true, data:{id:0,names:""}});        
    }

    const save = () => {
        person.id === 0 ? newData() : editData();
    }

    const update = async () => {
        if(person){
            updatePerson({
                variables:{
                    dataPerson:{
                        id: person.id,
                        names: person.names,
                        lastNames: person.lastNames,
                        sex: person.sex,
                        email: person.email,
                        phone: person.phone,
                        photo: person.photo,
                        role: person.role,
                    }
                }
            })
            saveChildren.current.save();
        }
    }

    const aceptCallback = () => {
        switch (modal.type) {
            case "edit":
                update();
                break;
        }
        setModal((datos:any)=>{
            return{
                ...datos,
                type:"", value:false,  data:{id:0,names:""}
            }
        });
    }

    const cancelCallBack = () => {
        setModal({type:"", value:false,  data:{id:0,names:""}});
    }

    const cuerpoPopup:any = {
        "edit": <p>¿Desea Guardar los cambios?</p>,
    };

    return(
        <form className="grid gap-y-4 mb-4 border-solid border border-gray-200 p-4 rounded-lg shadow" onSubmit={(e)=>e.preventDefault()} >
            <div className="grid grid-cols-3 grid-rows-[1.8rem_auto] gap-y-4 gap-x-4">
                <div className="grid grid-cols-[auto_1fr] grid-rows-1 min-h-7 gap-x-2">
                    <label className="font-semibold" htmlFor="names">Nombre Completo</label>
                    <InputPopUp type="text" identify="names" value={person.names} actionChange={(e)=>changeDataPerson(e)} disabled={loading} style="w-full" />
                </div>
                <div className="grid grid-cols-[auto_1fr] grid-rows-1 min-h-7 gap-x-2">
                    <label className="font-semibold" htmlFor="lastNames">Apellido Completo</label>
                    <InputPopUp type="text" identify="lastNames" value={person.lastNames} actionChange={(e)=>changeDataPerson(e)} disabled={loading} style="w-full" />
                </div>
                <div className="grid grid-cols-[auto_1fr] grid-rows-1 min-h-7 gap-x-2">
                    <label className="font-semibold" htmlFor="selectSex">Genero</label>
                    <Select identify="sex" value={person.sex} data={selectSex} changeSelect={(e)=>changeDataPerson(e)} disabled={loading} />
                </div>
                <div className="grid grid-cols-[auto_1fr] min-h-7 gap-x-2 col-start-1 col-end-4 gap-y-4">
                    <label className="font-semibold" htmlFor="email">Email</label>
                    <InputPopUp type="email" identify="email" value={person.email} actionChange={(e)=>changeDataPerson(e)} disabled={loading} style="w-full min-h-7" />
                    <label className="font-semibold" htmlFor="phone">Telefono</label>
                    <InputPopUp type="number" identify="phone" value={person.phone || ""} actionChange={(e)=>changeDataPerson(e)} disabled={loading} style="w-full min-h-7" />
                    <label className="font-semibold" htmlFor="role">Rol</label>
                    <Select identify="role" changeSelect={(e)=>changeRole(e)} value={selectRole} data={roles} disabled={true} />
                    <label className="font-semibold" htmlFor="photo">Foto</label>
                    <InputPopUp type="file" identify="photo" value={person.photo || ""} actionChange={(e)=>changeDataPerson(e)} disabled={true} style="w-full min-h-7" />
                </div>
                {type === ROLES.STUDENT && children}
            </div>
                {type === ROLES.TEACHER && children}
                
            <div className="grid grid-cols-[auto_auto] gap-x-2 justify-end">
                {
                    person.id === 0 ?
                    <button className="btn btn-greend" onClick={save} disabled={loading} >Guardar</button> :
                    <>
                        <button className="btn btn-red" onClick={()=>cancelEdit()} disabled={loading} >Cancelar</button>
                        <button className="btn btn-yellow" onClick={save} disabled={loading} >Guardar cambios</button>
                    </>
                }
            </div>
            {
                modal.value && <Popup key={'PersonsForms'} cancelCallBack={cancelCallBack} aceptCallback={aceptCallback} > {cuerpoPopup[modal.type]} </Popup>
            }
        </form>
    );
}

export default PersonsForms;
export {PersonsForms};