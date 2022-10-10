import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeleteProfession, fetchGetProfession, fetchPostProfession, fetchUpdateProfession } from "../../store/module/professionStore";
import { Div } from "../../styled/style";
import Alert from "../Alert";
import InputForm from "../InputForm";
import Popup from "../Popup/Popup";
import TableComponent from "../Table";

// type classe = {id:number,names:string}

function DataProfession(){
    const dispatch = useDispatch();
    const profession = useSelector((state:any) => state.profession);

    const [modal,setModal] = useState({type:"", value:false, data:{id:0,names:""}});

    useEffect(() => {
        const promise = dispatch(fetchGetProfession());
      return () => {
        promise.abort();
      }
    }, []);

    const addClasses = async (name:string) => {
        return await dispatch(fetchPostProfession(name));
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
                return dispatch(fetchUpdateProfession(modal.data));
            case "delete":
                return dispatch(fetchDeleteProfession({id:modal.data.id}));
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
            <InputForm addCallBack={addClasses} title={"Profesiones"} />
            <Div>
                <TableComponent edit={edit} remove={remove}  data={profession.data} />
            </Div>
            <Alert />
            {
                modal.value && <Popup setModal={setModal} aceptCallback={aceptCallback} > {cuerpoPopup[modal.type]} </Popup>
            }
        </div>
    );
}
export default DataProfession;