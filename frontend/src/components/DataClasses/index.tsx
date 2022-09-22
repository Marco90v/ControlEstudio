import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { add, fetchClasses, remove } from "../../store/module/classesStore";
import { Button, Div, Form, Img, Table } from "../../styled/style";

import imgEdit from "../../assets/edit-solid-24.png";
import imgTrash from "../../assets/trash-alt-solid-24.png";

type classe = {id:number,names:string}

function DataClasses() {

    const dispatch = useDispatch();
    const classes = useSelector((state:any) => state.classes);

    const [name,setName] = useState("");

    useEffect(() => {
        if(classes.status === "") dispatch(fetchClasses())
      return () => {}
    }, []);

    const changeInputName = (e:any) => {
        setName(e.target.value);
    }

    const addClasses = (e:any) => {
        e.preventDefault();
        dispatch(add(name));
    }

    const edit = (id:number) => {
        console.log(id);
    }

    const delite = (id:number) => {
        // console.log(id);
        dispatch(remove(id));
    }

    return(
        <div>
            <div>
                <Form onSubmit={addClasses}>
                    <label htmlFor="">Clase/Materia</label>
                    <input type="text" name="classes" id="classes" onChange={changeInputName} />
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
                                        <td onClick={()=>edit(item.id)} ><Img src={imgEdit} alt="edit" /></td>
                                        <td onClick={()=>delite(item.id)} ><Img className="red" src={imgTrash} alt="delete" /></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Div>
        </div>
    );
}

export default DataClasses;