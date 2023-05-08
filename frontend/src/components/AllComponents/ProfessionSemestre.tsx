import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useSelector } from "react-redux";
import { useGetProfessionQuery } from "../../store/apis/professionApi";
import { useGetSemestersQuery } from "../../store/apis/semestersApi";
import { studentsApi, useDeleteStudentByIdMutation, usePostStudentMutation, useUpdateStudentByIdMutation } from "../../store/apis/studentsApi";
import { resetPerson } from "../../store/module/personStore";
import { setStateFetch } from "../../store/module/statusFetch";
import { useAppDispatch } from "../../store/store";
import { fieldNotEmptied } from "../../ultil";
import { Select } from "./Select"

const initialDataStudents:students = {
    id: 0,
    IdPersons: 0,
    IdProfession: 0,
    IdSemesters: 0
}

const ProfessionSemesters = forwardRef( (_, ref) => {
    const dispatch = useAppDispatch();
    const { data:professions=[] } = useGetProfessionQuery();
    const { data:semesters=[] } = useGetSemestersQuery();
    const {data:person} = useSelector((state:store) => state.person);
    const {data:statusFetch} = useSelector((state:store) => state.stateFetch);
    const [ triggerStudents, { data:students=initialDataStudents, isSuccess:isSuccessStudents, isFetching:isFetchingStudents } ] = studentsApi.endpoints.getStudentsById.useLazyQuery();
    const [ postStudent, { isLoading:isLoadPosStu, isSuccess:isSuccPosStu } ] = usePostStudentMutation();
    const [ updateStudentById, { isLoading:isLoadUpStuId, isSuccess:isSuccUpStuId } ] = useUpdateStudentByIdMutation();
    const [ deleteStudentById, { isLoading:isLoadDelStuId, isSuccess:isSuccDelStuId } ] = useDeleteStudentByIdMutation();
    const [student, setStudent] = useState(initialDataStudents);

    useEffect(() => {  
        if( isSuccPosStu || isSuccUpStuId || isSuccDelStuId ){
            dispatch(resetPerson());
            dispatch(setStateFetch(false));
        }
        return () => {}
    }, [
        isSuccPosStu || isSuccUpStuId || isSuccDelStuId
    ]);

    useEffect(() => {
        person.id > 0 && triggerStudents(person.id);
        person.id === 0 && dispatch(studentsApi.util.resetApiState());
        person.id === 0 && setStudent(initialDataStudents);
        return () => {}
      }, [person]);

      useEffect(() => {
        setStudent(()=>{
            return students ? students : initialDataStudents
        });
        return () => {}
    }, [isSuccessStudents, isFetchingStudents]);

    const changeSelect = (e:any) => {
        const element = e.target.id;
        const value = e.target.value;
        setStudent((e:students)=>{
            return {...e,[element]:Number(value)};
        });
    }

    const newData = (IdPersons:number) => {
        dispatch(setStateFetch(true));
        if(student.IdProfession !== 0 && student.IdSemesters !== 0){
            const dataStudent = {...student,id:IdPersons, IdPersons};
            postStudent(dataStudent)
        }else{
            dispatch(resetPerson());
            dispatch(setStateFetch(false));
        }
    }

    const updateStudent = ():boolean => {
        let r:boolean = false;
        if(students?.IdProfession !== student.IdProfession || students?.IdSemesters !== student.IdSemesters){
            r = true;
        }
        return r;
    }

    const editData = () => {
        dispatch(setStateFetch(true));
        let updateActive = false;
        const {id,IdPersons,...rStudent} = student;
        const notEmptiedStudent:boolean = fieldNotEmptied(rStudent);

        if(notEmptiedStudent){
            if(id !== 0 && updateStudent()){
                updateStudentById(student)
            }
            if(id === 0 && IdPersons === 0 && notEmptiedStudent){
                const newStudent = { ...student, IdPersons:person.id };
                postStudent(newStudent)
            }
        }
        if(!updateActive){
            dispatch(resetPerson());
            dispatch(setStateFetch(false));
        } 
    }

    const deleteChildren = (IdPersons:{IdPersons:number}) => {
        deleteStudentById(IdPersons);
    }

    const save = (IdPersons:number=0) => {
        IdPersons !== 0 ? newData(IdPersons) : editData();
    }

    useImperativeHandle(ref, () => {
        return { save, deleteChildren }
    });   

    return(
        <div className="professionSemesters">
            <div className="profession">
                <label htmlFor="selectProfession">Profesión</label>
                <Select identify="IdProfession" changeSelect={(e)=>changeSelect(e)} value={student.IdProfession} data={professions} disabled={statusFetch} />
            </div>
            <div className="selectSemester">
                <label htmlFor="selectSemester">Semestres</label>
                <Select identify="IdSemesters" changeSelect={(e)=>changeSelect(e)} value={student.IdSemesters} data={semesters} disabled={statusFetch} />
            </div>
        </div>
    )
})

export { ProfessionSemesters }