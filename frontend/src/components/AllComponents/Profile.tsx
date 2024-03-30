import { useEffect } from "react";
import { useQuery } from "@apollo/client/react/hooks";
import useStoreProfile from "../../zustanStore/profile";
import { GET_PROFILE_AND_ROLES } from "../../ultil/const";
import Input from "./Input";

const disabled = true

function Profile(){
    const { data } = useQuery(GET_PROFILE_AND_ROLES);
    const {profile, setProfile} = useStoreProfile((state)=>state)

    useEffect(() => {
        if(data && data.getProfile?.id !== profile.id){
            const nameRole = data?.allRoles?.find(e=>e?.id===data.getProfile?.role)?.names || ""
            const newProfile = {
                id:data.getProfile?.id || 0,
                names: data.getProfile?.names || '',
                lastNames: data.getProfile?.lastNames || '',
                sex: data.getProfile?.sex || '',
                email: data.getProfile?.email || '',
                phone: data.getProfile?.phone || 0,
                photo: data.getProfile?.photo || '',
                role: data.getProfile?.role || 0,
                nameRole
            }
            setProfile(newProfile)
        }
    }, [data])
    
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