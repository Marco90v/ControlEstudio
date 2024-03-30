import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import useStoreToken from "../../zustanStore/token";
import { LOGIN } from "../../ultil/const";
import { Button, Input } from "../../components";

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
        <main className="min-h-screen flex flex-col gap-y-20 justify-center items-center">
            <label
                className="text-4xl font-bold"
            >
                Universidad
            </label>
            <form
                className="grid grid-cols-2 grid-rows-[repeat(3,minmax(1fr, 1fr))] gap-x-2 gap-y-4 bg-neutral-200 p-12 rounded-md items-center"
                onSubmit={submit}
            >
                <label className="font-bold" htmlFor="">Usuario</label>
                <Input type="text" id="user" name="user" value={data.user} onChange={(e)=>changeData(e)} />
                <label className="font-bold" htmlFor="">Contraseña</label>
                <Input type="password" id="pass" name="pass" value={data.pass} onChange={(e)=>changeData(e)} />
                <Button type="submit" color="green" className="font-bold text-white col-span-2 mt-4 enabled:hover:shadow-lg enabled:hover:shadow-green-500/50">
                    Ingresar
                </Button>
            </form>
        </main>
    );
}

export {Login};