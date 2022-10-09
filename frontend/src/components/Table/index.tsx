import { Img, Table } from "../../styled/style";
import imgEdit from "../../assets/edit-solid-24.png";
import imgTrash from "../../assets/trash-alt-solid-24.png";

type classe = {id:number,names:string}

function TableComponent({edit,remove,columnsHeaders,data}:any){
    return(
        <Table>
            <thead>
                <tr>
                    {columnsHeaders.map((item:string,index:number)=><th key={index}>{item}</th>)}
                    <th>Editar</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((item:classe)=>{
                        return(
                            <tr key={item.id}>
                                <td>{item.names}</td>
                                <td onClick={()=>edit(item)} ><Img src={imgEdit} alt="edit" /></td>
                                <td onClick={()=>remove(item)} ><Img className="red" src={imgTrash} alt="delete" /></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}

export default TableComponent