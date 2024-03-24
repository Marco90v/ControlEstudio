import { forwardRef, useEffect, useImperativeHandle } from "react";
import { fieldNotEmptied } from "../../ultil";
import { Select } from ".."
import { ADD_STUDENT, DELETE_STUDENT_BY_PERSON, GET_PROFESSIONS, GET_PROFESSION_SEMESTER_BY_PERSON, GET_SEMESTERS, UPDATE_STUDENT, identifySelect } from "../../ultil/const";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client/react/hooks";
import useStorePersons from "../../zustanStore/persons";
import useStoreStudentProfessionSemester from "../../zustanStore/studentClasses";

const ProfessionSemester = forwardRef( (_, ref) => {
    
    const idPerson = useStorePersons((state)=>state.data.person.idPerson)
    const {professionSemester, setProfessionSemester, changeProfessionSemester, clearProfessionSemester} = useStoreStudentProfessionSemester((state)=>state)
    
    const { data:professions } = useQuery(GET_PROFESSIONS);
    const { data:semesters } = useQuery(GET_SEMESTERS);
    
    const [getProfessionSemesterByPerson, { loading:loadingGetSemesterByPerson, data:dataProfessionSemester, refetch:refetchProfessionSemester } ]= useLazyQuery(GET_PROFESSION_SEMESTER_BY_PERSON);
    const [postStudent, {loading:loadingAddStudent}] = useMutation(ADD_STUDENT);
    const [UpdateStudent, {loading:loadingUpdateStudent}] = useMutation(UPDATE_STUDENT);
    const [deleteStudent, {loading:loadingDeleteStudentByPerson}] = useMutation(DELETE_STUDENT_BY_PERSON);

    const loading = loadingGetSemesterByPerson || loadingAddStudent || loadingUpdateStudent || loadingDeleteStudentByPerson

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

    // const updateStudent = ():boolean => {
    //     let r:boolean = false;
    //     return r;
    // }

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
                UpdateStudent({
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
        <div className="col-start-1 col-end-4 grid grid-rows-[1fr] grid-cols-[auto_auto] gap-4">
            <div className="grid grid-rows-[1fr] grid-cols-[auto_1fr] gap-x-4">
                <label htmlFor="selectProfession">Profesión</label>
                <Select
                    identify={identifySelect.IDPROFESSION}
                    changeSelect={(e)=>changeSelect(e)}
                    value={professionSemester.IdProfession}
                    data={professions?.allProfession}
                    disabled={loading}
                />
            </div>
            <div className="grid grid-rows-[1fr] grid-cols-[auto_1fr] gap-x-4">
                <label htmlFor="selectSemester">Semestres</label>
                <Select
                    identify={identifySelect.IDSEMESTERS}
                    changeSelect={(e)=>changeSelect(e)}
                    value={professionSemester.IdSemesters}
                    data={semesters?.allSemesters}
                    disabled={loading}
                />
            </div>
        </div>
    )
})

export default ProfessionSemester;
export {ProfessionSemester};