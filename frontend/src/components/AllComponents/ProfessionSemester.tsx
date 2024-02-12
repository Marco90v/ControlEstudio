import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useSelector } from "react-redux";
import { useGetProfessionQuery } from "../../store/apis/professionApi";
import { useGetSemestersQuery } from "../../store/apis/semestersApi";
import { studentsApi, useDeleteStudentByIdMutation, usePostStudentMutation, useUpdateStudentByIdMutation } from "../../store/apis/studentsApi";
import { resetPerson } from "../../store/module/personStore";
import { setStateFetch } from "../../store/module/statusFetch";
import { useAppDispatch } from "../../store/store";
import { fieldNotEmptied } from "../../ultil";
import { Select } from ".."
import { GET_PROFESSIONS, GET_SEMESTERS } from "../../ultil/const";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import useStorePersons from "../../zustanStore/persons";
import useStoreStudentProfessionSemester from "../../zustanStore/studentClasses";
import { gql } from "../../__generated__";

const initialDataStudents:students = {
    id: 0,
    IdPersons: 0,
    IdProfession: 0,
    IdSemesters: 0
}

const GET_PROFESSION_SEMESTER_BY_PERSON = gql(`
    query GetStudentsByPerson($idPersons: Int) {
        getStudentsByPerson(IdPersons: $idPersons) {
            id
            IdPersons
            IdProfession
            IdSemesters
        }
    }
`)

const ADD_STUDENT = gql(`
    mutation AddStudents($dataStudent: inputStudent) {
        addStudents(dataStudent: $dataStudent) {
            id
            IdPersons
            IdProfession
            IdSemesters
        }
    }
`)
const UPDATE_STUDENT = gql(`
    mutation UpdateStudent($dataStudent: inputStudent) {
        updateStudent(dataStudent: $dataStudent) {
            id
            IdPersons
            IdProfession
            IdSemesters
        }
    }
`)
const DELETE_STUDENT_BY_PERSON = gql(`
    mutation DeleteStudentByIdPerson($idPersons: Int) {
        deleteStudentByIdPerson(IdPersons: $idPersons)
    }
`)

const ProfessionSemester = forwardRef( (_, ref) => {
    // const dispatch = useAppDispatch();
    // const { data:professions=[] } = useGetProfessionQuery();
    // const { data:semesters=[] } = useGetSemestersQuery();
    // const {data:person} = useSelector((state:store) => state.person);
    // const {data:statusFetch} = useSelector((state:store) => state.stateFetch);
    // const [ triggerStudents, { data:students=initialDataStudents, isSuccess:isSuccessStudents, isFetching:isFetchingStudents } ] = studentsApi.endpoints.getStudentsById.useLazyQuery();
    // const [ postStudent, { isLoading:isLoadPosStu, isSuccess:isSuccPosStu } ] = usePostStudentMutation();
    // const [ updateStudentById, { isLoading:isLoadUpStuId, isSuccess:isSuccUpStuId } ] = useUpdateStudentByIdMutation();
    // const [ deleteStudentById, { isLoading:isLoadDelStuId, isSuccess:isSuccDelStuId } ] = useDeleteStudentByIdMutation();

    // const professions:any = []
    // const semesters:any = []
    const statusFetch = false

    const idPerson = useStorePersons((state)=>state.data.person.idPerson)
    const {professionSemester, setProfessionSemester, changeProfessionSemester, clearProfessionSemester} = useStoreStudentProfessionSemester((state)=>state)

    const { data:professions } = useQuery(GET_PROFESSIONS);
    const { data:semesters } = useQuery(GET_SEMESTERS);

    const [getProfessionSemesterByPerson, { loading, error, data:dataProfessionSemester, refetch:refetchProfessionSemester } ]= useLazyQuery(GET_PROFESSION_SEMESTER_BY_PERSON);
    const [postStudent, {data:dataPostStudent}] = useMutation(ADD_STUDENT);
    const [useUpdateStudent, {data:dataUpdataStudent}] = useMutation(UPDATE_STUDENT);
    const [deleteStudent, {data:dataDeleteStudent}] = useMutation(DELETE_STUDENT_BY_PERSON);

    const [student, setStudent] = useState(initialDataStudents);

    // useEffect(() => {  
    //     if( isSuccPosStu || isSuccUpStuId || isSuccDelStuId ){
    //         dispatch(resetPerson());
    //         dispatch(setStateFetch(false));
    //     }
    //     return () => {}
    // }, [
    //     isSuccPosStu || isSuccUpStuId || isSuccDelStuId
    // ]);

    // useEffect(() => {
    //     person.id > 0 && triggerStudents(person.id);
    //     person.id === 0 && dispatch(studentsApi.util.resetApiState());
    //     person.id === 0 && setStudent(initialDataStudents);
    //     return () => {}
    //   }, [person]);

    //   useEffect(() => {
    //     setStudent(()=>{
    //         return students ? students : initialDataStudents
    //     });
    //     return () => {}
    // }, [isSuccessStudents, isFetchingStudents]);

    useEffect(() => {
      if(idPerson > 0){
        if(dataProfessionSemester?.getStudentsByPerson?.IdPersons === idPerson){
            setProfessionSemester(dataProfessionSemester?.getStudentsByPerson)
        }else{
            clearProfessionSemester()
            getProfessionSemesterByPerson({
                variables:{
                    idPersons: idPerson
                }
            })
        }
      }
      if(idPerson === 0){
        clearProfessionSemester()
      }
    
      return () => {}
    }, [idPerson])

    useEffect(() => {
      if(dataProfessionSemester?.getStudentsByPerson && dataProfessionSemester?.getStudentsByPerson.id){
        setProfessionSemester(dataProfessionSemester?.getStudentsByPerson)
        // console.log(dataProfessionSemester?.getStudentsByPerson)
      }
    
      return () => {}
    }, [dataProfessionSemester])
    
    

    const changeSelect = (e:any) => {
        const element = e.target.id;
        const value = e.target.value;
        // setStudent((e:students)=>{
        //     return {...e,[element]:Number(value)};
        // });
        // console.log({[element]:value})
        changeProfessionSemester(element, value)
    }

    const newData = (IdPersons:number) => {
        // dispatch(setStateFetch(true));
        // if(student.IdProfession !== 0 && student.IdSemesters !== 0){
        //     const dataStudent = {...student,id:IdPersons, IdPersons};
        //     // postStudent(dataStudent)
        // }else{
        //     // dispatch(resetPerson());
        //     // dispatch(setStateFetch(false));
        // }
        if(professionSemester.IdProfession !== 0 && professionSemester.IdSemesters !== 0){
            const newData = {...professionSemester, id:IdPersons, IdPersons}
            postStudent({
                variables:{
                    dataStudent:newData
                }
            })
            // console.log(newData)
        }
    }

    const updateStudent = ():boolean => {
        let r:boolean = false;
        // if(students?.IdProfession !== student.IdProfession || students?.IdSemesters !== student.IdSemesters){
        //     r = true;
        // }
        return r;
    }

    const editData = () => {
        // dispatch(setStateFetch(true));
        // let updateActive = false;
        const {id,IdPersons,...rStudent} = professionSemester;
        const notEmptiedStudent:boolean = fieldNotEmptied(rStudent);

        if(notEmptiedStudent){
            // if(id !== 0 && updateStudent()){
            //     // updateStudentById(student)
            // }
            // if(id === 0 && IdPersons === 0 && notEmptiedStudent){
            //     // const newStudent = { ...student, IdPersons:person.id };
            //     // postStudent(newStudent)
            // }
            if(id === 0 && IdPersons === 0){
                const newData = {...professionSemester, IdPersons:idPerson}
                postStudent({
                    variables:{
                        dataStudent:newData
                    }
                })
            }else{
                useUpdateStudent({
                    variables:{
                        dataStudent:professionSemester
                    }
                })
            }
        }
        // if(!updateActive){
        //     // dispatch(resetPerson());
        //     // dispatch(setStateFetch(false));
        // } 
    }

    const deleteChildren = (idPersons:number) => {
        // deleteStudentById(IdPersons);
        deleteStudent({
            variables:{
                idPersons
            }
        })
    }

    const save = (IdPersons:number=0) => {
        IdPersons !== 0 ? newData(IdPersons) : editData();
        // newData(IdPersons)
        // editData()
    }

    useImperativeHandle(ref, () => {
        return { save, deleteChildren }
    });   

    return(
        <div className="professionSemesters">
            <div className="profession">
                <label htmlFor="selectProfession">Profesión</label>
                <Select identify="IdProfession" changeSelect={(e)=>changeSelect(e)} value={professionSemester.IdProfession} data={professions?.allProfession} disabled={statusFetch} />
            </div>
            <div className="selectSemester">
                <label htmlFor="selectSemester">Semestres</label>
                <Select identify="IdSemesters" changeSelect={(e)=>changeSelect(e)} value={professionSemester.IdSemesters} data={semesters?.allSemesters} disabled={statusFetch} />
            </div>
        </div>
    )
})

export default ProfessionSemester;
export {ProfessionSemester};