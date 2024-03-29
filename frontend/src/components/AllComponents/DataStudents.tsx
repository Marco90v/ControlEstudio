import { useEffect, useRef, useState } from "react";
import { PersonsForms, TablePersons, ProfessionSemester } from "../";
import { useQuery } from "@apollo/client/react/hooks";
import useStoreRoles from "../../zustanStore/roles";
import { GET_ROLES, ROLES } from "../../ultil/const";

interface role {
    id: number | null | undefined,
    names: string | null | undefined
}

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

function DataStudents(){
    const { data:dataRoles } = useQuery(GET_ROLES);
    const {roles, setRoles} = useStoreRoles((state)=>state)

    const [ selectRole, setSelectRole ] = useState<number>(0);
    const [ person, setPerson ] = useState(initialDataPerson);
    const handlerStudent = useRef();

    useEffect(() => {
        if(dataRoles?.allRoles){
            const newData:role[] = dataRoles.allRoles.map(e=>{
                if (e?.names === ROLES.STUDENT){
                    const ID:number = Number(e.id);
                    setSelectRole(ID);
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

    const changeRole = (e:any) => {
        const ID:number = Number(e.target.value);
        setSelectRole(ID);
        changeDataPerson(e);
    }

    const changeDataPerson = (e:any) => {
        setPerson({...person, [e.target.name]:e.target.value});
    }

    return(
        <div className="m-8 overflow-auto">
            <PersonsForms
                changeRole={changeRole}
                roles={roles}
                selectRole={selectRole}
                saveChildren={handlerStudent}
                type={ROLES.STUDENT}
            >
                <ProfessionSemester ref={handlerStudent} />
            </PersonsForms>
            <TablePersons
                deleteChildren={handlerStudent}
                role={selectRole}
            />
        </div>
    );
}

export default DataStudents;
export {DataStudents};