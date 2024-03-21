import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { fieldNotEmptied } from "../../ultil";
import { SectionClasses } from "../";
import useStorePersons from "../../zustanStore/persons";
import { useLazyQuery, useMutation } from "@apollo/client";
import useStoreTeacherClasses from "../../zustanStore/teacherClasse";
import { ADD_TEACHER, DELETE_TEACHER, DELETE_TEACHER_BY_PERSON, GET_TEACHER_BY_PERSON, UPDATE_TEACHER } from "../../ultil/const";

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

    const idPerson = useStorePersons((state)=>state.data.person.idPerson)
    const {teacherClasses, idsDelete, setTeacherClasses, clearTeacherClasses, addTeacherClasse, changeTeacherClasse, deleteTeacherClasse} = useStoreTeacherClasses((state)=>state)
    
    const [postTeacher, { loading:loadingAddTeacher }] = useMutation(ADD_TEACHER)
    const [updateTeacher, { loading:loadingUpdateTeacher }] = useMutation(UPDATE_TEACHER)
    const [deleteTeacher, { loading:loadingDeleteTeacher }] = useMutation(DELETE_TEACHER)
    const [getTeacherByPerson, { loading:loadingGetTeacherByPerson, data:dataTeachers } ]= useLazyQuery(GET_TEACHER_BY_PERSON);
    const [deleteTeacherByPerson, { loading:loadingDeleteTeacherByPerson }] = useMutation(DELETE_TEACHER_BY_PERSON)

    const loading = loadingAddTeacher || loadingUpdateTeacher || loadingDeleteTeacher || loadingGetTeacherByPerson || loadingDeleteTeacherByPerson

    useEffect(() => {
        if(idPerson > 0){
            if(dataTeachers?.getTeacherByPerson[0]?.IdPersons === idPerson){
                setTeacherClasses(dataTeachers?.getTeacherByPerson)
            }else{
                clearTeacherClasses()
                getTeacherByPerson({
                    variables:{
                        getTeacherByPersonId: idPerson
                    }
                })
            }
        }
        if(idPerson === 0){
            clearTeacherClasses()
        }
      return () => {}
    }, [idPerson])
    
    useEffect(() => {
        if(dataTeachers?.getTeacherByPerson && dataTeachers?.getTeacherByPerson?.length > 0){
            setTeacherClasses(dataTeachers?.getTeacherByPerson)
        }
      return () => {}
    }, [dataTeachers])
    
    const addProfession = (e:any) => {
        addTeacherClasse(initialDataTeacher)
    }

    const changeSelect = (e:any,idx:number) => {
        const element = e.target.id;
        const value = e.target.value;
        changeTeacherClasse(element, value, idx)
    }

    const deleteItem = (idx:number) => {
        deleteTeacherClasse(idx)
    }

    const editData = () => {
        let newData:any = []
        let updateData:any = []

        teacherClasses.forEach((e,i)=>{
            const {id,IdPersons,...rTeacher} = e;
            const notEmptied:boolean = fieldNotEmptied(rTeacher);
            if(e.id === 0 && e.IdPersons === 0 && notEmptied){
                const temp = {...e, IdPersons:idPerson}
                newData.push(temp)
            }
            if(e.id > 0 && e.IdPersons > 0 && notEmptied){
                updateData.push(e)
            }
        })
      
        updateTeacher({
            variables:{
                dataTeacher:updateData
            }
        })

        newData.length > 0 && postTeacher({
            variables:{
                dataTeacher:newData
            }
        })

        idsDelete.length > 0 && deleteTeacher({
            variables:{
                ids:idsDelete
            }
        })
    }

    const newData = (IdPersons:number) => {
        if(teacherClasses.length > 0){
            const newTeachers = teacherClasses.map(e=>({...e,IdPersons}))
            // ADD_TEACHERS
            postTeacher({
                variables: {
                    dataTeacher: newTeachers
                }
            })
        }
    }

    const save = (IdPersons:number=0) => {
        IdPersons !== 0 ? newData(IdPersons) : editData();
    }

    const deleteChildren = (idPersons:number) => {
        deleteTeacherByPerson({
            variables:{
                idPersons
            }
        })
    }

    useImperativeHandle(ref, () => {
        return { save, deleteChildren }
    });    

    return(
        <div className="dataTeacher">
            {
                teacherClasses.map((t:teacher,i)=>{
                    return (
                        <SectionClasses
                            key={i}
                            idx={i}
                            teacher={t}
                            changeSelect={changeSelect}
                            deleteItem={deleteItem}
                            disabled={loading}
                        />
                    )
                })
            }
            <div className="addClass">
                <button onClick={(e)=>addProfession(e)} disabled={loading} >Agregar Clase</button>
            </div>
        </div>
    )
});
export default Teacher;
export {Teacher};