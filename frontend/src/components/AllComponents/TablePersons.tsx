import { useEffect, useState } from "react";
import { Img, Table } from "../../styled/style";
import { Popup } from "../";
import imgTrash from "../../assets/trash-alt-solid-24.png";
import imgEdit from "../../assets/edit-solid-24.png";
import { useLazyQuery, useMutation } from "@apollo/client";
import useStorePersons from "../../zustanStore/persons";
import { DELETE_PERSON, GET_PERSON_BY_ROLE } from "../../ultil/const";

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
    role: number,
    deleteChildren:  React.MutableRefObject<any>,
    preCarga?:Person[],
    scores?:boolean,
}

function TablePersons({role, deleteChildren, preCarga=[], scores=false}:props){
    
    const { selectPerson } = useStorePersons((state)=>state)
    const [getPersonByRole, { loading:loadingGetPersonByrole, data:dataGetPersonByRole, refetch:refetchPersonByRole } ]= useLazyQuery(GET_PERSON_BY_ROLE);
    const [deletePersonByID, { loading:loadingDeletePersonByID }] = useMutation(DELETE_PERSON)
    const [modal,setModal] = useState({type:"", value:false, data:{id:0,names:""}});
    const loading = loadingGetPersonByrole || loadingDeletePersonByID

    const data = (preCarga.length>0) ? preCarga : 
                    (dataGetPersonByRole && dataGetPersonByRole?.getPersonByRole) ? 
                    dataGetPersonByRole.getPersonByRole : 
                    []

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
        if(dataGetPersonByRole?.getPersonByRole){
            const {__typename, ...rest} = dataGetPersonByRole?.getPersonByRole[idx]
            selectPerson({...rest, idPerson:rest.id, name:rest.names})
        }else{
            selectPerson({...preCarga[0]})
        }
    }
    const deletePerson = (idx:number) => {
        deletePersonByID({
            variables:{
                deletePersonId:idx
            }
        })
        deleteChildren?.current?.deleteChildren(idx)
        refetchPersonByRole()
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
                        data.map((item,idx:number)=>{
                        return(
                            <tr key={idx}>
                                <td>{item.names}</td>
                                <td>{item.lastNames}</td>
                                <td>{item.phone.toString()}</td>
                                <td>{item.email}</td>
                                <td>
                                    <button onClick={()=>edit(idx)} disabled={loading} >
                                        <Img src={imgEdit} alt="edit" />
                                    </button>
                                </td>
                                <td>
                                    <button onClick={()=>remove(item)} disabled={loading} >
                                        <Img className="red" src={imgTrash} alt="delete" />
                                    </button>
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