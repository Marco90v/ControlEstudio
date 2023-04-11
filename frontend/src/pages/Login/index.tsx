import { useEffect, useState } from "react";
// import { authApi } from "../../store/apis/authApi";
import { useLoginMutation } from "../../store/apis/authApi";
// import { classesApi } from "../../store/apis/classesApi";
// import { useAppDispatch } from "../../store/store";

const dataUser = {
    user:'RafaAbraham',
    pass:'1234'
}

function Login(){
    const [data, setData] = useState(dataUser);
    const [ login ] = useLoginMutation();
    // const dispatch = useAppDispatch();

    const changeData = (element:any) => {
        const id = element.target.id;
        const value = element.target.value;
        setData((e)=>({...e,[id]:value}))
    }


    const submit = (e:any) => {
        e.preventDefault();
        login(data);
        // dispatch(classesApi.util.resetApiState());
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