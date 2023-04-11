import { useEffect, useState } from "react";
import { useGetProfileQuery } from "../../store/apis/profileApi";
import { useGetRolesQuery } from "../../store/apis/rolesApi";

function Profile(){
    const [rol, setRol] = useState<string>("");
    const { data } = useGetProfileQuery();
    // const {names, lastNames, sex, email, phone, role} = data;
    const { data:roles } = useGetRolesQuery();
    useEffect(() => {
        const nameRol= roles?.find(e=>e.id===data?.role);
        setRol(nameRol?.names || "");
        return () => {}
    }, [roles,data])
    
    return(
        <div className="profile">
            <div className="names">
                <label htmlFor="">Nombres</label>
                <label htmlFor=""> { data?.names } </label>
            </div>
            <div className="lastNames">
                <label htmlFor="">Apellido</label>
                <label htmlFor=""> { data?.lastNames } </label>
            </div>
            <div className="sex">
                <label htmlFor="">Genero</label>
                <label htmlFor=""> { data?.sex } </label>
            </div>
            <div className="email">
                <label htmlFor="">Correo</label>
                <label htmlFor=""> { data?.email } </label>
            </div>
            <div className="phone">
                <label htmlFor="">N° Telefonico</label>
                <label htmlFor=""> { data?.phone } </label>
            </div>
            <div className="role">
                <label htmlFor="">Rol</label>
                <label htmlFor=""> { rol } </label>
            </div>
        </div>
    )
}

export {Profile}