import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchClasses, fetchDeleteClasses, fetchPostClasses, fetchUpdateClasses } from "../../store/module/classesStore";
import { Div } from "../../styled/style";

import Alert from "../Alert";
import Popup from "../Popup/Popup";
import InputForm from "../InputForm";
import TableComponent from "../Table";

function DataClasses() {

    const dispatch = useDispatch();
    const classes = useSelector((state:any) => state.classes);

    const [modal,setModal] = useState({type:"", value:false, data:{id:0,names:""}});

    useEffect(() => {
        const promise = dispatch(fetchClasses());
      return () => {
        promise.abort();
      }
    }, []);

    const addClasses = async (name:string) => {
        return await dispatch(fetchPostClasses(name));
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
                return dispatch(fetchUpdateClasses(modal.data));
            case "delete":
                return dispatch(fetchDeleteClasses({id:modal.data.id}));
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
                <TableComponent edit={edit} remove={remove} data={classes.data} />
            </Div>
            <Alert />
            {
                modal.value && <Popup setModal={setModal} aceptCallback={aceptCallback} > {cuerpoPopup[modal.type]} </Popup>
            }
        </div>
    );
}

export default DataClasses;