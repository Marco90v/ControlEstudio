import { useState } from "react";
import { SelectStyle } from "../../styled/style";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";
import { changePerson, resetPerson } from "../../store/module/personStore";
import { setStateFetch } from "../../store/module/statusFetch";
import { usePostPersonMutation, useUpdatePersonByIdMutation } from "../../store/apis/personApi";
import { fieldNotEmptied } from "../../ultil";
import { Popup, Select } from "../";

function PersonsForms({children, saveChildren, changeRole, roles, selectRole, wait, type}:any){

    const dispatch = useAppDispatch();
    const [ postPerson, { isLoading:isLoadPosPer, isSuccess:isSuccPosPer } ] = usePostPersonMutation();
    const [ updatePerson, { isLoading:isLoadUpPer, isSuccess:isSuccUpPer } ] = useUpdatePersonByIdMutation();
    const {data:person} = useSelector((state:store) => state.person);
    const {data:statusFetch} = useSelector((state:store) => state.stateFetch);
    const [isChange, setIsChange] = useState(false);   
    const [modal,setModal] = useState({type:"", value:false, data:{id:0,names:""}});

    const cancelEdit = () => {
        dispatch(resetPerson());
    }
    const changeDataPerson = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const camp = e.target.name;
        const value = e.target.value;
        dispatch(changePerson({[camp]:value}));
        !isChange && setIsChange(true);
    }

    const newData = async () => {
        dispatch(setStateFetch(true));
        const {name, lastNames, email, phone, sex} = person;
        const notEmptied:boolean = fieldNotEmptied({name, lastNames, email, phone, sex});
        const newData = {...person, phone:Number(phone), role:selectRole};
        if(notEmptied){
            const insert = {
                body: newData,
                role: selectRole
            }
            try{
                const { insertId:IdPersons } = await postPerson(insert).unwrap();
                saveChildren.current.save(IdPersons);
            }catch(error){
                console.log(error);
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
        dispatch(setStateFetch(true));
        const {names, lastNames, email, phone, sex, photo, role} = person;
        const newData:person = {...person,names, phone:Number(phone)};

        const notEmptied:boolean = fieldNotEmptied({names, lastNames, email, phone, sex, role});
        if(notEmptied){
            if(isChange){
                const updateP = {
                    body:newData,
                    role:selectRole
                }
                await updatePerson(updateP).unwrap();
                saveChildren.current.save();
            }else{
                saveChildren.current.save();
            }

        }else{
            console.log("no se permiten campos vacios");
            dispatch(setStateFetch(false));
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

export { PersonsForms };