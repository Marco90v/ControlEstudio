import { memo } from "react";
import { BiEdit, BiSolidTrashAlt } from "react-icons/bi";
import { filterKeyColumn } from "../../ultil";
import Button from "./Button";

type props = {
    edit:Function,
    remove:Function,
    columnsHeaders?:string[],
    data:any[] | undefined | null
}

const ColumnData = memo( function ColumnData({idx, value}:{idx:number, value:any}) {
    return <td key={idx} className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{value}</td>
})

function TableComponent({edit,remove,columnsHeaders=["Nombre"],data=[]}:props){
    return(
        <div className="flex flex-col max-w-[90%] ml-auto mr-auto mt-8">
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
                                    data && data.map((item:{id:number})=>{
                                        return(
                                            <tr key={item.id} className="hover:bg-gray-200 odd:bg-gray-100 transition-all duration-300">
                                                {
                                                    Object.entries(item).map(([key,value], idx)=>{
                                                        if(filterKeyColumn(key)){
                                                            // return <td key={idx} className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{value}</td>
                                                            return <ColumnData key={idx} idx={idx} value={value} />
                                                        }
                                                    })
                                                }
                                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 text-center">
                                                    <Button type="button" color="green" className="text-white px-1" onClick={()=>edit(item)} >
                                                        <BiEdit className="text-xl" />
                                                    </Button>
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 text-center">
                                                    <Button type="button" color="red" className="text-white px-1" onClick={()=>remove(item)} >
                                                        <BiSolidTrashAlt className="text-xl" />
                                                    </Button>
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