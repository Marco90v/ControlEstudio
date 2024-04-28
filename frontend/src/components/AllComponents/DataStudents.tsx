import { useEffect, useRef, useState } from "react";
import useStoreRoles from "../../zustanStore/roles";
import { ROLES, TABLE_NAME } from "../../ultil/const";
import useStoreSupabase from "../../zustanStore/supabase";
import { useShallow } from "zustand/react/shallow";
import { supaService } from "../../supabase/supaService";
import useStoreLoading from "../../zustanStore/loading";
import { useSupabase } from "../../hooks/useSupabase";
import useStorePersons from "../../zustanStore/persons";
import PersonsForms from "./PersonsForms";
import ProfessionSemester from "./ProfessionSemester";
import TablePersons from "./TablePersons";

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
    const { supabase } = useStoreSupabase(useShallow(state=>({
        supabase:state.supabase
    })))
    const {getAll} = supaService(supabase)

    const {handlerLoading, handlerError} = useStoreLoading(useShallow((state=>({
        handlerError: state.handlerError,
        handlerLoading: state.handlerLoading
    }))))

    const {roles, setRoles} = useStoreRoles(
        useShallow((state=>({
            roles: state.roles,
            setRoles: state.setRoles,
            clearRoles: state.clearRoles
        })))
    )
    const { clearPerson } = useStorePersons(useShallow(state=>({
        clearPerson: state.clearPerson
    })))

    const {getSupabase:getR} = useSupabase(TABLE_NAME.ROLES,handlerLoading, handlerError)

    const [ selectRole, setSelectRole ] = useState<number>(0);
    const [ person, setPerson ] = useState(initialDataPerson);
    const handlerStudent = useRef();

    useEffect(() => {
        roles.length <= 0 && getR(getAll, setRoles)
        return () => {
            clearPerson()
        }
      }, [])

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
                saveChildren={handlerStudent}
                type={ROLES.STUDENT}
            >
                <ProfessionSemester ref={handlerStudent} />
            </PersonsForms>
            <TablePersons
                deleteChildren={handlerStudent}
                type={ROLES.STUDENT}
            />
        </div>
    );
}

export default DataStudents;
export {DataStudents};