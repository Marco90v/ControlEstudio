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
import { gql } from "../../__generated__";
import { useLazyQuery, useMutation } from "@apollo/client";
import useStorePersons from "../../zustanStore/persons";
import useStoreTeacherClasses from "../../zustanStore/teacherClasse";

const GET_PERSON_BY_ROLE = gql(`
    query GetPersonByRole($role: Int) {
        getPersonByRole(role: $role) {
            id
            names
            lastNames
            sex
            email
            phone
            photo
            role
        }
    }
`)

const DELETE_TEACHER_BY_PERSON = gql(`
    mutation DeleteTeacherByIdPerson($idPersons: Int) {
        deleteTeacherByIdPerson(IdPersons: $idPersons)
    }
`)

const DELETE_PERSON = gql(`
    mutation DeletePerson($deletePersonId: Int) {
        deletePerson(id: $deletePersonId)
    }
`)

function TablePersons({role, deleteChildren, preCarga=[], scores=false}:any){
    const statusFetch = false;

    const {data:dataPersons, setPersons, selectPerson, clearPersons} = useStorePersons((state)=>state)
    const {clearTeacherClasses} = useStoreTeacherClasses((state)=>state)


    const [getPersonByRole, { loading, error, data, refetch:refetchPerson } ]= useLazyQuery(GET_PERSON_BY_ROLE);
    const [deleteTeacherByPerson, { data:dataDelete, reset:resetDelete }] = useMutation(DELETE_TEACHER_BY_PERSON)
    const [deletePersonByID, { data:dataPersonDelete, reset:resetPersonDelete }] = useMutation(DELETE_PERSON)
    
    const [modal,setModal] = useState({type:"", value:false, data:{id:0,names:""}});
    

    useEffect(() => {
        role > 0 && getPersonByRole({
            variables:{
                role
            }
        });
    return () => {
    }
    }, [role]);

    const edit = (idx:number) => {
        if(data?.getPersonByRole){
            const {__typename, ...rest} = data?.getPersonByRole[idx]
            selectPerson({...rest, idPerson:rest.id, name:rest.names})
        }
    }

    const deletePerson = (idx:number) => {
        deleteTeacherByPerson({
            variables:{
                idPersons:idx
            }
        })
        deletePersonByID({
            variables:{
                deletePersonId:idx
            }
        })
        refetchPerson()
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

    const remove = (data:any) => {
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
                    // dataPersons.persons.map((item,idx:number)=>{
                        data && data?.getPersonByRole.map((item,idx:number)=>{
                        return(
                            <tr key={idx}>
                                <td>{item.names}</td>
                                <td>{item.lastNames}</td>
                                <td>{item.phone.toString()}</td>
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