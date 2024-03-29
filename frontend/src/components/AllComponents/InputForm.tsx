import { useEffect, useState } from "react";
import { ApolloError } from "@apollo/client";
import { COLORS } from "../../ultil/const";
import Input from "./Input";
import Button from "./Button";

type props = {
    addCallBack: Function,
    title:string,
    loading:boolean[],
    error: (ApolloError | undefined)[]
}

const initialStatus = {
    status:false,
    msg:"",
    bgColor:""
}

function InputForm({addCallBack,title, loading, error}:props) {

    const [name,setName] = useState({names:""});
    const [status,setStatus] = useState(initialStatus);

    useEffect(() => {
        let status = false
        let msg = ""
        let bgColor = ""
        loading.forEach(element => {
            if(element) {
                status = true
                msg = "Procesando datos"
                bgColor = COLORS.yellow500
            }
        });
        setStatus({status, msg, bgColor})
        return () => {}
    }, loading)

    useEffect(() => {
        let status = false
        let msg = ""
        let bgColor = ""
        error.forEach(element => {
            if(element) {
                status = true
                msg = element.message
                bgColor = COLORS.red700
            }
        });
        setStatus({status, msg, bgColor})
        setTimeout(() => {
            setStatus(initialStatus)
        }, 5000);
        return () => {}
    }, error)
    
    const changeInputName = (e:any) => {
        setName({names:e.target.value});
    }

    const add = (e:any) => {
        e.preventDefault();
        if(name.names !== ""){
            addCallBack(name);
        }else{
            setStatus({status:true, msg:"Ingrese clase/materia", bgColor:COLORS.yellow500})
            setTimeout(() => {
                setStatus(initialStatus)
            }, 3000);
        }
    }

    return(
        <div>
            <form
                className="grid grid-cols-[auto_auto_auto] grid-rows-2 justify-center items-center p-5 gap-x-2"
                onSubmit={add}
            >
                <label className="font-bold" htmlFor="">{title}</label>
                <Input id="inputName" name="inputName" type="text" value={name.names} onChange={changeInputName} />
                <Button type="submit" color="green" className="font-semibold text-white" disabled={status.status}>Agregar</Button>
                {
                    status.status && (
                        <span
                            className={`col-span-3 text-center rounded p-1 mt-2 ${status.bgColor}`}
                        >
                            {status.msg}
                        </span>
                    )
                }
            </form>
        </div>
    )
}

export default InputForm;
export {InputForm};