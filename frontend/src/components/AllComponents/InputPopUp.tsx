import { ChangeEvent } from "react"

interface props{
    type:string,
    value:any,
    actionChange:(event: ChangeEvent<HTMLInputElement>)=> void,
    style?:string
}

function InputPopUp({type, value, actionChange, style}:props){
    return(
        <input
            className={`p-1 w-[90%] border border-solid border-gray-200 rounded focus:outline-none focus:border-gray-400 ${style}`}
            type={type}
            value={value}
            onChange={actionChange}
        />
    )
}

export default InputPopUp;
export {InputPopUp};