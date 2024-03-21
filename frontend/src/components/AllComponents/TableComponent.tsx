import { Img, Table } from "../../styled/style";
import imgEdit from "../../assets/edit-solid-24.png";
import imgTrash from "../../assets/trash-alt-solid-24.png";
import { useEffect, useState } from "react";

type props = {
    edit:Function,
    remove:Function,
    loading: boolean[],
    columnsHeaders?:string[],
    data:any[] | undefined | null
}

function TableComponent({edit,remove,loading,columnsHeaders=["Nombre"],data=[]}:props){
    const [status, setStatus] = useState(false)
    useEffect(() => {
        let status = false
        loading.forEach(element => {
            if(element) status = true
        });
        setStatus(status)
      return () => {}
    }, loading)
    
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
                    data && data.map((item:classe)=>{
                        return(
                            <tr key={item.id}>
                                <td>{item.names}</td>
                                <td>
                                    <button onClick={()=>edit(item)} disabled={status}>
                                        <Img src={imgEdit} alt="edit" />
                                    </button>
                                </td>
                                <td  >
                                    <button onClick={()=>remove(item)} disabled={status}>
                                        <Img className="red" src={imgTrash} alt="delete" />
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}

export default TableComponent;
export {TableComponent};