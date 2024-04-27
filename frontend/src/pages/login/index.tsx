import { useState } from "react";
import useStoreToken from "../../zustanStore/token";
import { Button, Input } from "../../components";
import useStoreSupabase from "../../zustanStore/supabase";
import { useShallow } from "zustand/react/shallow";
import { createClient } from "@supabase/supabase-js";

const dataUser = {
    // user:'LeonadoCuellar',
    email:'LeonadoCuellar@email.com',
    pass:'1234'
}

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
// const db = import.meta.env.VITE_DB_NAME

// const temp = localStorage.getItem("token")
// const token =  temp ? JSON.parse(temp) : ""

function Login(){
    const [dataForm, setData] = useState(dataUser);
    const { supabase } = useStoreSupabase(useShallow((state=>({
        supabase: state.supabase,
        setSupabase: state.setSupabase
    }))))
    const {setToken} = useStoreToken(useShallow((state=>({
        setToken: state.setToken
    }))))
    
    const changeData = (element:any) => {
        const id = element.target.id;
        const value = element.target.value;
        setData((e)=>({...e,[id]:value}))
    }

    const submit = async (e:any) => {
        e.preventDefault();
        // const supabase = createClient(supabaseUrl, supabaseKey, {
        //     db: {
        //       schema:db
        //     },
        //     global:{
        //       headers:{
        //         Authorization:`Bearer ${token}`
        //       }
        //     }
        // })
        supabase.auth.signInWithPassword({email:dataForm.email, password:dataForm.pass})
        .then(({data})=>{
            const token = data.session?.access_token
            if(token){
                setToken(token)
            }
        })
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
                <Input type="email" id="email" name="email" value={dataForm.email} onChange={(e)=>changeData(e)} />
                <label className="font-bold" htmlFor="">Contraseña</label>
                <Input type="password" id="pass" name="pass" value={dataForm.pass} onChange={(e)=>changeData(e)} />
                <Button type="submit" color="green" className="font-bold text-white col-span-2 mt-4 enabled:hover:shadow-lg enabled:hover:shadow-green-500/50">
                    Ingresar
                </Button>
            </form>
        </main>
    );
}

export {Login};