import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { add, fetchClasses, remove } from "../../store/module/classesStore";
import imgEdit from "../../assets/edit-solid-24.png";
import imgTrash from "../../assets/trash-alt-solid-24.png";

const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    column-gap: 10px;
    input{
        padding: 5px;
        border-radius: 5px;
        border: 1px solid grey;
    }
`;

const Button = styled.button`
    background-color: green;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid green;
    font-weight: bold;
`;

const Div = styled.div`
    display: flex;
    justify-content: center;
`;

const Table = styled.table`
    width: 500px;
    border-spacing: 0;
    thead > tr{
        color: white;
        background-color: black;
    }
    th{
        padding: 5px;
    }
    tbody > tr:nth-child(2n+1){
        background-color: #e1e1e1;
    }
    td{
        padding: 5px;
    }
    tbody > tr > td:nth-child(n+2){
        text-align: center;
    }
    tbody > tr:hover{
        background-color: #d1d1d1;
    }
`;

const Img = styled.img`
    background-color: green;
    border-radius: 5px;
    cursor: pointer;
    &.red{
        background-color: red;
    }
`;

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