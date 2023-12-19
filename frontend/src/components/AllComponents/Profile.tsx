import { Suspense, useEffect, useState } from "react";
// import { useGetProfileQuery } from "../../store/apis/profileApi";
// import { useGetRolesQuery } from "../../store/apis/rolesApi";
import { ContentProfile } from "../../styled/style";
// import { gql } from "@apollo/client/core";
import { useQuery } from "@apollo/client";
import useStoreProfile from "../../zustanStore/profile";
import { gql } from "../../__generated__";

// const GET_PROFILE = gql`
//     query GetProfile {
//         getProfile {
//             id
//             names
//             lastNames
//             sex
//             email
//             phone
//             photo
//             role
//         }
//     }
// `

// const GET_ROLES = gql`
//     query AllRoles {
//         allRoles {
//             id
//             names
//         }
//     }
// `

const GET_PROFILE_AND_ROLES = gql(`
    query GetProfileAndRoles {
        getProfile {
            id
            names
            lastNames
            sex
            email
            phone
            photo
            role
        }
        allRoles {
            id
            names
        }
    }
`)

function Profile(){
    // const [rol, setRol] = useState<string>("");
    // const { data } = useGetProfileQuery();
    // const { data:roles } = useGetRolesQuery();

    // const { data } = useQuery(GET_PROFILE);
    // const { data:roles } = useQuery(GET_ROLES);
    const { data } = useQuery(GET_PROFILE_AND_ROLES);
    const {profile, setProfile} = useStoreProfile((state)=>state)

    
    useEffect(() => {
        // const nameRol= roles?.find(e=>e.id===data?.role);
        // setRol(nameRol?.names || "");
        // return () => {}
        if(data){
            // console.log(data)
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
            // console.log(newProfile)
            setProfile(newProfile)
        }
    }, [data])
    
    return(
        <ContentProfile>
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
        </ContentProfile>
    )
}

export default Profile;
export {Profile};