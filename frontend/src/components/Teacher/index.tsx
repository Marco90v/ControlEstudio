import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useSelector } from "react-redux";
import { teacherApi, useDeleteTeacherByIdMutation, useDeleteTeacherByIdPersonMutation, usePostTeacherMutation, useUpdateTeacherByIdMutation } from "../../store/apis/teacherApi";
import { resetPerson } from "../../store/module/personStore";
import { setStateFetch } from "../../store/module/statusFetch";
import { useAppDispatch } from "../../store/store";
import { fieldNotEmptied } from "../../ultil";
import { SectionClasses } from "../SectionClasses";

const initialDataTeacher:teacher = {
    id:0,
    IdPersons:0,
    IdProfession:0,
    IdSemesters:0,
    IdClasses:0,
    IdShifts:0,
    IdSections:0
}

const Teacher = forwardRef( (_, ref) => {
    const dispatch = useAppDispatch();
    const { data:person } = useSelector((state:store) => state.person);
    const { data:statusFetch } = useSelector((state:store) => state.stateFetch);
    const [ triggerTeacher, { data:teachers=[], isSuccess:isSuccessTeacher, isFetching:isFetchingTeacher } ] = teacherApi.endpoints.getTeacherById.useLazyQuery();
    const [ postTeacher, { isLoading:isLoadPosTea, isSuccess:isSuccPosTea } ] = usePostTeacherMutation();
    const [ updateTeacherById, { isLoading:isLoadUpTeaId, isSuccess:isSuccUpTeaId } ] = useUpdateTeacherByIdMutation();
    const [ deleteTeacherById, { isLoading:isLoadDelTeaId, isSuccess:isSuccDelTeaId } ] = useDeleteTeacherByIdMutation();
    const [ deleteTeacherByIdPerson, { isLoading:isLoadDelTeaIdPer, isSuccess:isSuccDelTeaIdPer } ] = useDeleteTeacherByIdPersonMutation();
    const [ teacher, setTeacher ] = useState<teacher[]>([]);
    const [ deleteDataTeacher, setDeleteDataTeacher ] = useState<number[]>([]);

    useEffect(() => {  
        if( isSuccPosTea || isSuccUpTeaId || isSuccDelTeaId || isSuccDelTeaIdPer ){
            dispatch(resetPerson());
            dispatch(setStateFetch(false));
        }
        return () => {}
    }, [
        isSuccPosTea, isSuccUpTeaId, isSuccDelTeaId, isSuccDelTeaIdPer
    ]);

    useEffect(() => {
      person.id > 0 && triggerTeacher(person.id);
      person.id === 0 && dispatch(teacherApi.util.resetApiState());
      return () => {}
    }, [person]);

    useEffect(() => {
        setTeacher(teachers);
        return () => {}
    }, [isSuccessTeacher, isFetchingTeacher]);
    

    const addProfession = (e:any) => {
        setTeacher([...teacher,initialDataTeacher]);
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

    const deleteItem = (idx:number) => {
        setTeacher(teacher.filter((t,i)=>{
            if(i===idx && t.IdPersons>0){
                setDeleteDataTeacher([...deleteDataTeacher,t.id]);
            }else if(i!==idx){
                return t;
            }
        }));
    }

    const editData = () => {
        let updateActive = false;
        if(deleteDataTeacher.length > 0){
            deleteTeacherById(deleteDataTeacher)
        } 
        teacher.forEach((item:teacher)=>{
            for (const key in teachers){
                if(item.id === teachers[key].id){
                    if(JSON.stringify(item) !== JSON.stringify(teachers[key])){
                        const updateData = {
                            body: item,
                            role: person.role
                        }
                        updateTeacherById(updateData);
                        updateActive=true;
                    }
                }
            }
            const {id,IdPersons,...rTeacher} = item;
            const notEmptied:boolean = fieldNotEmptied(rTeacher);

            if(id === 0 && IdPersons === 0 && notEmptied){
                const newTeachers = {
                    body: [{...item, IdPersons:person.id}],
                    id: person.id
                }
                postTeacher(newTeachers);
                updateActive=true;
            }
        });
        if(!updateActive){
            dispatch(resetPerson());
            dispatch(setStateFetch(false));
        } 
    }

    const newData = (IdPersons:number) => {
        if(teacher.length > 0){
            const newTeachers = {
                body: teacher.map(e=>{return {...e, IdPersons}}),
                id: 0
            }
            postTeacher(newTeachers);
        }else{
            dispatch(resetPerson());
            dispatch(setStateFetch(false));
        }
    }

    const save = (IdPersons:number=0) => {
        IdPersons !== 0 ? newData(IdPersons) : editData();
    }

    const deleteChildren = (IdPersons:{IdPersons:number}) => {
        deleteTeacherByIdPerson(IdPersons);
    }

    useImperativeHandle(ref, () => {
        return { save, deleteChildren }
    });    

    return(
        <div className="dataTeacher">
            {
                teacher.map((t:teacher,i)=>{
                    return <SectionClasses key={i} idx={i} teacher={t} changeSelect={changeSelect} deleteItem={deleteItem} disabled={statusFetch}/>
                })
            }
            <div className="addClass">
                <button onClick={(e)=>addProfession(e)} disabled={statusFetch} >Agregar Clase</button>
            </div>
        </div>
    )
});
export {Teacher};