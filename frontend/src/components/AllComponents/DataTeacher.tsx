import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ContentTeacher } from "../../styled/style";
import { useGetRolesQuery } from "../../store/apis/rolesApi";
import { PersonsForms, TablePersons, Teacher } from "../";
import { useQuery } from "@apollo/client";
import { gql } from "../../__generated__";
import useStoreRoles from "../../zustanStore/roles";

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

const GET_ROLES = gql(`
    query AllRoles {
        allRoles {
            id
            names
        }
    }
`)

function DataTeacher(){

    // const { data:roles=[] } = useGetRolesQuery();
    // const { data:statusFetch } = useSelector((state:store) => state.stateFetch);
    const { data:dataRoles } = useQuery(GET_ROLES);
    const {roles, setRoles, clearRoles} = useStoreRoles((state)=>state)
    const statusFetch = false;

    const [ selectRole, setSelectRole ] = useState<number>(0);
    // const [ person, setPerson ] = useState(initialDataPerson);
    const handlerTeacher = useRef();
    
    useEffect(() => {
        // roles.forEach(e=>{
        //     if (e.names === "Profesor"){
        //         const ID:number = Number(e.id);
        //         setSelectRole(ID);
        //     }
        // });
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
            // console.log(newData)
        }
        return () => {}
    }, [dataRoles]);

    const changeRole = (e:any) => {
        const ID:any = Number(e.target.value);
        setSelectRole(ID);
        // changeDataPerson(e);
    }

    // const changeDataPerson = (e:any) => {
    //     const camp = e.target.name;
    //     const value = e.target.value;
    //     setPerson((item)=>{return {...item, [camp]:value}});
    // }

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