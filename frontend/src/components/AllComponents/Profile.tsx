import { useEffect } from "react";
import { ContentProfile } from "../../styled/style";
import { useQuery } from "@apollo/client";
import useStoreProfile from "../../zustanStore/profile";
import { GET_PROFILE_AND_ROLES } from "../../ultil/const";

function Profile(){
    const { data } = useQuery(GET_PROFILE_AND_ROLES);
    const {profile, setProfile} = useStoreProfile((state)=>state)

    useEffect(() => {
        if(data){
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
            <label className="text-4xl font-bold">Perfil</label>
            <div className="grid grid-cols-2 grid-rows-6 gap-x-2 gap-y-4">
                <label className="labelInfoProfile">Nombres</label>
                <label className="labelDataProfile"> { profile.names } </label>
                <label className="labelInfoProfile">Apellido</label>
                <label className="labelDataProfile"> { profile.lastNames } </label>
                <label className="labelInfoProfile">Genero</label>
                <label className="labelDataProfile"> { profile.sex === "M" ? "Masculino" : "Femenino" } </label>
                <label className="labelInfoProfile">Correo</label>
                <label className="labelDataProfile"> { profile.email } </label>
                <label className="labelInfoProfile">N° Telefonico</label>
                <label className="labelDataProfile"> { profile.phone } </label>
                <label className="labelInfoProfile">Rol</label>
                <label className="labelDataProfile"> { profile.nameRole } </label>
            </div>
        </div>
    )
}

export default Profile;
export {Profile};