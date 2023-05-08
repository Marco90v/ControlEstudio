import { Suspense, useEffect, useState } from "react";
import { useGetProfileQuery } from "../../store/apis/profileApi";
import { useGetRolesQuery } from "../../store/apis/rolesApi";
import { ContentProfile } from "../../styled/style";

function Profile(){
    const [rol, setRol] = useState<string>("");
    const { data } = useGetProfileQuery();
    const { data:roles } = useGetRolesQuery();
    useEffect(() => {
        const nameRol= roles?.find(e=>e.id===data?.role);
        setRol(nameRol?.names || "");
        return () => {}
    }, [roles,data])
    
    return(
        <ContentProfile>
            <label>Perfil</label>
            <div className="profile">
                <label>Nombres</label>
                <label> { data?.names } </label>
                <label>Apellido</label>
                <label> { data?.lastNames } </label>
                <label>Genero</label>
                <label> { data?.sex === "M" ? "Masculino" : "Femenino" } </label>
                <label>Correo</label>
                <label> { data?.email } </label>
                <label>N° Telefonico</label>
                <label> { data?.phone } </label>
                <label>Rol</label>
                <label> { rol } </label>
            </div>
        </ContentProfile>
    )
}

export default Profile;
export {Profile};