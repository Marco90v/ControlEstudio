import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ContentStudent } from "../../styled/style";
import { useGetRolesQuery } from "../../store/apis/rolesApi";
import { PersonsForms, TablePersons, ProfessionSemester } from "../";

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

    const { data:statusFetch } = useSelector((state:store) => state.stateFetch);
    const { data:roles=[] } = useGetRolesQuery();
    const [ selectRole, setSelectRole ] = useState<number>(0);
    const [ person, setPerson ] = useState(initialDataPerson);
    const handlerStudent = useRef();

    useEffect(() => {
        roles.forEach((e:role)=>{
            if (e.names === "Estudiante"){
                const ID:number = Number(e.id);
                setSelectRole(ID);
            }
        });
        return () => {}
    }, [roles]);

    const changeRole = (e:any) => {
        const ID:number = Number(e.target.value);
        setSelectRole(ID);
        changeDataPerson(e);
    }

    const changeDataPerson = (e:any) => {
        setPerson({...person, [e.target.name]:e.target.value});
    }

    return(
        <ContentStudent className="content" wait={statusFetch}>
            <PersonsForms
                changeRole={changeRole}
                roles={roles}
                selectRole={selectRole}
                saveChildren={handlerStudent}
                type={"Estudiante"}
            >
                <ProfessionSemester ref={handlerStudent} />
            </PersonsForms>
            <TablePersons
                deleteChildren={handlerStudent}
                role={selectRole}
            />
        </ContentStudent>
    );
}

export default DataStudents;
export {DataStudents};