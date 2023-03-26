import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClasses } from "../../store/module/classesStore";
import { changeSelectPerson, fetchDeletePersonById, fetchGetPersonByRole, fetchPostPerson, fetchUpdatePersonById } from "../../store/module/personStore";
import { fetchGetProfession } from "../../store/module/professionStore";
import { fetchRoles, changeSelectRole } from "../../store/module/rolesStore";
import { fetchGetSections } from "../../store/module/sectionsStore";
import { fetchGetSemesters } from "../../store/module/semestersStore";
import { fetchGetShifts } from "../../store/module/shiftsStore";
import { changeSelectTeacher, fetchDeleteDataTeacherById, fetchDeleteTeacherByIdPerson, fetchGetTeachers, fetchGetTeachersById, fetchPostTeachers, fetchUpdateDataTeachers } from "../../store/module/teachersStore";
import { ContentTeacher, Img, SelectStyle, Table } from "../../styled/style";
import Select from "../Select";

import imgEdit from "../../assets/edit-solid-24.png";
import imgTrash from "../../assets/trash-alt-solid-24.png";

const initialDataPerson:person = {
    idPerson:0,
    name: "",
    lastNames: "",
    sex: "",
    email: "",
    phone: 0,
    photo: "",
    role: 0
};
const initialDataTeacher:teacher = {
    id:0,
    IdPersons:0,
    IdProfession:0,
    IdSemesters:0,
    IdClasses:0,
    IdShifts:0,
    IdSections:0
}

function DataTeacher(){
    const dispatch = useDispatch();
    const roles = useSelector((state:store) => state.roles);
    const profession = useSelector((state:store) => state.profession);
    const semesters = useSelector((state:store) => state.semesters);
    const classes = useSelector((state:store) => state.classes);
    const shifts = useSelector((state:store) => state.shifts);
    const sections = useSelector((state:store) => state.sections);
    const teachers = useSelector((state:store) => state.teachers);
    const persons = useSelector((state:store) => state.persons);

    const [person, setPerson] = useState(initialDataPerson);
    const [teacher, setTeacher] = useState<teacher[]>([]);
    const [deleteDataTeacher, setDeleteDataTeacher] = useState<number[]>([0]);
    const [wait, setWait] = useState<boolean>(false);

    useEffect(() => {
        const promiseRoles = dispatch(fetchRoles());
        const promiseProfession = dispatch(fetchGetProfession());
        const promiseSemesters = dispatch(fetchGetSemesters());
        const promiseClasses = dispatch(fetchClasses());
        const promiseShifts = dispatch(fetchGetShifts());
        const promiseSections = dispatch(fetchGetSections());
        const promiseTeachers = dispatch(fetchGetTeachers());
        return () => {
            promiseRoles.abort();
            promiseProfession.abort();
            promiseSemesters.abort();
            promiseClasses.abort();
            promiseShifts.abort();
            promiseSections.abort();
            promiseTeachers.abort();
        }
    }, []);
    
    useEffect(() => {
        roles.data.forEach(e=>{
            if (e.names === "Profesor"){
                const ID:any = e.id;
                dispatch(changeSelectRole(ID));
                setPerson({...person, role:ID});
                dispatch(fetchGetPersonByRole(ID))
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

    const addProfession = (e:any) => {
        setTeacher([...teacher,initialDataTeacher]);
    }

    const deleteItem = (idx:number) => {
        setTeacher(teacher.filter((t,i)=>{
            if(i===idx && t.IdPersons>0){
                setDeleteDataTeacher([...deleteDataTeacher,t.id]);
            }else if(i!==idx){
                return t;
            }
        }));
    }

    const changeSelect = (e:any,idx:number) => {
        const element = e.target.id;
        const value = e.target.value;
        setTeacher(teacher.map((e,i)=>{
            return i===idx ? {...e, [element]:Number(value)} : e
        }));
    }

    const resetInput = () => {
        setPerson({...initialDataPerson,role:person.role});
        setTeacher([]);
        const zero:any = 0;
        dispatch(changeSelectPerson(zero));
    }
    
    const newData = () => {
        const {name, lastNames, email, phone, sex} = person;
        const notEmptied:boolean = fieldNotEmptied({name, lastNames, email, phone, sex});
        const newData = {...person,names:name, phone:Number(phone), id:persons.selectPerson};
        if(notEmptied){
            dispatch(fetchPostPerson(newData)).then((res:any)=>{
                const IdPersons = res.payload.id;
                if(teacher.length > 0){
                    const dataTeacher = teacher.map(e=>{return {...e, IdPersons}});
                    dispatch(fetchPostTeachers(dataTeacher)).then((res:any)=>{
                        setWait(false);
                        resetInput();
                    });
                }else{
                    setWait(false);
                    resetInput();
                }
            });
        }
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

    const editData = () => {
        const {name, lastNames, email, phone, sex, photo, role} = person;
        const newData = {...person,names:name, phone:Number(phone), id:persons.selectPerson};

        const notEmptied:boolean = fieldNotEmptied({name, lastNames, email, phone, sex, role});
        if(notEmptied){
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
        if(deleteDataTeacher.length > 0){
            setWait(true);
            dispatch(fetchDeleteDataTeacherById(deleteDataTeacher)).then(()=>{
                setWait(false);
            });
        } 
        teacher.forEach((item:teacher)=>{
            for (const key in teachers.data){
                if(item.id === teachers.data[key].id){
                    if(JSON.stringify(item) !== JSON.stringify(teachers.data[key])){
                        dispatch(fetchUpdateDataTeachers(item));
                    }
                }
            }
            const {id,IdPersons,...rTeacher} = item;
            const notEmptied:boolean = fieldNotEmptied(rTeacher);

            if(id === 0 && IdPersons === 0 && notEmptied){
                const newTeacher = [{...item, IdPersons:teachers.selectTeachers}]
                dispatch(fetchPostTeachers(newTeacher));
            }
        });
        setWait(false);
        resetInput();
    }

    const save = () => {
        setWait(true);
        persons.selectPerson === 0 ? newData() : editData();
    }

    const edit = (idx:number) => {
        const {id, name,lastNames, sex, email, phone, photo, role} = persons.data[idx];
        const idPerson:any = Number(id);
        const newDataTeacher:teacher[] = teachers.data.filter((item:teacher)=>item.IdPersons===idPerson);
        setDeleteDataTeacher([]);
        setPerson({ idPerson, name, lastNames, sex, email, phone, photo, role });
        setTeacher(newDataTeacher);
        dispatch(changeSelectPerson(idPerson));
        dispatch(changeSelectTeacher(idPerson));
    }

    const cancelEdit = () => {
        const zero:any = 0;
        setPerson({...initialDataPerson,role:person.role});
        setTeacher([]);
        setDeleteDataTeacher([]);
        dispatch(changeSelectPerson(zero));
        dispatch(changeSelectTeacher(zero));
    }

    const remove = (idx:number=0) => {
        dispatch(fetchDeletePersonById(idx));
        dispatch(fetchDeleteTeacherByIdPerson(idx));
    }

    return(
        <ContentTeacher className="content" wait={wait}>
            <form className="newTeacher" onSubmit={(e)=>e.preventDefault()} >
                <div className="dataUser">
                    <div className="names">
                        <label htmlFor="name">Nombre Completo</label>
                        <input type="text" name="name" id="name" value={person.name} onChange={e=>changeDataPerson(e)} disabled={wait} />
                    </div>
                    <div className="lastNames">
                        <label htmlFor="lastNames">Apellido Completo</label>
                        <input type="text" name="lastNames" id="lastNames" value={person.lastNames} onChange={e=>changeDataPerson(e)} disabled={wait} />
                    </div>
                    <div className="sex">
                        <label htmlFor="selectSex">Genero</label>
                        <SelectStyle name="sex" id="sex" value={person.sex} onChange={e=>changeDataPerson(e)} disabled={wait} >
                            <option value=""></option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                        </SelectStyle>
                    </div>
                    <div className="data">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" value={person.email} onChange={e=>changeDataPerson(e)} disabled={wait} />
                        <label htmlFor="phone">Telefono</label>
                        <input type="number" name="phone" id="phone" value={person.phone || ""} onChange={e=>changeDataPerson(e)} disabled={wait} />
                        <label htmlFor="role">Rol</label>
                        <Select identify="role" changeSelect={(e)=>changeRole(e)} value={roles.selectRole} data={roles.data} disabled={true} />
                        <label htmlFor="photo">Foto</label>
                        <input type="file" name="photo" id="photo" disabled={true} />
                    </div>
                </div>
                <div className="dataTeacher">
                    {
                        teacher?.map((e,i)=>{
                            return <div className="dataClasses" key={i}>
                                <div className="listProfession">
                                    <label htmlFor="profession">Profesiones/Carreras</label>
                                    <Select identify="IdProfession" changeSelect={(e)=>changeSelect(e,i)} value={e.IdProfession} data={profession.data} disabled={wait} />
                                </div>
                                <div className="listSemesters">
                                    <label htmlFor="semesters">Semestres</label>
                                    <Select identify="IdSemesters" changeSelect={(e)=>changeSelect(e,i)} value={e.IdSemesters} data={semesters.data} disabled={wait} />
                                </div>
                                <div className="listClasses">
                                    <label htmlFor="classes">Clases</label>
                                    <Select identify="IdClasses" changeSelect={(e)=>changeSelect(e,i)} value={e.IdClasses} data={classes.data} disabled={wait} />
                                </div>
                                <div className="listShifts">
                                    <label htmlFor="shifts">Turnos</label>
                                    <Select identify="IdShifts" changeSelect={(e)=>changeSelect(e,i)} value={e.IdShifts} data={shifts.data} disabled={wait} />
                                </div>
                                <div className="listSections">
                                    <label htmlFor="sections">Secciones</label>
                                    <Select identify="IdSections" changeSelect={(e)=>changeSelect(e,i)} value={e.IdSections} data={sections.data} disabled={wait} />
                                </div>
                                <div className="delete">
                                    <button onClick={()=>deleteItem(i)} disabled={wait} >Eliminar</button>
                                </div>
                            </div>
                        })
                    }
                    <div className="addClass">
                        <button onClick={(e)=>addProfession(e)} disabled={wait} >Agregar Clase</button>
                    </div>
                </div>
                <div className="save">
                    {
                        persons.selectPerson === 0 ?
                        <button onClick={save} disabled={wait} >Guardar</button> :
                        <>
                            <button onClick={()=>cancelEdit()} className="cancel" disabled={wait} >Cancelar</button>
                            <button className="edit" onClick={save} disabled={wait} >Guardar cambios</button>
                        </>
                    }
                </div>
            </form>
            <Table>
                <thead>
                    <tr>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Telefono</th>
                        <th>Correo</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        persons.data.map((item:person,idx:number)=>{
                            return(
                                <tr key={idx}>
                                    <td>{item.names}</td>
                                    <td>{item.lastNames}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.email}</td>
                                    <td onClick={()=>edit(idx)} ><Img src={imgEdit} alt="edit" /></td>
                                    <td onClick={()=>remove(item.id)} ><Img className="red" src={imgTrash} alt="delete" /></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </ContentTeacher>
    )
}

export default DataTeacher;