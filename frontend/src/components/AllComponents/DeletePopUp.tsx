import { ChangeEvent } from "react"

interface props{
    value:any,
    textIni:string,
    textFin:string,
    style?:string
}

function DeletePopUp({value,textIni, textFin, style}:props){
    return(
        <p
            className={`text-center px-2 ${style}`}
        >
            {textIni} <strong>"{value}"</strong>{textFin}
        </p>
    )
}

export default DeletePopUp;
export {DeletePopUp};