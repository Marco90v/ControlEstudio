import { useEffect, useState } from "react";
import { Button, Form } from "../../styled/style"
import { ApolloError } from "@apollo/client";

type props = {
    addCallBack: Function,
    title:string,
    loading:boolean[],
    error: (ApolloError | undefined)[]
}

function InputForm({addCallBack,title, loading, error}:props) {

    const [name,setName] = useState({names:""});
    const [status,setStatus] = useState({status:false, msg:""});

    useEffect(() => {
        let status = false
        let msg = ""
        loading.forEach(element => {
            if(element) {
                status = true
                msg = "Procesando datos"
            }
        });
        setStatus({status, msg})
        return () => {}
    }, loading)

    useEffect(() => {
        let status = false
        let msg = ""
        error.forEach(element => {
            if(element) {
                status = true
                msg = element.message
            }
        });
        setStatus({status, msg})
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
            console.log("Ingrese nombre de la materia");
        }
    }

    return(
        <div>
            <Form onSubmit={add}>
                <label htmlFor="">{title}</label>
                <input type="text" name="inputName" id="inputName" onChange={changeInputName} value={name.names} />
                <Button type="submit" disabled={status.status}>Agregar</Button>
                {status.status && <span>{status.msg}</span> }
            </Form>
        </div>
    )
}

export default InputForm;
export {InputForm};