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

const initialDataPerson:person = {
    id:0,
    idPerson:0,
    name: "",
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
    const dispatch = useDispatch();
    const roles = useSelector((state:store) => state.roles);
    const persons = useSelector((state:store) => state.persons);
    const professions = useSelector((state:store) => state.profession);
    const semesters = useSelector((state:store) => state.semesters);
    const students = useSelector((state:store) => state.students);


    const [person, setPerson] = useState(initialDataPerson);
    const [student, setStudent] = useState(initialDataStudents);
    const [wait, setWait] = useState<boolean>(false);

    useEffect(() => {
        const promiseRoles = dispatch(fetchRoles());
        const promiseProfession = dispatch(fetchGetProfession());
        const promiseSemesters = dispatch(fetchGetSemesters());
        const promiseStudents = dispatch(fetchGetStudents());
        return () => {
            promiseRoles.abort();
            promiseProfession.abort();
            promiseSemesters.abort();
            promiseStudents.abort();
        }
    }, []);

    useEffect(() => {
        roles.data.forEach(e=>{
            if (e.names === "Estudiante"){
                const ID:any = e.id;
                dispatch(changeSelectRole(ID));
                setPerson({...person, role:ID});
                dispatch(fetchGetPersonByRole(ID));
            }
        });
        return () => {}
    }, [roles.data]);

    const changeRole = (e:any) => {
        const ID:any = e.target.value;
        dispatch(changeSelectRole(ID));
        changeDataPerson(e);
    }

    const changeDataPerson = (e:any) => {
        setPerson({...person, [e.target.name]:e.target.value});
    }

    const resetInput = () => {
        const zero:any = 0;
        setPerson({...initialDataPerson,role:person.role});
        setStudent(initialDataStudents);
        dispatch(changeSelectPerson(zero));
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
        const oldStuden:students = students.data.filter((item:students)=>item.IdPersons === students.selectStudents)[0];
        if(oldStuden.IdProfession !== student.IdProfession || oldStuden.IdSemesters !== student.IdSemesters){
            r = true;
        }
        return r;
    }

    const newData = () => {
        const {name, lastNames, email, phone, sex} = person;
        const notEmptied:boolean = fieldNotEmptied({name, lastNames, email, phone, sex});
        const newData = {...person, names:name, phone:Number(phone)};
        if(notEmptied){
            dispatch(fetchPostPerson(newData)).then((res:any)=>{
                const IdPersons = res.payload.id;
                if(student.IdProfession !== 0 && student.IdSemesters !== 0){
                    const dataStudent = {...student,id:IdPersons, IdPersons};
                    dispatch(fetchPostStudent(dataStudent)).then((res:any)=>{
                        setWait(false);
                        resetInput();
                    });
                }else{
                    setWait(false);
                    resetInput();
                }
            });
        }
        setWait(false);
    }

    const editData = () => {
        const {name, lastNames, email, phone, sex, photo, role} = person;
        const newData = {...person,names:name, phone:Number(phone), id:persons.selectPerson};

        const notEmptiedPerson:boolean = fieldNotEmptied({name, lastNames, email, phone, sex, role});
        if(notEmptiedPerson){
            const personOriginal = persons.data.filter((item:person)=>item.id===persons.selectPerson)[0];
            if(name !== personOriginal.names || lastNames !== personOriginal.lastNames || email !== personOriginal.email || 
                phone !== personOriginal.phone || sex !== personOriginal.sex || photo !== personOriginal.photo || role !== personOriginal.role){
                    dispatch(fetchUpdatePersonById(newData)).then(()=>{
                        setWait(false);
                    });
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
                dispatch(fetchUpdateDataStudent(student));
            }
            if(id === 0 && IdPersons === 0 && notEmptiedStudent){
                const newStudent = { ...student, IdPersons:students.selectStudents };
                dispatch(fetchPostStudent(newStudent));
            }
        }

        setWait(false);
        resetInput();
    }

    const save = () => {
        setWait(true);
        persons.selectPerson === 0 ? newData() : editData();
    }

    const cancelEdit = () => {
        const zero:any = 0;
        setPerson({...initialDataPerson,role:person.role});
        setStudent(initialDataStudents)
        dispatch(changeSelectPerson(zero));
        dispatch(changeSelectStudents(zero));
    }

    const edit = (idx:number) => {
        const {id, names} = persons.data[idx];
        const idPerson:any = Number(id);
        const newDataStudent:students = students.data.filter((item:students)=>item.IdPersons===idPerson)[0];
        setPerson({ ...persons.data[idx], name:names });
        newDataStudent ? setStudent(newDataStudent) : setStudent(initialDataStudents);
        dispatch(changeSelectPerson(idPerson));
        dispatch(changeSelectStudents(idPerson));
    }

    const remove = (idx:number=0) => {
        const id = students.data.filter((item:students)=>item.IdPersons===idx)[0].id;
        dispatch(fetchDeletePersonById(idx));
        dispatch(fetchDeleteDataStudentById(id));
    }

    const changeSelect = (e:any) => {
        const element = e.target.id;
        const value = e.target.value;
        // setStudent({...student,[element]:Number(value)});
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
                wait={wait}
                persons={persons}
                cancelEdit={cancelEdit}
                save={save}
                type={"students"}
            >
                <div className="professionSemesters">
                    <div className="profession">
                        <label htmlFor="selectProfession">Profesión</label>
                        <Select identify="IdProfession" changeSelect={(e)=>changeSelect(e)} value={student.IdProfession} data={professions.data} disabled={wait} />
                    </div>
                    <div className="selectSemester">
                        <label htmlFor="selectSemester">Semestres</label>
                        <Select identify="IdSemesters" changeSelect={(e)=>changeSelect(e)} value={student.IdSemesters} data={semesters.data} disabled={wait} />
                    </div>
                </div>
            </PersonsForms>
            <TablePersons persons={persons} edit={edit} remove={remove} />
        </ContentStudent>
    );
}
export default DataStudents;