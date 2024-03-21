import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
// import { ContentLogin } from "../../styled/style";
import useStoreToken from "../../zustanStore/token";
import { LOGIN } from "../../ultil/const";

const dataUser = {
    user:'LeonadoCuellar',
    pass:'1234'
}

function Login(){
    const [data, setData] = useState(dataUser);
    const [getLogin, { loading, error, data:token } ]= useLazyQuery(LOGIN);
    const setToken = useStoreToken((state) => state.setToken)

    useEffect(() => {
        if(token?.login?.token){
            setToken(token.login.token)
        }
      return () => {}
    }, [token])
    
    const changeData = (element:any) => {
        const id = element.target.id;
        const value = element.target.value;
        setData((e)=>({...e,[id]:value}))
    }

    const submit = (e:any) => {
        e.preventDefault();
        getLogin( { variables: { user: data.user, pass: data.pass } } )
    }  

    return(
        // <ContentLogin>
        <div className="min-h-screen flex flex-col gap-y-20 justify-center justify-items-center">
            <label>Universidad</label>
            <form onSubmit={submit} >
                <label htmlFor="">Usuario</label>
                <input type="text" name="user" id="user" value={data.user} onChange={(e)=>changeData(e)} />
                <label htmlFor="">Contraseña</label>
                <input type="password" name="pass" id="pass" value={data.pass} onChange={(e)=>changeData(e)} />
                <button type="submit">Ingresar</button>
            </form>
        </div>
        // </ContentLogin>
    );
}

export {Login};