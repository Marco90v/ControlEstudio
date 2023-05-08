import { useState } from "react";
import { Button, Form } from "../../styled/style"

type props = {
    addCallBack: Function,
    title:string
}

function InputForm({addCallBack,title}:props) {

    const [name,setName] = useState({names:""});

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
                <Button type="submit">Agregar</Button>
            </Form>
        </div>
    )
}

export default InputForm;
export {InputForm};