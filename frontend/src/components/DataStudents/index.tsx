import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSelectPerson, fetchDeletePersonById, fetchGetPersonByRole, fetchPostPerson, fetchUpdatePersonById } from "../../store/module/personStore";
import { changeSelectRole, fetchRoles } from "../../store/module/rolesStore";
import { ContentStudent } from "../../styled/style";
import Select from "../Select";

import { fetchGetProfession } from "../../store/module/professionStore";
import { fetchGetSemesters } from "../../store/module/semestersStore";
import { changeSelectStudents, fetchDeleteDataStudentById, fetchGetStudents, fetchPostStudent, fetchUpdateDataStudent } from "../../store/module/studentsStore";
import PersonsForms from "../PersonsForms";
import TablePersons from "../TablePersons";
import { personApi, useDeletePersonByIdMutation, usePostPersonMutation, useUpdatePersonByIdMutation } from "../../store/apis/personApi";
import { useGetRolesQuery } from "../../store/apis/rolesApi";
import { useGetProfessionQuery } from "../../store/apis/professionApi";
import { useGetSemestersQuery } from "../../store/apis/semestersApi";
import { studentsApi, useDeleteStudentByIdMutation, usePostStudentMutation, useUpdateStudentByIdMutation } from "../../store/apis/studentsApi";

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

const initialDataStudents:students = {
    id: 0,
    IdPersons: 0,
    IdProfession: 0,
    IdSemesters: 0
}

function DataStudents(){

    const { data:roles=[] } = useGetRolesQuery();
    const { data:professions=[] } = useGetProfessionQuery();
    const { data:semesters=[] } = useGetSemestersQuery();

    const [ triggerPersons, { data:persons=[] } ] = personApi.endpoints.getPersonByRole.useLazyQuery();
    const [ triggerStudents, { data:students=initialDataStudents, isSuccess:isSuccessStudents, isFetching:isFetchingStudents } ] = studentsApi.endpoints.getStudentsById.useLazyQuery();

    const [ postPerson ] = usePostPersonMutation();
    const [ updatePerson ] = useUpdatePersonByIdMutation();
    const [ deletePersonById ] = useDeletePersonByIdMutation();
    const [ updateStudentById ] = useUpdateStudentByIdMutation();
    const [ deleteStudentById ] = useDeleteStudentByIdMutation();

    const [ postStudent ] = usePostStudentMutation();

    const [ selectRole, setSelectRole ] = useState<number>(0);
    const [ selectPerson, setSelectPeron ] = useState<number>(0);

    const [person, setPerson] = useState(initialDataPerson);
    const [student, setStudent] = useState(initialDataStudents);
    const [wait, setWait] = useState<boolean>(false);

    useEffect(() => {
        roles.forEach((e:role)=>{
            if (e.names === "Estudiante"){
                const ID:number = Number(e.id);
                setPerson({...person, role:ID});
                setSelectRole(ID);
                triggerPersons(ID)
            }
        });
        return () => {}
    }, [roles]);

    useEffect(() => {
        students !== null ? setStudent(students) : setStudent(initialDataStudents);
      return () => {}
    }, [isSuccessStudents, isFetchingStudents])

    const changeRole = (e:any) => {
        const ID:number = Number(e.target.value);
        setSelectRole(ID);
        changeDataPerson(e);
    }

    const changeDataPerson = (e:any) => {
        setPerson({...person, [e.target.name]:e.target.value});
    }

    const resetInput = () => {
        const zero:any = 0;
        setPerson({...initialDataPerson,role:person.role});
        setStudent(initialDataStudents);
        setSelectPeron(zero);
    }

    const fieldNotEmptied = (object:any):boolean => {
        let r:boolean = true;
        for (const key in object) {
            if(object[key] === 0 || object[key] === ""){
                r=false;
                break;
            }
        }
        return r;
    }

    const updateStudent = ():boolean => {
        let r:boolean = false;
        if(students?.IdProfession !== student.IdProfession || students?.IdSemesters !== student.IdSemesters){
            r = true;
        }
        return r;
    }

    const newData = async () => {
        const {names, lastNames, email, phone, sex} = person;
        const notEmptied:boolean = fieldNotEmptied({names, lastNames, email, phone, sex});
        const newData = {...person, phone:Number(phone), id:selectPerson};
        if(notEmptied){
            const insert = {
                body: newData,
                role: selectRole
            }
            try{
                const { insertId:IdPersons } = await postPerson(insert).unwrap();
                if(student.IdProfession !== 0 && student.IdSemesters !== 0){
                    const dataStudent = {...student,id:IdPersons, IdPersons};
                    postStudent(dataStudent)
                }
            }catch(error){
                console.log(error);
            }
        }
        setWait(false);
    }

    const editData = () => {
        const {names, lastNames, email, phone, sex, photo, role} = person;
        const newData:person = {...person,names, phone:Number(phone), id:selectPerson};

        const notEmptiedPerson:boolean = fieldNotEmptied({names, lastNames, email, phone, sex, role});
        if(notEmptiedPerson){
            const personOriginal = persons.filter((item:person)=>item.id===selectPerson)[0];
            if(names !== personOriginal.names || lastNames !== personOriginal.lastNames || email !== personOriginal.email || 
                phone !== personOriginal.phone || sex !== personOriginal.sex || photo !== personOriginal.photo || role !== personOriginal.role){
                    const updateP = {
                        body:newData,
                        role:selectRole
                    }
                    updatePerson(updateP);
            }
        }
        else{
            console.log("no se permiten campos vacios");
            setWait(false);
        }

        const {id,IdPersons,...rStudent} = student;
        const notEmptiedStudent:boolean = fieldNotEmptied(rStudent);

        if(notEmptiedStudent){
            if(id !== 0 && updateStudent()){
                updateStudentById(student)
            }
            if(id === 0 && IdPersons === 0 && notEmptiedStudent){
                const newStudent = { ...student, IdPersons:selectPerson };
                postStudent(newStudent)
            }
        }

        setWait(false);
        resetInput();
    }

    const save = () => {
        setWait(true);
        selectPerson === 0 ? newData() : editData();
    }

    const cancelEdit = () => {
        const zero:any = 0;
        setPerson({...initialDataPerson,role:person.role});
        setStudent(initialDataStudents)
        setSelectPeron(zero);
    }

    const edit = (idx:number) => {
        const p = persons[idx];
        setPerson({...p});
        triggerStudents(p.id);
        setSelectPeron(p.id);
    }

    const remove = async (idx:number=0) => {
        const { id } = await triggerStudents(idx).unwrap();
        const deleteData = {body:{id:idx},role:selectRole}
        deletePersonById(deleteData);
        deleteStudentById({id});
    }

    const changeSelect = (e:any) => {
        const element = e.target.id;
        const value = e.target.value;
        setStudent((e:students)=>{
            return {...e,[element]:Number(value)};
        });
    }

    return(
        <ContentStudent className="content" wait={wait}>
            <PersonsForms
                person={person}
                changeRole={changeRole}
                changeDataPerson={changeDataPerson}
                roles={roles}
                selectRole={selectRole}
                wait={wait}
                persons={persons}
                selectPerson={selectPerson}
                cancelEdit={cancelEdit}
                save={save}
                type={"students"}
            >
                <div className="professionSemesters">
                    <div className="profession">
                        <label htmlFor="selectProfession">Profesión</label>
                        <Select identify="IdProfession" changeSelect={(e)=>changeSelect(e)} value={student.IdProfession} data={professions} disabled={wait} />
                    </div>
                    <div className="selectSemester">
                        <label htmlFor="selectSemester">Semestres</label>
                        <Select identify="IdSemesters" changeSelect={(e)=>changeSelect(e)} value={student.IdSemesters} data={semesters} disabled={wait} />
                    </div>
                </div>
            </PersonsForms>
            <TablePersons persons={persons} edit={edit} remove={remove} />
        </ContentStudent>
    );
}
export default DataStudents;