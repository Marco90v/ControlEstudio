import { useEffect } from "react";
import useStoreProfile from "../../zustanStore/profile";
import Input from "./Input";
import { TABLE_NAME } from "../../ultil/const";
import useStoreSupabase from "../../zustanStore/supabase";
import { useShallow } from "zustand/react/shallow";

const disabled = true

function Profile(){
    const {profile, setProfile} = useStoreProfile(useShallow(((state)=>({
        profile: state.profile,
        setProfile: state.setProfile,
    }))))
    const { getSupabase } = useStoreSupabase(useShallow((state=>({
        getSupabase: state.getSupabase
    }))))

    useEffect(() => {
        profile.id === 0 && getSupabase().auth.getUser().then(({data:{user}})=>{
            if(user && user.id && profile.userUID !== user.id){
                getSupabase().from(TABLE_NAME.PERSONS).select('*, roles!inner(names)').eq('userUID', user.id)
                .then( ({data}) => {
                    if(data && data.length > 0){
                        const { roles, ...rest } = data[0]
                        const newData = {...rest, nameRole:roles.names}
                        setProfile(newData)
                    }
                })
            }
        })
    }, [])
    
    return(
        <div className="overflow-auto min-h-screen flex justify-center items-center flex-col gap-y-8">
            <label className="text-4xl font-bold text-gray-800">Perfil</label>
            <div className="grid grid-cols-3 grid-rows-6 gap-x-2 gap-y-4 border border-solid border-gray-200 p-6 rounded-lg bg-gray-50 shadow-md">
                <label className="labelInfoProfile">Nombres</label>
                <Input id="names" name="names" type="text" value={profile.names}  disabled={disabled} className="text-gray-800 col-span-2"/>
                <label className="labelInfoProfile">Apellido</label>
                <Input id="lastNames" name="lastNames" type="text" value={profile.lastNames} disabled={disabled} className="text-gray-800 col-span-2"/>
                <label className="labelInfoProfile">Genero</label>
                <Input id="sex" name="sex" type="text" value={ profile.sex === "M" ? "Masculino" : "Femenino" } disabled={disabled} className="text-gray-800 col-span-2"/>
                <label className="labelInfoProfile">Correo</label>
                <Input id="email" name="email" type="text" value={profile.email} disabled={disabled} className="text-gray-800 col-span-2"/>
                <label className="labelInfoProfile">N° Telefonico</label>
                <Input id="phone" name="phone" type="text" value={profile.phone} disabled={disabled} className="text-gray-800 col-span-2"/>
                <label className="labelInfoProfile">Rol</label>
                <Input id="role" name="role" type="text" value={profile.nameRole} disabled={disabled} className="text-gray-800 col-span-2"/>
            </div>
        </div>
    )
}

export default Profile;
export {Profile};