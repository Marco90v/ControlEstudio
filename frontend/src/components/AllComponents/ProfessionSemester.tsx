import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { fieldNotEmptied } from "../../ultil";
import { Select } from ".."
import { ADD_STUDENT, DELETE_STUDENT_BY_PERSON, GET_PROFESSIONS, GET_PROFESSION_SEMESTER_BY_PERSON, GET_SEMESTERS, UPDATE_STUDENT } from "../../ultil/const";
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

const ProfessionSemester = forwardRef( (_, ref) => {
    const statusFetch = false

    const idPerson = useStorePersons((state)=>state.data.person.idPerson)
    const {professionSemester, setProfessionSemester, changeProfessionSemester, clearProfessionSemester} = useStoreStudentProfessionSemester((state)=>state)

    const { data:professions } = useQuery(GET_PROFESSIONS);
    const { data:semesters } = useQuery(GET_SEMESTERS);

    const [getProfessionSemesterByPerson, { loading, error, data:dataProfessionSemester, refetch:refetchProfessionSemester } ]= useLazyQuery(GET_PROFESSION_SEMESTER_BY_PERSON);
    const [postStudent, {data:dataPostStudent}] = useMutation(ADD_STUDENT);
    const [useUpdateStudent, {data:dataUpdataStudent}] = useMutation(UPDATE_STUDENT);
    const [deleteStudent, {data:dataDeleteStudent}] = useMutation(DELETE_STUDENT_BY_PERSON);

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
      }
    
      return () => {}
    }, [dataProfessionSemester])
    
    

    const changeSelect = (e:any) => {
        const element = e.target.id;
        const value = e.target.value;
        changeProfessionSemester(element, value)
    }

    const newData = (IdPersons:number) => {
        if(professionSemester.IdProfession !== 0 && professionSemester.IdSemesters !== 0){
            const newData = {...professionSemester, id:IdPersons, IdPersons}
            postStudent({
                variables:{
                    dataStudent:newData
                }
            })
        }
    }

    const updateStudent = ():boolean => {
        let r:boolean = false;
        return r;
    }

    const editData = () => {
        const {id,IdPersons,...rStudent} = professionSemester;
        const notEmptiedStudent:boolean = fieldNotEmptied(rStudent);

        if(notEmptiedStudent){
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
    }

    const deleteChildren = (idPersons:number) => {
        deleteStudent({
            variables:{
                idPersons
            }
        })
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