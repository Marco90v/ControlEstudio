import { useEffect, useState } from "react";
import { Popup, TableComponent } from "../";
import { useLazyQuery, useMutation } from "@apollo/client";
import useStorePersons from "../../zustanStore/persons";
import { DELETE_PERSON, GET_PERSON_BY_ROLE } from "../../ultil/const";
import DeletePopUp from "./DeletePopUp";

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

    const columnsHeaders=["Nombres", "Apellidos", "Correo", "Telefono" ]
    

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

    const edit = (data:any) => {
        if(dataGetPersonByRole?.getPersonByRole){
            const {__typename, ...rest} = data
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
        "delete": <DeletePopUp value={modal.data.names} textIni={"¿Desea eliminar a:"} textFin={"?"} />,
        "scoresDelete": <p className="text-center">Esta acción esta prohibida en este modulo</p>
    };

    const remove = (data:any) => {
        if(scores){
            setModal({type:"scoresDelete",value:true, data});
        }else{
            setModal({type:"delete",value:true, data});
        }
    }

    return(
        <>
            <TableComponent
                edit={edit}
                remove={remove}
                loading={[loadingGetPersonByrole || loadingDeletePersonByID]}
                data={data}
                columnsHeaders={columnsHeaders}
            />
            {
                modal.value && (
                    <Popup
                        key={'TablePersons'}
                        cancelCallBack={cancelCallBack}
                        aceptCallback={aceptCallback}
                    >
                        {cuerpoPopup[modal.type]}
                    </Popup>
                )
            }
        </>
    );
}

export default TablePersons;
export {TablePersons};