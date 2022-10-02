import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus } from "../../store/module/classesStore";
import { FloatAlert } from "../../styled/style";

enum completed {
    Succeeded = "succeeded",
    Added = "added",
    Removed = "removed"
}

const status:any = {
    "": {type:"blank",msg:''},
    "loading": {type:"warning",msg:"Cargando datos"},
    "succeeded": {type:"success",msg:"Datos cargados"},
    "failed": {type:"error",msg:"Error al cargar datos"},
    "adding": {type:"warning",msg:"Agregando clase/materia"},
    "added": {type:"success",msg:"Clase/Materia agregada"},
    "errorAdd": {type:"error",msg:"Error al agregar clase/materia"},
    "deleting": {type:"warning",msg:"Eliminando clase/materia"},
    "removed": {type:"success",msg:"Clase/Materia eliminada"},
    "errorRemove": {type:"error",msg:"Error al eliminar clase/materia"},
    "updating": {type:"warning",msg:"Actualizando clase/materia"},
    "updated": {type:"success",msg:"Clase/Materia actualizada"},
    "errorUpdate": {type:"error",msg:"Error al actualizar clase/materia"},
}
function Alert (){
    const statusClasses = useSelector((state:any) => state.classes.status);
    const dispatch = useDispatch();
    const [alert, setAlert] = useState({type:"blank",msg:''});

    useEffect(() => {
        if(statusClasses !== ""){
            setAlert(status[statusClasses]);
            if(Object.values(completed).includes(statusClasses)){
                setTimeout(()=>setAlert({...alert,type:"blank"}),3000);
                dispatch(changeStatus(""));
                // dispatch(add(""));
            }
        }
    }, [statusClasses])
    
    return(
        <FloatAlert className={alert.type}>
            <span>{alert.msg}</span>
        </FloatAlert>
    );
}

export default Alert;