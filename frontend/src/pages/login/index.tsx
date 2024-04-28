import { useState } from "react";
import useStoreToken from "../../zustanStore/token";
import { Button, Input } from "../../components";
import useStoreSupabase from "../../zustanStore/supabase";
import { useShallow } from "zustand/react/shallow";
import { BiChevronRight } from "react-icons/bi";

const dataUser = {
    // user:'LeonadoCuellar',
    email:'LeonadoCuellar@email.com',
    pass:'1234'
}

const users = [
    {email:'LeonadoCuellar@email.com', pass:'1234', type:'admin'},
    {email:'AlmaFranco@email.com', pass:'1234', type:'admin'},
    {email:'RafaCozar@email.com', pass:'1234', type:'profesor'},
    {email:'OdalysMadrigal@email.com', pass:'1234', type:'profesor'},
    {email:'AngelNavas@email.com', pass:'1234', type:'estudiante'},
    {email:'TatianaEcheverria@email.com', pass:'1234', type:'estudiante'},
]

function Dropdown({user}:{user:{email:string, pass:string, type:string}}) {
    const [show, setShow] = useState(false)
    const handlerShow = () => {
        setShow(e=>!e)
    }
    return (
        <li className={`bg-gray-100 p-2 mb-2 border rounded-md text-gray-700 overflow-hidden transition-all duration-300 ${show ? "h-[5.5rem]" : "h-9"}`} >
            <label className="block">
                <span className="text-gray-800 font-semibold inline">Tipo de Usuario:</span> {user.type}
                <BiChevronRight className={`bg-white size-5 rounded-md float-right cursor-pointer transition-all duration-300 ${show ? "rotate-90" : "rotate-0"}`} onClick={handlerShow} />
            </label>
            <label className="block">
                <span className="text-gray-800 font-semibold">Email: </span>{user.email}
            </label>
            <label className="block">
                <span className="text-gray-800 font-semibold">Contraseña:</span> {user.pass}
            </label>
        </li>
    )
}

function Login(){
    const [show, setShow] = useState(false)
    
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
        supabase.auth.signInWithPassword({email:dataForm.email, password:dataForm.pass})
        .then(({data})=>{
            const token = data.session?.access_token
            if(token){
                setToken(token)
            }
        })
    }
    
    const handlerShow = () => {
        setShow(e=>!e)
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
            <ul className={`bg-gray-50 p-4 border rounded-md mb-4 overflow-hidden transition-all duration-300 ${show ? "max-h-[50rem]" : "max-h-[3rem]"}`}>
                <span className="block text-gray-800 font-semibold mb-2">
                    Usuarios
                    <BiChevronRight className={`bg-green-600 size-5 rounded-md float-right cursor-pointer transition-all duration-300 ${show ? "rotate-90" : "rotate-0"}`} onClick={handlerShow} />
                </span>
                {
                    users.map( (u,i) => <Dropdown key={i} user={u} /> )
                }
            </ul>
        </main>
    );
}

export {Login};