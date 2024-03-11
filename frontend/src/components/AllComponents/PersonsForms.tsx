import { useEffect, useState } from "react";
import { SelectStyle } from "../../styled/style";
import { fieldNotEmptied } from "../../ultil";
import { Popup, Select } from "../";
import { useMutation } from "@apollo/client";
import useStorePersons from "../../zustanStore/persons";
import useStoreTeacherClasses from "../../zustanStore/teacherClasse";
import { ADD_PERSON, ADD_TEACHER, UPDATE_PERSON } from "../../ultil/const";

function PersonsForms({children, saveChildren, changeRole, roles, selectRole, wait, type}:any){

    const [postPerson, { data:dataAddPerson, reset:resetAddPerson }] = useMutation(ADD_PERSON)
    const [postTeacher, { data:dataAddTeacher, reset:resetAddTeacher }] = useMutation(ADD_TEACHER)

    const [updatePerson, { data:dataUpdatePerson, reset:resetUpdatePerson }] = useMutation(UPDATE_PERSON)

    const {data:{person}, setPersons, clearPersons, clearPerson, changePerson} = useStorePersons((state)=>state)
    const clearTeacherClasses = useStoreTeacherClasses((state)=>state.clearTeacherClasses)

    const statusFetch = false
    const [isChange, setIsChange] = useState(false);   
    const [modal,setModal] = useState({type:"", value:false, data:{id:0,names:""}});

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
                /**
                 * ADD_PERSON
                 */
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
        <form className="newPerson" onSubmit={(e)=>e.preventDefault()} >
            <div className="dataUser">
                <div className="names">
                    <label htmlFor="names">Nombre Completo</label>
                    <input type="text" name="names" id="names" value={person.names} onChange={e=>changeDataPerson(e)} disabled={statusFetch} />
                </div>
                <div className="lastNames">
                    <label htmlFor="lastNames">Apellido Completo</label>
                    <input type="text" name="lastNames" id="lastNames" value={person.lastNames} onChange={e=>changeDataPerson(e)} disabled={statusFetch} />
                </div>
                <div className="sex">
                    <label htmlFor="selectSex">Genero</label>
                    <SelectStyle name="sex" id="sex" value={person.sex} onChange={e=>changeDataPerson(e)} disabled={statusFetch} >
                        <option value=""></option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                    </SelectStyle>
                </div>
                <div className="data">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" value={person.email} onChange={e=>changeDataPerson(e)} disabled={statusFetch} />
                    <label htmlFor="phone">Telefono</label>
                    <input type="number" name="phone" id="phone" value={person.phone || ""} onChange={e=>changeDataPerson(e)} disabled={statusFetch} />
                    <label htmlFor="role">Rol</label>
                    <Select identify="role" changeSelect={(e)=>changeRole(e)} value={selectRole} data={roles} disabled={true} />
                    <label htmlFor="photo">Foto</label>
                    <input type="file" name="photo" id="photo" disabled={true} />
                </div>
                {type === "Estudiante" && children}
            </div>
                {type === "Profesor" && children}
                
            <div className="save">
                {
                    person.id === 0 ?
                    <button onClick={save} disabled={statusFetch} >Guardar</button> :
                    <>
                        <button onClick={()=>cancelEdit()} className="cancel" disabled={statusFetch} >Cancelar</button>
                        <button className="edit" onClick={save} disabled={statusFetch} >Guardar cambios</button>
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