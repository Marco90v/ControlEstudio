import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ContentScores } from "../../styled/style";
import { useGetRolesQuery } from "../../store/apis/rolesApi";
import { TablePersons, Record } from "../";
import useStoreProfile from "../../zustanStore/profile";
import { useQuery } from "@apollo/client";
import { gql } from "../../__generated__";
import useStoreRoles from "../../zustanStore/roles";

interface role {
    id: number | null | undefined,
    names: string | null | undefined
}

const GET_ROLES = gql(`
    query AllRoles {
        allRoles {
            id
            names
        }
    }
`)

function DataScores(){

    // const profile = useSelector((state:store) => state.profile);
    const {profile, setProfile} = useStoreProfile((state)=>state)
    // const {data:statusFetch} = useSelector((state:store) => state.stateFetch);
    const statusFetch = false
    const {roles, setRoles, clearRoles} = useStoreRoles((state)=>state)

    // const { data:roles=[] } = useGetRolesQuery();
    const { data:dataRoles } = useQuery(GET_ROLES);

    const [ selectRole, setSelectRole ] = useState<number>(0);
    
    useEffect(() => {
        if(dataRoles?.allRoles){
            const newData:role[] = dataRoles.allRoles.map(e=>{
                if(e?.names === "Estudiante" ){
                    const ID:number = Number(e.id)
                    setSelectRole(ID)
                }
                return {
                    id: e?.id,
                    names: e?.names
                }
            });
            setRoles(newData)
            // setSelectRole(()=>{
            //     return res ? res.id : 0
            // });
        }
        return () => {}
    }, [dataRoles]);

    const verifyRole = () => {
        const role = roles.find(e=>e.id === profile.role)?.names ?? false;
        return role === "Estudiante" ? true : false;
    }
    
    const deleteChildren = (idx:number) => {}

    return(
        <ContentScores className="content" wait={ statusFetch }>
            <Record />
            {
                verifyRole() ?
                    <TablePersons
                        deleteChildren={{current:deleteChildren}}
                        role={0}
                        preCarga={[profile]}
                        scores={true}
                    />
                    :
                    <TablePersons
                        deleteChildren={{current:deleteChildren}}
                        role={selectRole}
                        scores={true}
                    />
            }
        </ContentScores>
    );
}

export default DataScores;
export {DataScores};