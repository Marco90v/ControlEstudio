import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchClasses, fetchDeleteClasses, fetchPostClasses } from "../../store/module/classesStore";
import { Button, Div, Form, Img, Table } from "../../styled/style";

import imgEdit from "../../assets/edit-solid-24.png";
import imgTrash from "../../assets/trash-alt-solid-24.png";
import Alert from "../Alert";
import Popup from "../Popup/Popup";

type classe = {id:number,names:string}

function DataClasses() {

    const dispatch = useDispatch();
    const classes = useSelector((state:any) => state.classes);

    const [name,setName] = useState({names:""});
    const [alert,setAlert] = useState({type:"", value:false, data:{id:0,names:""}});
    // const [typeAlert,setAlert] = useState(false);

    useEffect(() => {
        // if(classes.status === "" && classes.data.length === 0) dispatch(fetchClasses())
        const promise = dispatch(fetchClasses());
      return () => {
        promise.abort();
      }
    }, []);

    const changeInputName = (e:any) => {
        setName({names:e.target.value});
    }

    const addClasses = async (e:any) => {
        e.preventDefault();
        if(name.names !== ""){
            const res = await dispatch(fetchPostClasses(name));
            if(res.meta.requestStatus === "fulfilled") setName({names:""});
        }else{
            console.log("Ingrese nombre de la materia");
        }
    }


    const edit = (data:classe) => {
        // console.log(data);
        // setAlert(!alert);
        setAlert({type:"edit",value:true, data});
    }

    const delite = (data:classe) => {
        // dispatch(fetchDeleteClasses({id}));
        // dispatch(fetchDeleteClasses({data.id}));
        setAlert({type:"delete",value:true, data});
    }

    const aceptCallback = () => {
        switch (alert.type) {
            case "edit":
                return console.log(alert.data)
            case "delete":
                return dispatch(fetchDeleteClasses({id:alert.data.id}));
        }
    }

    const changeInputEdit = (e:any)=>{
        setAlert({...alert,data:{...alert.data,names:e.target.value}})
    }

    const cuerpo = () => {
        switch (alert.type) {
            case "edit":
                return <input type="text" value={alert.data.names} onChange={changeInputEdit} />
            case "delete":
                return <p>¿Desea eliminar la Clases/Materia {alert.data.names}?</p>
            default:
                <p></p>;
        }
    }

    return(
        <div>
            <div>
                <Form onSubmit={addClasses}>
                    <label htmlFor="">Clase/Materia</label>
                    <input type="text" name="classes" id="classes" onChange={changeInputName} value={name.names} />
                    <Button type="submit">Agregar</Button>
                </Form>
            </div>
            <Div>
                <Table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            classes.data.map((item:classe)=>{
                                return(
                                    <tr key={item.id}>
                                        <td>{item.names}</td>
                                        <td onClick={()=>edit(item)} ><Img src={imgEdit} alt="edit" /></td>
                                        <td onClick={()=>delite(item)} ><Img className="red" src={imgTrash} alt="delete" /></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Div>
            <Alert />
            {
                alert.value && <Popup setAlert={setAlert} aceptCallback={aceptCallback} > {cuerpo()} </Popup>
            }
        </div>
    );
}

export default DataClasses;