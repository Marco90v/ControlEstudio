import imgEdit from "../../assets/edit-solid-24.png";
import imgTrash from "../../assets/trash-alt-solid-24.png";
import { useEffect, useState } from "react";
import { COLORS } from "../../ultil/const";
import { Person } from "../../__generated__/graphql";
import { filterKeyColumn } from "../../ultil";

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
        <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-200 dark:bg-gray-700">
                                <tr>
                                    {
                                        columnsHeaders.map((item:string,index:number)=>(
                                            <th scope="col" className="px-4 py-3 text-start font-bold text-xs text-gray-500 uppercase dark:text-gray-400" key={index}>{item}</th>
                                        ))
                                    }
                                    <th scope="col" className="px-6 py-3 font-bold text-xs text-gray-500 uppercase dark:text-gray-400 text-center">Editar</th>
                                    <th scope="col" className="px-6 py-3 font-bold text-xs text-gray-500 uppercase dark:text-gray-400 text-center">Eliminar</th>
                                </tr>
                            </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {
                                    data && data.map((item:classe | Person, idx)=>{
                                        return(
                                            <tr key={item.id} className="hover:bg-gray-200 odd:bg-gray-100 transition-all duration-300">
                                                {
                                                    Object.entries(item).map(([key,value], idx)=>{
                                                        if(filterKeyColumn(key)){
                                                            return <td key={idx} className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{value}</td>
                                                        }
                                                    })
                                                }
                                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 text-center">
                                                    <button
                                                        className="group/edit btn-transparent"
                                                        onClick={()=>edit(item)} disabled={status}
                                                    >
                                                        <img
                                                            className={`transition-all duration-300 rounded ${COLORS.green700} group-hover/edit:bg-green-600 group-disabled/edit:bg-gray-600`}
                                                            src={imgEdit} alt="edit"
                                                        />
                                                    </button>
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 text-center">
                                                    <button
                                                        className="group/delete btn-transparent"
                                                        onClick={()=>remove(item)} disabled={status}
                                                    >
                                                        <img
                                                            className={`transition-all duration-300 rounded ${COLORS.red700} group-hover/delete:bg-red-600 group-disabled/delete:bg-gray-600`}
                                                            src={imgTrash} alt="delete"
                                                        />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TableComponent;
export {TableComponent};