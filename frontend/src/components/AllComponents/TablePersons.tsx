import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Img, Table } from "../../styled/style";
import { useAppDispatch } from "../../store/store";
import { personApi, useDeletePersonByIdMutation } from "../../store/apis/personApi";
import { setStateFetch } from "../../store/module/statusFetch";
import { resetPerson, setPerson } from "../../store/module/personStore";
import { Popup } from "../";

import imgTrash from "../../assets/trash-alt-solid-24.png";
import imgEdit from "../../assets/edit-solid-24.png";

function TablePersons({role, deleteChildren, preCarga=[], scores=false}:any){

    const dispatch = useAppDispatch();
    const { data:statusFetch } = useSelector((state:store) => state.stateFetch);
    const [ triggerPersons, { data:persons=preCarga } ] = personApi.endpoints.getPersonByRole.useLazyQuery();
    const [ deletePersonById, { isLoading:isLoadDelPerId, isSuccess:isSuccDelPerId } ] = useDeletePersonByIdMutation();
    const [modal,setModal] = useState({type:"", value:false, data:{id:0,names:""}});

    useEffect(() => {
        role > 0 && triggerPersons(role);
    return () => {
        dispatch(resetPerson());
    }
    }, [role]);

    const edit = (idx:number) => {
        const person:person = persons[idx];
        dispatch(setPerson(person));
    }

    const deletePerson = (idx:number) => {
        dispatch(setStateFetch(true));
        const deleteData = {body:{id:idx},role};
        deletePersonById(deleteData);
        deleteChildren.current.deleteChildren({IdPersons:idx})
    }

    const aceptCallback = () => {
        switch (modal.type) {
            case "delete":
                deletePerson(modal.data.id);
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
        "delete": <p>¿Desea eliminar a: <strong>"{modal.data.names}"</strong>?</p>,
        "scoresDelete": <p>Esta acción esta prohibida en este modulo</p>
    };

    const remove = (data:person) => {
        if(scores){
            setModal({type:"scoresDelete",value:true, data});
        }else{
            setModal({type:"delete",value:true, data});
        }
    }

    return(
        <Table>
            <thead>
                <tr>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Telefono</th>
                    <th>Correo</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                {
                    persons.map((item:person,idx:number)=>{
                        return(
                            <tr key={idx}>
                                <td>{item.names}</td>
                                <td>{item.lastNames}</td>
                                <td>{item.phone}</td>
                                <td>{item.email}</td>
                                <td>
                                    <button onClick={()=>edit(idx)} disabled={statusFetch} > <Img src={imgEdit} alt="edit" /> </button>
                                </td>
                                <td>
                                    <button onClick={()=>remove(item)} disabled={statusFetch} > <Img className="red" src={imgTrash} alt="delete" /> </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
            {
                modal.value && <Popup key={'TablePersons'} cancelCallBack={cancelCallBack} aceptCallback={aceptCallback} > {cuerpoPopup[modal.type]} </Popup>
            }
        </Table>
    );
}

export default TablePersons;
export {TablePersons};