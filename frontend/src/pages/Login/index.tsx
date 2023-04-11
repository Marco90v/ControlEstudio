import { useState } from "react";
import { useLoginMutation } from "../../store/apis/authApi";

const dataUser = {
    user:'RafaAbraham',
    pass:'1234'
}

function Login(){
    const [data, setData] = useState(dataUser);
    const [ login ] = useLoginMutation();

    const changeData = (element:any) => {
        const id = element.target.id;
        const value = element.target.value;
        setData((e)=>({...e,[id]:value}))
    }


    const submit = (e:any) => {
        e.preventDefault();
        login(data);
    }    

    return(
        <form onSubmit={submit} >
            <div>
                <label htmlFor="">Usuario</label>
                <input type="text" name="user" id="user" value={data.user} onChange={(e)=>changeData(e)} />
            </div>
            <div>
                <label htmlFor="">Contraseña</label>
                <input type="password" name="pass" id="pass" value={data.pass} onChange={(e)=>changeData(e)} />
            </div>
            <button type="submit">Ingresar</button>
        </form>
    );
}

export {Login};