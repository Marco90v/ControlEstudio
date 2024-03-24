import { useEffect, useRef, useState } from "react";
import { PersonsForms, TablePersons, Teacher } from "../";
import { useQuery } from "@apollo/client";
import useStoreRoles from "../../zustanStore/roles";
import { GET_ROLES, ROLES } from "../../ultil/const";

const initialDataPerson:person = {
    id:0,
    idPerson:0,
    names: "",
    lastNames: "",
    sex: "",
    email: "",
    phone: 0,
    photo: "",
    role: 0
};

interface role {
    id: number | null | undefined,
    names: string | null | undefined
}

function DataTeacher(){
    const { data:dataRoles } = useQuery(GET_ROLES);
    const {roles, setRoles} = useStoreRoles((state)=>state)
    const statusFetch = false;

    const [ selectRole, setSelectRole ] = useState<number>(0);
    const handlerTeacher = useRef<any>();
    
    useEffect(() => {
        if(dataRoles?.allRoles){
            const newData:role[] = dataRoles.allRoles.map(e=>{
                if (e?.names === ROLES.TEACHER){
                    const ID:number = Number(e.id)
                    setSelectRole(ID)
                }
                return {
                    id: e?.id,
                    names: e?.names
                }
            })
            setRoles(newData)
        }
        return () => {}
    }, [dataRoles]);

    const changeRole = (e:any) => {
        const ID:any = Number(e.target.value);
        setSelectRole(ID);
    }

    return(
        <div className="m-8 overflow-auto" >
            <PersonsForms
                changeRole={changeRole}
                roles={roles}
                selectRole={selectRole}
                saveChildren={handlerTeacher}
                type={ROLES.TEACHER}
            >
                <Teacher ref={handlerTeacher} />
            </PersonsForms>
            <TablePersons
                deleteChildren={handlerTeacher}
                role={selectRole}
            />
        </div>
    )
}

export default DataTeacher;
export {DataTeacher};