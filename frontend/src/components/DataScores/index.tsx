import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ContentScores } from "../../styled/style";
import { useGetRolesQuery } from "../../store/apis/rolesApi";
import { TablePersons, Record } from "../";

function DataScores(){

    const profile = useSelector((state:store) => state.profile);
    const {data:statusFetch} = useSelector((state:store) => state.stateFetch);

    const { data:roles=[] } = useGetRolesQuery();
    const [ selectRole, setSelectRole ] = useState<number>(0);
    
    useEffect(() => {
        const res:role | undefined = roles.find((e:role)=>e.names === "Estudiante" );
        setSelectRole(()=>{
            return res ? res.id : 0
        });
        return () => {}
    }, [roles]);

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

export { DataScores };