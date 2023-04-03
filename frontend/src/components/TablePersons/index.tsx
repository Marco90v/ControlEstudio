import { Img, Table } from "../../styled/style";

import imgEdit from "../../assets/edit-solid-24.png";
import imgTrash from "../../assets/trash-alt-solid-24.png";

function TablePersons({persons, edit, remove}:any){
    return(
        <Table>
                <thead>
                    <tr>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Telefono</th>
                        <th>Correo</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        persons.map((item:person,idx:number)=>{
                            return(
                                <tr key={idx}>
                                    <td>{item.names}</td>
                                    <td>{item.lastNames}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.email}</td>
                                    <td onClick={()=>edit(idx)} ><Img src={imgEdit} alt="edit" /></td>
                                    <td onClick={()=>remove(item.id)} ><Img className="red" src={imgTrash} alt="delete" /></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
    );
}

export default TablePersons;