import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useSelector } from "react-redux";
import { teacherApi, useDeleteTeacherByIdMutation, useDeleteTeacherByIdPersonMutation, usePostTeacherMutation, useUpdateTeacherByIdMutation } from "../../store/apis/teacherApi";
import { resetPerson } from "../../store/module/personStore";
import { setStateFetch } from "../../store/module/statusFetch";
import { useAppDispatch } from "../../store/store";
import { fieldNotEmptied } from "../../ultil";
import { SectionClasses } from "../";
import useStorePersons from "../../zustanStore/persons";
import { useApolloClient, useLazyQuery, useMutation } from "@apollo/client";
import { gql } from "../../__generated__";
import useStoreTeacherClasses from "../../zustanStore/teacherClasse";

const initialDataTeacher:teacher = {
    id:0,
    IdPersons:0,
    IdProfession:0,
    IdSemesters:0,
    IdClasses:0,
    IdShifts:0,
    IdSections:0
}

const GET_TEACHER_BY_PERSON = gql(`
    query GetTeacherByPerson($getTeacherByPersonId: Int) {
        getTeacherByPerson(id: $getTeacherByPersonId) {
            id
            IdPersons
            IdProfession
            IdSemesters
            IdClasses
            IdShifts
            IdSections
        }
    }
`)

const ADD_TEACHER = gql(`
    mutation AddTeacher($dataTeacher: [inputTeacher]) {
        addTeacher(dataTeacher: $dataTeacher)
    }
`)

const UPDATE_TEACHER = gql(`
    mutation UpdateTeacher($dataTeacher: [inputTeacher]) {
        updateTeacher(dataTeacher: $dataTeacher)
    }
`)

const DELETE_TEACHER = gql(`
    mutation DeleteTeacher($ids: [Int]) {
        deleteTeacher(ids: $ids)
    }
`)

const DELETE_TEACHER_BY_PERSON = gql(`
    mutation DeleteTeacherByIdPerson($idPersons: Int) {
        deleteTeacherByIdPerson(IdPersons: $idPersons)
    }
`)

const Teacher = forwardRef( (_, ref) => {

    const statusFetch = false

    const idPerson = useStorePersons((state)=>state.data.person.idPerson)
    const {teacherClasses, idsDelete, setTeacherClasses, clearTeacherClasses, addTeacherClasse, changeTeacherClasse, deleteTeacherClasse} = useStoreTeacherClasses((state)=>state)

    const [postTeacher, { data:dataAddTeacher, reset:resetAddTeacher }] = useMutation(ADD_TEACHER)
    const [updateTeacher, { data:dataUpdateTeacher, reset:resetUpdateTeacher }] = useMutation(UPDATE_TEACHER)
    const [deleteTeacher, { data:dataDelete, reset:resetDelete }] = useMutation(DELETE_TEACHER)

    const [getTeacherByPerson, { loading, error, data:dataTeachers, refetch:refetchPerson } ]= useLazyQuery(GET_TEACHER_BY_PERSON);
    const [deleteTeacherByPerson, { data:dataDeleteByPerson, reset:resetDeleteByPerson }] = useMutation(DELETE_TEACHER_BY_PERSON)


    const [ teacher, setTeacher ] = useState<teacher[]>([]);
    const [ deleteDataTeacher, setDeleteDataTeacher ] = useState<number[]>([]);

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
             /**
             * ADD_TEACHERS
             */
            postTeacher({
                variables: {
                    dataTeacher: newTeachers
                }
            })
        }else{
            // dispatch(resetPerson());
            // dispatch(setStateFetch(false));
        }
    }

    const save = (IdPersons:number=0) => {
        IdPersons !== 0 ? newData(IdPersons) : editData();
    }

    const deleteChildren = (idPersons:number) => {
        // deleteTeacherByIdPerson(IdPersons);
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
                    return <SectionClasses key={i} idx={i} teacher={t} changeSelect={changeSelect} deleteItem={deleteItem} disabled={statusFetch}/>
                })
            }
            <div className="addClass">
                <button onClick={(e)=>addProfession(e)} disabled={statusFetch} >Agregar Clase</button>
            </div>
        </div>
    )
});
export default Teacher;
export {Teacher};