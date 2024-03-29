import { useEffect, useState } from "react";
import { TablePersons, Record } from "../";
import useStoreProfile from "../../zustanStore/profile";
import { useQuery } from "@apollo/client/react/hooks";
import useStoreRoles from "../../zustanStore/roles";
import { GET_ROLES, ROLES } from "../../ultil/const";

interface role {
    id: number | null | undefined,
    names: string | null | undefined
}

function DataScores(){

    const { profile } = useStoreProfile((state)=>state)
    const { roles, setRoles } = useStoreRoles((state)=>state)
    const { data:dataRoles } = useQuery(GET_ROLES);

    const [ selectRole, setSelectRole ] = useState<number>(0);
    
    useEffect(() => {
        if(dataRoles?.allRoles){
            const newData:role[] = dataRoles.allRoles.map(e=>{
                if(e?.names === ROLES.STUDENT ){
                    const ID:number = Number(e.id)
                    setSelectRole(ID)
                }
                return {
                    id: e?.id,
                    names: e?.names
                }
            });
            setRoles(newData)
        }
        return () => {}
    }, [dataRoles]);

    const verifyRole = () => {
        const role = roles.find(e=>e.id === profile.role)?.names ?? false;
        return role === "Estudiante" ? true : false;
    }
    
    const deleteChildren = (idx:number) => {}

    return(
        <div className="m-8 overflow-auto" >
            <Record />
            {
                verifyRole() ?
                    <TablePersons
                        deleteChildren={{current:deleteChildren}}
                        role={0}
                        preCarga={[profile as any]}
                        scores={true}
                    />
                    :
                    <TablePersons
                        deleteChildren={{current:deleteChildren}}
                        role={selectRole}
                        scores={true}
                    />
            }
        </div>
    );
}

export default DataScores;
export {DataScores};