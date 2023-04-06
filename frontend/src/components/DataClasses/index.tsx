import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchClasses, fetchDeleteClasses, fetchPostClasses, fetchUpdateClasses } from "../../store/module/classesStore";
import { Div } from "../../styled/style";

// import Alert from "../Alert";
import {Alert} from "../index"
import {Popup, InputForm, TableComponent} from "../";
import { useDeleteClassesMutation, useGetClassesQuery, usePostClassesMutation, useUpdateClassesMutation } from "../../store/apis/classesApi";

function DataClasses() {

    const [modal,setModal] = useState({type:"", value:false, data:{id:0,names:""}});
    const { data: classes=[] } = useGetClassesQuery();
    const [postClasses] = usePostClassesMutation();
    const [updateClasses] = useUpdateClassesMutation();
    const [deleteClasses] = useDeleteClassesMutation();

    const addClasses = async (names:{names:string}) => {
        postClasses(names);
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
                updateClasses(modal.data);
                break;
            case "delete":
                deleteClasses({id:modal.data.id});
                break;
        }
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
            <Alert />
            {
                modal.value && <Popup setModal={setModal} aceptCallback={aceptCallback} > {cuerpoPopup[modal.type]} </Popup>
            }
        </div>
    );
}

// export default DataClasses;

export {DataClasses}