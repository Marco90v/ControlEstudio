import { useEffect } from "react";
import { TablePersons, Record } from "../";
import { ROLES, TABLE_NAME } from "../../ultil/const";
import { supaService } from "../../supabase/supaService";
import { useSupabase } from "../../hooks/useSupabase";
import { useShallow } from "zustand/react/shallow";
import useStoreRoles from "../../zustanStore/roles";
import useStoreProfile from "../../zustanStore/profile";
import useStoreSupabase from "../../zustanStore/supabase";
import useStoreLoading from "../../zustanStore/loading";
import useStoreScores from "../../zustanStore/scores";

function DataScores(){

    const { supabase } = useStoreSupabase(useShallow(state=>({
        supabase:state.getSupabase
    })))
    const { getAll } = supaService(supabase())

    const {handlerLoading, handlerError} = useStoreLoading(useShallow((state=>({
        handlerError: state.handlerError,
        handlerLoading: state.handlerLoading
    }))))

    const {getSupabase:getRole} = useSupabase(TABLE_NAME.ROLES,handlerLoading, handlerError)

    const {profile} = useStoreProfile(useShallow((state=>({
        profile: state.profile,
    }))))

    const {roles, setRoles} = useStoreRoles(useShallow((state=>({
        roles: state.roles,
        setRoles: state.setRoles,
    }))))
    const { clearScore } = useStoreScores(useShallow(state=>({
        clearScore: state.clearScore
    })))

    useEffect(() => {
        roles.length <= 0 && getRole(getAll, setRoles)
        return () => {
            clearScore()
        }
    }, [roles])
    

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
                        preCarga={[profile as any]}
                        scores={true}
                        type={ROLES.STUDENT}
                    />
                    :
                    <TablePersons
                        deleteChildren={{current:deleteChildren}}
                        scores={true}
                        type={ROLES.STUDENT}
                    />
            }
        </div>
    );
}

export default DataScores;
export {DataScores};