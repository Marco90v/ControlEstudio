import { useEffect, useState } from "react";
import { ApolloError } from "@apollo/client";
import { COLORS } from "../../ultil/const";
import Input from "./Input";
import Button from "./Button";
import useStoreLoading from "../../zustanStore/loading";
import { useShallow } from "zustand/react/shallow";

type props = {
    addCallBack: Function,
    title:string,
    // loading:boolean[],
    // error?: (ApolloError | undefined)[]
    // error?: ({message:string} | null)[]
}

const initialStatus = {
    msg:"",
    bgColor:""
}

function InputForm({addCallBack,title}:props) {

    const [name,setName] = useState({names:""});
    const [status,setStatus] = useState(initialStatus);

    const {loading, error} = useStoreLoading(useShallow((state=>({
        loading: state.loading,
        error: state.error
    }))))

    useEffect(() => {
        let msg = ""
        let bgColor = ""
        if(loading) {
            msg = "Procesando datos"
            bgColor = COLORS.yellow500
            setStatus({msg, bgColor})
        }else{
            setStatus(initialStatus)
        }
        return () => {}
    }, [loading])

    useEffect(() => {
        let msg = ""
        let bgColor = ""
        if(error) {
            console.log(error)
            msg = error.message || ""
            bgColor = COLORS.red700
            setStatus({msg, bgColor})
            setTimeout(() => {
                setStatus(initialStatus)
            }, 5000);
        }
        return () => {}
    }, [error])
    
    const changeInputName = (e:any) => {
        setName({names:e.target.value});
    }

    const add = (e:any) => {
        e.preventDefault();
        if(name.names !== ""){
            addCallBack(name);
        }else{
            setStatus({msg:"Ingrese clase/materia", bgColor:COLORS.yellow500})
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
                <Button type="submit" color="green" className="font-semibold text-white">Agregar</Button>
                {
                    (loading || error || status.msg !== "") && (
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