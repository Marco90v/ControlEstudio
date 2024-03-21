import { useState } from "react";
import { Div } from "../../styled/style";
import {Popup, InputForm, TableComponent} from "../";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CLASSE, DELETE_CLASSE, GET_ClASSES, UPDATE_CLASSE } from "../../ultil/const";


function DataClasses() {

    const [modal,setModal] = useState({type:"", value:false, data:{id:0,names:""}});

    const { data, refetch } = useQuery(GET_ClASSES);

    const [add, { loading:loadingAdd, error:errorAdd }] = useMutation(ADD_CLASSE)
    const [update, { loading:loadingUpdate, error:errorUpdate }] = useMutation(UPDATE_CLASSE)
    const [deleteClasse, { loading:loadingDelete, error:errorDelete }] = useMutation(DELETE_CLASSE)
    
    const addClasses = (names:{names:string}) => {
        add({
                variables:{
                    dataClasse:{...names}
                }
        })
        refetch()
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
                update({
                    variables:{
                        dataClasse:{...modal.data}
                    }
                })
                refetch()
                break;
            case "delete":
                deleteClasse({
                    variables:{
                        deleteClassesId:modal.data.id
                    }
                })
                refetch()
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
            <InputForm
                addCallBack={addClasses}
                title={"Clase/Materia"}
                loading={[loadingAdd, loadingUpdate, loadingDelete]}
                error={[errorAdd, errorUpdate,errorDelete]}
            />
            <Div>
                <TableComponent
                    edit={edit}
                    remove={remove}
                    loading={[loadingAdd, loadingUpdate, loadingDelete]}
                    data={data?.allClasses}
                />
            </Div>
            {
                modal.value && <Popup cancelCallBack={cancelCallBack} aceptCallback={aceptCallback} > {cuerpoPopup[modal.type]} </Popup>
            }
        </div>
    );
}

export default DataClasses;
export {DataClasses};