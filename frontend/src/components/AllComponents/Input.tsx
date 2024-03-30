import { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
interface props{
    type: "text" | "number" | "email" | "date" | "password" | "file",
    id: string,
    name: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined,
    value?: string | number | undefined,
    className?: string,
    disabled?: boolean,
    otherAtributes?: React.InputHTMLAttributes<HTMLInputElement> | undefined
}

const styleBase = "focus:outline-none px-2 py-1 bg-white border border-solid border-gray-200 rounded focus:border-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"

function Input({className, otherAtributes, ...rest}:props){
    if(rest.type !== "password"){
        return(
            <input
                className={`${styleBase} ${className}`}
                {...rest}
                {...otherAtributes}
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
                    className={`${styleBase} ${className}`}
                    {...rest}
                    type={show ? "text" : "password"}
                    {...otherAtributes}
                />
                {
                    show ? 
                    <BiHide className="absolute inset-y-0 right-0 size-5 h-full mr-2 cursor-pointer disabled:cursor-not-allowed" onClick={changeShow} />
                    :
                    <BiShow className="absolute inset-y-0 right-0 size-5 h-full mr-2 cursor-pointer disabled:cursor-not-allowed" onClick={changeShow} />
                }
            </div>
        )
    }
}
export default Input
export { Input }