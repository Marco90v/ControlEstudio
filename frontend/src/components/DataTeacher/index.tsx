import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClasses } from "../../store/module/classesStore";
import { changeSelectPerson, fetchDeletePersonById, fetchGetPersonByRole, fetchPostPerson, fetchUpdatePersonById } from "../../store/module/personStore";
import { fetchGetProfession } from "../../store/module/professionStore";
import { fetchRoles, changeSelectRole } from "../../store/module/rolesStore";
import { fetchGetSections } from "../../store/module/sectionsStore";
import { fetchGetSemesters } from "../../store/module/semestersStore";
import { fetchGetShifts } from "../../store/module/shiftsStore";
import { changeSelectTeacher, fetchDeleteDataTeacherById, fetchDeleteTeacherByIdPerson, fetchGetTeachers, fetchPostTeachers, fetchUpdateDataTeachers } from "../../store/module/teachersStore";
import { ContentTeacher } from "../../styled/style";
import Select from "../Select";

import PersonsForms from "../PersonsForms";
import TablePersons from "../TablePersons";
import { useGetRolesQuery } from "../../store/apis/rolesApi";
import { useGetShiftsQuery } from "../../store/apis/shiftsApi";
import { useGetSectionsQuery } from "../../store/apis/sectionsApi";
import { useGetProfessionQuery } from "../../store/apis/professionApi";
import { useGetSemestersQuery } from "../../store/apis/semestersApi";
import { useGetClassesQuery } from "../../store/apis/classesApi";
import { personApi, useDeletePersonByIdMutation, usePostPersonMutation, useUpdatePersonByIdMutation } from "../../store/apis/personApi";
import { teacherApi, useDeleteTeacherByIdMutation, useDeleteTeacherByIdPersonMutation, usePostTeacherMutation, useUpdateTeacherByIdMutation } from "../../store/apis/teacherApi";

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

    const { data:roles=[] } = useGetRolesQuery();
    const { data:shifts=[] } = useGetShiftsQuery();
    const { data:sections=[] } = useGetSectionsQuery();
    const { data:professions=[] } = useGetProfessionQuery();
    const { data:semesters=[] } = useGetSemestersQuery();
    const { data:classes=[] } = useGetClassesQuery();

    const [ postPerson ] = usePostPersonMutation();
    const [ updatePerson ] = useUpdatePersonByIdMutation();
    const [ deletePersonById ] = useDeletePersonByIdMutation();
    
    const [ postTeacher ] = usePostTeacherMutation();
    const [ updateTeacherById ] = useUpdateTeacherByIdMutation();
    const [ deleteTeacherById ] = useDeleteTeacherByIdMutation();
    const [ deleteTeacherByIdPerson ] = useDeleteTeacherByIdPersonMutation();

    const [ triggerPersons, { data:persons=[] } ] = personApi.endpoints.getPersonByRole.useLazyQuery();
    const [ triggerTeacher, { data:teachers=[], isSuccess:isSuccessTeacher, isFetching:isFetchingTeacher } ] = teacherApi.endpoints.getTeacherById.useLazyQuery();

    const [ selectRole, setSelectRole ] = useState<number>(0);
    const [ selectPerson, setSelectPeron ] = useState<number>(0);


    const [person, setPerson] = useState(initialDataPerson);
    const [teacher, setTeacher] = useState<teacher[]>([]);
    const [deleteDataTeacher, setDeleteDataTeacher] = useState<number[]>([0]);
    const [wait, setWait] = useState<boolean>(false);

    useEffect(() => {
        roles.forEach(e=>{
            if (e.names === "Profesor"){
                const ID:number = Number(e.id);
                setPerson({...person, role:ID});
                setSelectRole(ID);
                triggerPersons(ID);
            }
        });
        return () => {}
    }, [roles]);

    useEffect(() => {
        setTeacher(teachers);
      return () => {}
    }, [isSuccessTeacher, isFetchingTeacher])
   

    const changeRole = (e:any) => {
        const ID:any = Number(e.target.value);
        setSelectRole(ID);
        changeDataPerson(e);
    }

    const changeDataPerson = (e:any) => {
        const camp = e.target.name;
        const value = e.target.value;
        setPerson((item)=>{return {...item, [camp]:value}});
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
        setTeacher( (e:teacher[]) => {
            return e.map((e,i)=>{
                return i===idx ? {...e, [element]:Number(value)} : e
            });
        });
    }

    const resetInput = () => {
        setPerson({...initialDataPerson,role:person.role});
        setTeacher([]);
        const zero:any = 0;
        setSelectPeron(zero)
    }
    
    const newData = async () => {
        const {name, lastNames, email, phone, sex} = person;
        const notEmptied:boolean = fieldNotEmptied({name, lastNames, email, phone, sex});
        const newData = {...person, phone:Number(phone), id:selectPerson};
        if(notEmptied){
            const insert = {
                body: newData,
                role: selectRole
            }
            try{
                const { insertId:IdPersons } = await postPerson(insert).unwrap();
                if(teacher.length > 0){
                    const newTeachers = {
                        body: teacher.map(e=>{return {...e, IdPersons}}),
                        id: selectPerson
                    }
                    postTeacher(newTeachers);
                }
            }catch(error){
                console.log(error);
            }
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
        const {names, lastNames, email, phone, sex, photo, role} = person;
        const newData:person = {...person,names, phone:Number(phone), id:selectPerson};

        const notEmptied:boolean = fieldNotEmptied({names, lastNames, email, phone, sex, role});
        if(notEmptied){
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
        if(deleteDataTeacher.length > 0){
            setWait(true);
            deleteTeacherById(deleteDataTeacher)
        } 
        teacher.forEach((item:teacher)=>{
            for (const key in teachers){
                if(item.id === teachers[key].id){
                    if(JSON.stringify(item) !== JSON.stringify(teachers[key])){
                        const updateData = {
                            body: item,
                            role: selectPerson
                        }
                        updateTeacherById(updateData);
                    }
                }
            }
            const {id,IdPersons,...rTeacher} = item;
            const notEmptied:boolean = fieldNotEmptied(rTeacher);

            if(id === 0 && IdPersons === 0 && notEmptied){
                const newTeachers = {
                    body: [{...item, IdPersons:selectPerson}],
                    id: selectPerson
                }
                postTeacher(newTeachers);

            }
        });
        setWait(false);
        resetInput();
    }

    const save = () => {
        selectPerson === 0 ? newData() : editData();
    }

    const edit = (idx:number) => {
        const {id, name, lastNames, sex, email, phone, photo, role} = persons[idx];
        const idPerson:any = Number(id);
        const newData = {...persons[idx], idPerson};
        setDeleteDataTeacher([]);
        setPerson(newData);
        setSelectPeron(idPerson);
        triggerTeacher(idPerson);
    }

    const cancelEdit = () => {
        const zero:any = 0;
        setPerson({...initialDataPerson,role:person.role});
        setTeacher([]);
        setDeleteDataTeacher([]);
        setSelectPeron(zero);
    }

    const remove = (idx:number=0) => {
        const deleteData = {body:{id:idx},role:selectRole}
        deletePersonById(deleteData);
        deleteTeacherByIdPerson({idPersons:idx});
    }

    return(
        <ContentTeacher className="content" wait={wait}>
            <PersonsForms
                person={person}
                changeRole={changeRole}
                changeDataPerson={changeDataPerson}
                roles={roles}
                selectRole={selectRole}
                wait={wait}
                selectPerson={selectPerson}
                cancelEdit={cancelEdit}
                save={save}
                type={"teacher"}
            >
               <div className="dataTeacher">
                    {
                        teacher.map((e:teacher,i)=>{
                            const {} = e
                            return <div className="dataClasses" key={i}>
                                <div className="listProfession">
                                    <label htmlFor="profession">Profesiones/Carreras</label>
                                    <Select identify="IdProfession" changeSelect={(e)=>changeSelect(e,i)} value={e.IdProfession} data={professions} disabled={wait} />
                                </div>
                                <div className="listSemesters">
                                    <label htmlFor="semesters">Semestres</label>
                                    <Select identify="IdSemesters" changeSelect={(e)=>changeSelect(e,i)} value={e.IdSemesters} data={semesters} disabled={wait} />
                                </div>
                                <div className="listClasses">
                                    <label htmlFor="classes">Clases</label>
                                    <Select identify="IdClasses" changeSelect={(e)=>changeSelect(e,i)} value={e.IdClasses} data={classes} disabled={wait} />
                                </div>
                                <div className="listShifts">
                                    <label htmlFor="shifts">Turnos</label>
                                    <Select identify="IdShifts" changeSelect={(e)=>changeSelect(e,i)} value={e.IdShifts} data={shifts} disabled={wait} />
                                </div>
                                <div className="listSections">
                                    <label htmlFor="sections">Secciones</label>
                                    <Select identify="IdSections" changeSelect={(e)=>changeSelect(e,i)} value={e.IdSections} data={sections} disabled={wait} />
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
            </PersonsForms>
            <TablePersons persons={persons} edit={edit} remove={remove} />
        </ContentTeacher>
    )
}

export default DataTeacher;