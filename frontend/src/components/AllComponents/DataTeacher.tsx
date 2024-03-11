import { useEffect, useRef, useState } from "react";
import { ContentTeacher } from "../../styled/style";
import { PersonsForms, TablePersons, Teacher } from "../";
import { useQuery } from "@apollo/client";
import useStoreRoles from "../../zustanStore/roles";
import { GET_ROLES } from "../../ultil/const";

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
    const {roles, setRoles, clearRoles} = useStoreRoles((state)=>state)
    const statusFetch = false;

    const [ selectRole, setSelectRole ] = useState<number>(0);
    const handlerTeacher = useRef();
    
    useEffect(() => {
        if(dataRoles?.allRoles){
            const newData:role[] = dataRoles.allRoles.map(e=>{
                if (e?.names === "Profesor"){
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
        <ContentTeacher className="content" wait={statusFetch}>
            <PersonsForms
                changeRole={changeRole}
                roles={roles}
                selectRole={selectRole}
                saveChildren={handlerTeacher}
                type={"Profesor"}
            >
                <Teacher ref={handlerTeacher} />
            </PersonsForms>
            <TablePersons
                deleteChildren={handlerTeacher}
                role={selectRole}
            />
        </ContentTeacher>
        // null
    )
}

export default DataTeacher;
export {DataTeacher};