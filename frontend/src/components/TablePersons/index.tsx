import { Img, Table } from "../../styled/style";
import imgEdit from "../../assets/edit-solid-24.png";
import imgTrash from "../../assets/trash-alt-solid-24.png";

function TablePersons({persons, edit, remove, wait}:any){
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
                                    <td>
                                        <button onClick={()=>edit(idx)} disabled={wait} > <Img src={imgEdit} alt="edit" /> </button>
                                    </td>
                                    <td>
                                        <button onClick={()=>remove(item)} disabled={wait} > <Img className="red" src={imgTrash} alt="delete" /> </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
    );
}

export { TablePersons };