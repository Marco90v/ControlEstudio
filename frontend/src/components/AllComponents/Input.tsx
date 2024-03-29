import { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
interface props{
    type: "text" | "number" | "email" | "date" | "password" | "file",
    id: string,
    name: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined,
    value?: string | number | undefined,
    className?: string
    disabled?: boolean
}

function Input({className, ...rest}:props){
    if(rest.type !== "password"){
        return(
            <input
                className={`focus:outline-none px-2 py-1 bg-white border border-solid border-gray-200 rounded focus:border-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed ${className}`}
                {...rest}
            />
        )
    }else{
        // Cambia de iciono y de tipo de input para mostrar o ocultar la contraseña
        const [show, setShow] = useState(false)
        const changeShow = () => {
            if(!rest.disabled){
                setShow((e)=>!e)
            }
        }
        return(
            <div className="relative inline">
                <input
                    className={`px-2 py-1 bg-white border border-solid border-gray-400 rounded disabled:bg-gray-200 disabled:cursor-not-allowed ${className}`}
                    {...rest}
                    type={show ? "text" : "password"}
                />
                {
                    show ? 
                    <BiHide className="absolute top-0 bottom-0 right-2 size-5 cursor-pointer disabled:cursor-not-allowed" onClick={changeShow} />
                    :
                    <BiShow className="absolute top-0 bottom-0 right-2 size-5 cursor-pointer disabled:cursor-not-allowed" onClick={changeShow} />
                }
            </div>
        )
    }
}
export default Input
export { Input }