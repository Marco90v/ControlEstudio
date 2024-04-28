import { useEffect, useRef, useState } from "react";
import useStoreRoles from "../../zustanStore/roles";
import { ROLES, TABLE_NAME } from "../../ultil/const";
import { useShallow } from "zustand/react/shallow";
import useStoreSupabase from "../../zustanStore/supabase";
import useStoreLoading from "../../zustanStore/loading";
import { useSupabase } from "../../hooks/useSupabase";
import { supaService } from "../../supabase/supaService";
import PersonsForms from "./PersonsForms";
import TablePersons from "./TablePersons";
import Teacher from "./Teacher";

function DataTeacher(){
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

    const {getSupabase:getR} = useSupabase(TABLE_NAME.ROLES,handlerLoading, handlerError)

    const [ selectRole, setSelectRole ] = useState<number>(0);
    const handlerTeacher = useRef<any>();

    useEffect(() => {
      roles.length <= 0 && getR(getAll, setRoles)
      return () => {}
    }, [])
    
    const changeRole = (e:any) => {
        const ID:any = Number(e.target.value);
        setSelectRole(ID);
    }

    return(
        <div className="m-8 overflow-auto" >
            <PersonsForms
                changeRole={changeRole}
                saveChildren={handlerTeacher}
                type={ROLES.TEACHER}
            >
                <Teacher ref={handlerTeacher} />
            </PersonsForms>
            <TablePersons
                deleteChildren={handlerTeacher}
                type={ROLES.TEACHER}
            />
        </div>
    )
}

export default DataTeacher;
export {DataTeacher};