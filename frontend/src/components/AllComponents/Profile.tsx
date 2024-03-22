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
        <div className="overflow-auto">
            {/* <ContentProfile> */}
                <label>Perfil</label>
                <div className="profile">
                    <label>Nombres</label>
                    <label> { profile?.names } </label>
                    <label>Apellido</label>
                    <label> { profile?.lastNames } </label>
                    <label>Genero</label>
                    <label> { profile?.sex === "M" ? "Masculino" : "Femenino" } </label>
                    <label>Correo</label>
                    <label> { profile?.email } </label>
                    <label>N° Telefonico</label>
                    <label> { profile?.phone } </label>
                    <label>Rol</label>
                    <label> { profile.nameRole } </label>
                </div>
            {/* </ContentProfile> */}
        </div>
    )
}

export default Profile;
export {Profile};