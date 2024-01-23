import { useEffect, useState } from "react";
import { Div } from "../../styled/style";
import { useDeleteProfessionMutation, useGetProfessionQuery, usePostProfessionMutation, useUpdateProfessionMutation } from "../../store/apis/professionApi";
import { InputForm, Popup, TableComponent } from "../";
import { gql } from "../../__generated__";
import { useMutation, useQuery } from "@apollo/client";
import useStoreProfessions from "../../zustanStore/profession";

const GET_PROFESSION = gql(`
    query AllProfession {
        allProfession {
            id
            names
        }
    }
`)

const ADD_PROFESSION = gql(`
    mutation AddProfession($dataProfession: inputProfession) {
        addProfession(dataProfession: $dataProfession) {
            id
            names
        }
    }
`)

const UPDATE_PROFESSION = gql(`
    mutation UpdateProfession($dataProfession: inputProfession) {
        updateProfession(dataProfession: $dataProfession) {
            id
            names
        }
    }
`)

const DELETE_PROFESSION = gql(`
    mutation DeleteProfession($deleteProfessionId: Int) {
        deleteProfession(id: $deleteProfessionId)
    }
`)

function DataProfession(){
    
    const [modal,setModal] = useState({type:"", value:false, data:{id:0,names:""}});
    // const profession:any = []
    // const { data: profession=[] } = useGetProfessionQuery();
    // const [postProfession] = usePostProfessionMutation();
    // const [updateProfession] = useUpdateProfessionMutation();
    // const [deleteProfession] = useDeleteProfessionMutation();

    const { data } = useQuery(GET_PROFESSION);
    const {professions, setProfessions, addProfession:AddProfessionStore, deleteProfession:dP} = useStoreProfessions((state)=>state)

    const [add, { data:resAdd, reset:resetAdd }] = useMutation(ADD_PROFESSION)
    const [update, { data:resUpdate, reset:resetUpdate }] = useMutation(UPDATE_PROFESSION)
    const [deleteProfession, { data:resDelete, reset:resetDelete }] = useMutation(DELETE_PROFESSION)


    useEffect(() => {
        if (resAdd) {
            const id = resAdd.addProfession?.id
            const names = resAdd.addProfession?.names
            AddProfessionStore({id, names})
            resetAdd()
        } 
        return () => {}
    }, [resAdd])

    useEffect(()=>{
        if(resDelete?.deleteProfession){
            dP(resDelete.deleteProfession)
            resetDelete()
        }
    }, [resDelete])

    useEffect(() => {
        if(data?.allProfession?.length && data?.allProfession?.length > 0){
          const newData = data.allProfession.map(item => ({id:item?.id, names:item?.names}))
          setProfessions(newData)
        }    
        return () => {}
      }, [data])

    const addProfession = async (names:{names:string}) => {
        // postProfession(names);
        add({
            variables:{
                dataProfession:{...names}
            }
        })
    }

    const edit = (data:profession) => {
        setModal({type:"edit",value:true, data});
    }

    const remove = (data:profession) => {
        setModal({type:"delete",value:true, data});
    }

    const aceptCallback = () => {
        switch (modal.type) {
            case "edit":
                // updateProfession(modal.data);
                update({
                    variables:{
                        dataProfession:{...modal.data}
                    }
                })
                break;
            case "delete":
                // deleteProfession({id:modal.data.id});
                deleteProfession({
                    variables:{
                        deleteProfessionId:modal.data.id
                    }
                })
                break;
        }
        setModal((datos:any)=>{
            return{
                ...datos,
                type:"", value:false,  data:{id:0,names:""}
            }
        });
    }

    const changeInputEdit = (e:any)=>{
        setModal({...modal,data:{...modal.data,names:e.target.value}})
    }

    const cuerpoPopup:any = {
        "edit": <input type="text" value={modal.data.names} onChange={changeInputEdit} />,
        "delete": <p>¿Desea eliminar la Clases/Materia <strong>"{modal.data.names}"</strong>?</p>
    };

    const cancelCallBack = () => {
        setModal({type:"", value:false,  data:{id:0,names:""}});
    }

    return(
        <div>
            <InputForm addCallBack={addProfession} title={"Profesiones"} />
            <Div>
                <TableComponent edit={edit} remove={remove}  data={professions} />
            </Div>
            {
                modal.value && <Popup cancelCallBack={cancelCallBack} aceptCallback={aceptCallback} > {cuerpoPopup[modal.type]} </Popup>
            }
        </div>
    );
}

export default DataProfession;
export {DataProfession};