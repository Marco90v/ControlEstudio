import { useState } from "react";
import { Div } from "../../styled/style";
import { useDeleteProfessionMutation, useGetProfessionQuery, usePostProfessionMutation, useUpdateProfessionMutation } from "../../store/apis/professionApi";
import { InputForm, Popup, TableComponent } from "../";

function DataProfession(){
    
    const [modal,setModal] = useState({type:"", value:false, data:{id:0,names:""}});
    const { data: profession=[] } = useGetProfessionQuery();
    const [postProfession] = usePostProfessionMutation();
    const [updateProfession] = useUpdateProfessionMutation();
    const [deleteProfession] = useDeleteProfessionMutation();

    const addClasses = async (names:{names:string}) => {
        postProfession(names);
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
                updateProfession(modal.data);
                break;
            case "delete":
                deleteProfession({id:modal.data.id});
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
            <InputForm addCallBack={addClasses} title={"Profesiones"} />
            <Div>
                <TableComponent edit={edit} remove={remove}  data={profession} />
            </Div>
            {
                modal.value && <Popup cancelCallBack={cancelCallBack} aceptCallback={aceptCallback} > {cuerpoPopup[modal.type]} </Popup>
            }
        </div>
    );
}

export default DataProfession;
export {DataProfession};