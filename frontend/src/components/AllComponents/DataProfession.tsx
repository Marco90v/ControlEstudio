import { useState } from "react";
import { Div } from "../../styled/style";
import { InputForm, Popup, TableComponent } from "../";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROFESSION, DELETE_PROFESSION, GET_PROFESSIONS, UPDATE_PROFESSION } from "../../ultil/const";

function DataProfession(){
    
    const [modal,setModal] = useState({type:"", value:false, data:{id:0,names:""}});

    const { data, refetch } = useQuery(GET_PROFESSIONS);

    const [add, { loading:loadingAdd, error:errorAdd }] = useMutation(ADD_PROFESSION)
    const [update, { loading:loadingUpdate, error:errorUpdate }] = useMutation(UPDATE_PROFESSION)
    const [deleteProfession, { loading:loadingDelete, error:errorDelete }] = useMutation(DELETE_PROFESSION)

    const addProfession = async (names:{names:string}) => {
        add({
            variables:{
                dataProfession:{...names}
            }
        })
        refetch()
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
                update({
                    variables:{
                        dataProfession:{...modal.data}
                    }
                })
                refetch()
                break;
            case "delete":
                deleteProfession({
                    variables:{
                        deleteProfessionId:modal.data.id
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
            <InputForm
                addCallBack={addProfession}
                title={"Profesiones"}
                loading={[loadingAdd, loadingUpdate, loadingDelete]}
                error={[errorAdd, errorUpdate,errorDelete]}
            />
            <Div>
                <TableComponent
                    edit={edit}
                    remove={remove}
                    loading={[loadingAdd, loadingUpdate, loadingDelete]}
                    data={data?.allProfession}
                />
            </Div>
            {
                modal.value && <Popup cancelCallBack={cancelCallBack} aceptCallback={aceptCallback} > {cuerpoPopup[modal.type]} </Popup>
            }
        </div>
    );
}

export default DataProfession;
export {DataProfession};