import { useEffect, useState } from "react";
import { Div } from "../../styled/style";
import { useDeleteClassesMutation, useGetClassesQuery, usePostClassesMutation, useUpdateClassesMutation } from "../../store/apis/classesApi";
import {Popup, InputForm, TableComponent} from "../";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "../../__generated__";
import useStoreClasses from "../../zustanStore/classes";
import { ADD_CLASSE, DELETE_CLASSE, GET_ClASSES, UPDATE_CLASSE } from "../../ultil/const";


// const GET_ClASSES = gql(`
//     query AllClasses {
//         allClasses {
//             id
//             names
//         }
//     }
// `)

// const ADD_CLASSE = gql(`
//     mutation AddClasses($dataClasse: inputClasse) {
//         addClasses(dataClasse: $dataClasse) {
//             id
//             names
//         }
//     }
// `)

// const UPDATE_CLASSE = gql(`
//     mutation UpdateClasses($dataClasse: inputClasse) {
//         updateClasses(dataClasse: $dataClasse) {
//             id
//             names
//         }
//     }
// `)

// const DELETE_CLASSE = gql(`
//     mutation DeleteClasses($deleteClassesId: Int) {
//         deleteClasses(id: $deleteClassesId)
//     }
// `)

function DataClasses() {

    const [modal,setModal] = useState({type:"", value:false, data:{id:0,names:""}});
    // const { data: classes=[] } = useGetClassesQuery();
    // const visibleSide = useStoreSideBar((state)=>state.visibleSideBar)

    const { data } = useQuery(GET_ClASSES);
    const {classes, setClasses, addClasse:AddClasseStore, deleteClasse:dC} = useStoreClasses((state)=>state)

    const [add, { data:resAdd, reset:resetAdd }] = useMutation(ADD_CLASSE)
    const [update, { data:resUpdate, reset:resetUpdate }] = useMutation(UPDATE_CLASSE)
    const [deleteClasse, { data:resDelete, reset:resetDelete }] = useMutation(DELETE_CLASSE)
    // const [ postClasses ] = usePostClassesMutation();
    // const [ updateClasses ] = useUpdateClassesMutation();
    // const [ deleteClasses ] = useDeleteClassesMutation();

    useEffect(() => {
        if (resAdd) {
            const id = resAdd.addClasses?.id
            const names = resAdd.addClasses?.names
            AddClasseStore({id, names})
            resetAdd()
        } 
        return () => {}
    }, [resAdd])

    useEffect(()=>{
        if(resDelete?.deleteClasses){
            dC(resDelete.deleteClasses)
            resetDelete()
        }
    }, [resDelete])
    
    useEffect(() => {
      if(data?.allClasses?.length && data?.allClasses?.length > 0){
        const newData = data.allClasses.map(item => ({id:item?.id, names:item?.names}))
        setClasses(newData)
      }    
      return () => {}
    }, [data])
    
    const addClasses = (names:{names:string}) => {
        // postClasses(names);
        add({
            variables:{
                dataClasse:{...names}
            }
        })
    }

    const edit = (data:classe) => {
        setModal({type:"edit",value:true, data});
    }

    const remove = (data:classe) => {
        setModal({type:"delete",value:true, data});
    }

    const aceptCallback = () => {
        switch (modal.type) {
            case "edit":
                // updateClasses(modal.data);
                update({
                    variables:{
                        dataClasse:{...modal.data}
                    }
                })
                break;
            case "delete":
                // deleteClasses({id:modal.data.id});
                deleteClasse({
                    variables:{
                        deleteClassesId:modal.data.id
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

    const cancelCallBack = () => {
        setModal({type:"", value:false,  data:{id:0,names:""}});
    }

    const changeInputEdit = (e:any)=>{
        setModal({...modal,data:{...modal.data,names:e.target.value}})
    }

    const cuerpoPopup:any = {
        "edit": <input type="text" value={modal.data.names} onChange={changeInputEdit} />,
        "delete": <p>¿Desea eliminar la Clases/Materia <strong>"{modal.data.names}"</strong>?</p>
    };

    return(
        <div>
            <InputForm addCallBack={addClasses} title={"Clase/Materia"} />
            <Div>
                <TableComponent edit={edit} remove={remove} data={classes} />
            </Div>
            {
                modal.value && <Popup cancelCallBack={cancelCallBack} aceptCallback={aceptCallback} > {cuerpoPopup[modal.type]} </Popup>
            }
        </div>
    );
}

export default DataClasses;
export {DataClasses};