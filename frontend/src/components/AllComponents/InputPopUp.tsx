import { ChangeEvent } from "react"

interface props{
    type:string,
    value:any,
    actionChange:(event: ChangeEvent<HTMLInputElement>)=> void,
    identify:string,
    style?:string,
    disabled?:boolean,
    otherAtribute?:React.InputHTMLAttributes<HTMLInputElement>,
}

function InputPopUp({type, value, actionChange, style, identify, disabled=false, otherAtribute}:props){
    return(
        <input
            className={`p-1 w-[90%] border border-solid border-gray-200 rounded focus:outline-none focus:border-gray-400 ${style}`}
            type={type}
            value={value}
            name={identify}
            id={identify}
            onChange={actionChange}
            disabled={disabled}
            {...otherAtribute}
        />
    )
}

export default InputPopUp;
export {InputPopUp};