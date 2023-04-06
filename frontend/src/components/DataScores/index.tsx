import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetPersonByRole } from "../../store/module/personStore";
import { changeSelectRole, fetchRoles } from "../../store/module/rolesStore";
import { fetchGetStudents } from "../../store/module/studentsStore";
import { changeSelectPensum, fetchDeleteClassePensum, fetchGetPensum, fetchPostClassePensum, insertSemester } from "../../store/module/pensumStore";
import { changeSelectTeacher, fetchDeleteDataTeacherById, fetchDeleteTeacherByIdPerson, fetchGetTeachers, fetchPostTeachers, fetchUpdateDataTeachers } from "../../store/module/teachersStore";

import { ContentScores, ContentStudent } from "../../styled/style";
import { changeSelectStudent, fetchClassesByProfessionAndSemesters, fetchGetScoresByIdStudent, fetchPostScores, fetchTeachersByProfessionAndSemesters, fetchUpdateScores } from "../../store/module/scoresStore";
import { fetchGetShifts } from "../../store/module/shiftsStore";
import { fetchGetSections } from "../../store/module/sectionsStore";
import { useGetRolesQuery } from "../../store/apis/rolesApi";
import { useGetProfessionQuery } from "../../store/apis/professionApi";
import { studentsApi, useGetStudentsByIdQuery } from "../../store/apis/studentsApi";
import { personApi } from "../../store/apis/personApi";
import { useGetShiftsQuery } from "../../store/apis/shiftsApi";
import { useGetSectionsQuery } from "../../store/apis/sectionsApi";
import { scoresApi, usePostScoreMutation, useUpdateScoreByIdMutation } from "../../store/apis/scoresApi";

import { Select, TablePersons } from "../";

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

const initialDataScores:scores = {
    id:0,
    IdStudents:0,
    IdClasses:0,
    IdTeachers:0,
    IdShifts:0,
    IdSections:0,
    score:0

};

const initialDataStudents:students = {
    id: 0,
    IdPersons: 0,
    IdProfession: 0,
    IdSemesters: 0
}

const teacherByPSC:teacherByPSC = {
    id: 0,
    IdPersons: 0,
    names: "",
    lastNames: "",
    IdClasses: 0,
    IdShifts: 0,
    IdSections: 0
}

function DataScores(){

    const { data:roles=[] } = useGetRolesQuery();
    const { data:shifts=[] } = useGetShiftsQuery();
    const { data:sections=[] } = useGetSectionsQuery();
    const [ updateScoreById ] = useUpdateScoreByIdMutation();
    const [ postScore ] = usePostScoreMutation();

    const [ triggerPersons, { data:persons=[] } ] = personApi.endpoints.getPersonByRole.useLazyQuery();
    const [ triggerStudents, { data:students=initialDataStudents, isSuccess:isSuccessStudents, isFetching:isFetchingStudents } ] = studentsApi.endpoints.getStudentsById.useLazyQuery();
    const [ triggerGetClassesByProfessionAndSemesters, { data:classes=[] } ] = scoresApi.endpoints.getClassesByProfessionAndSemesters.useLazyQuery();
    const [ triggerGetTeachersByProfessionAndSemesters, { data:teachers=[] } ] = scoresApi.endpoints.getTeachersByProfessionAndSemesters.useLazyQuery();
    const [ triggerGetScoresByIdStudent, { data:scores=[] } ] = scoresApi.endpoints.getScoresByIdStudent.useLazyQuery();

    const [ selectRole, setSelectRole ] = useState<number>(0);
    const [ selectPerson, setSelectPeron ] = useState<number>(0);

    const [person, setPerson] = useState(initialDataPerson);
    const [score, setScores] = useState<scores[]>([]);
    const [wait, setWait] = useState<boolean>(false);
    
    useEffect(() => {
        roles.forEach(e=>{
            if (e.names === "Estudiante"){
                const ID:number = Number(e.id);
                setPerson({...person, role:ID});
                setSelectRole(ID);
                triggerPersons(ID)
            }
        });
        return () => {}
    }, [roles]);


    useEffect(() => {
        selectPerson > 0 && triggerGetScoresByIdStudent({IdStudents:selectPerson});
      return () => {}
    }, [selectPerson]);
    
    const edit = async (idx:number) => {
        const IdPersons:number | undefined = persons[idx].id;
        const studentByIdPerson = await triggerStudents(IdPersons).unwrap();
        if(studentByIdPerson){
            const {IdProfession,IdSemesters,id} = studentByIdPerson;
            const classeByIds = await triggerGetClassesByProfessionAndSemesters({IdProfession,IdSemesters}).unwrap();
            const newData:scores[] = classeByIds.map((item:classe)=> { return { ...initialDataScores, IdClasses:item.id, IdStudents:id } } );
            await triggerGetTeachersByProfessionAndSemesters({IdProfession,IdSemesters});
            const scoresById = await triggerGetScoresByIdStudent({IdStudents:id}).unwrap();
            const dataComplet = newData.map((nD:scores)=>{
                const res = scoresById.find(( sC:scores) => nD.IdClasses === sC.IdClasses );
                return res ? res : nD;
            });
            setScores(dataComplet);
        }else{
            const zero:any = 0;
            setScores([]);
            setSelectPeron(zero);
        }
    }

    const remove = (idx:number) => {}
    
    const getNameClasse = (IdClasses:number):string =>{
        return classes.find((item:classe)=>item.id===IdClasses)?.names || "";
    }

    const list = (scoreStudent:scores):[] => {
        const {IdClasses} = scoreStudent;
        const newData:any = [];
        teachers.forEach((t:teacherByPSC)=>{
            if(t.IdClasses===IdClasses){
                const nameShift = shifts.find((s:shifts)=>s.id===t.IdShifts)?.names.toLocaleLowerCase();
                const nameSection = sections.find((s:sections)=>s.id===t.IdSections)?.names;
                newData.push(
                    {
                        id:t.id, 
                        names:`Profesor: ${t.names} ${t.lastNames}  -  Turno: ${nameShift}  -  Seccion: ${nameSection}`
                    }
                );
            }
        });
        return newData;
    }

    const changeSelectN = (e:any,item:any) => {
        const element = e.target.id;
        const value = Number(e.target.value);
        const {IdClasses} = item;
        setScores( (e:scores[])=>{
            return e.map((x:scores)=>{
                if(element==='IdTeachers'){
                    if(x.IdClasses===IdClasses && value===0) return {...x, IdShifts:0, IdSections:0, [element]:value}
                    if(x.IdClasses===IdClasses){
                        const teacher = teachers.find((x:teacherByPSC)=>x.id===value);
                        if(teacher){
                            const { IdShifts, IdSections } = teacher;
                            return {...x, IdShifts, IdSections, [element]:value};
                        }
                    }
                    return x;
                }else{
                    return x.IdClasses===IdClasses ? {...x, [element]:value} : x;
                }
            })
            }
        );
    }

    const cancel = () => {
        const zero:any = 0;
        setSelectPeron(zero);
        setScores([]);
    }

    const save = () => {
        const newData:scores[] = []
        console.log(score)
        score.forEach((item:scores)=>{
            if(item.id===0){
                if(item.IdTeachers && item.IdShifts && item.IdSections){
                    newData.push(item);
                }else{
                    console.log("faltan campos para insertar");
                }
            }else{
                const oldData = scores.find((ele:scores)=>ele.id===item.id);
                if(JSON.stringify(item)!==JSON.stringify(oldData)) updateScoreById(item);
            }
        });
        newData.length > 0 && postScore(newData);
    }

    return(
        <ContentScores className="content" wait={wait}>
            <form onSubmit={(e)=>e.preventDefault()} className='scores' >
                <div>
                    <label>Clases/Materia</label>
                    <label>Profesor</label>
                    <label>Nota</label>
                </div>
                {
                    score.map((item:scores, idx:number)=>{
                        const id = item.id.toString();
                        return(
                            <div key={idx}>
                                <input type="text" name="classes" id={id} value={getNameClasse(item.IdClasses)} disabled={true} />
                                <Select identify="IdTeachers" changeSelect={(e)=>changeSelectN(e, item)} value={item.IdTeachers} data={list(item)} disabled={wait} />
                                <input type="number" name="score" id="score" min="0" max="10" onChange={(e)=>changeSelectN(e, item)} value={item.score} />
                            </div>
                        )
                    })
                }
                {
                    score.length > 0 &&
                        <div className="save">
                            <button className="cancel" onClick={cancel} disabled={wait} >Cancelar</button>
                            <button onClick={save} disabled={wait} >Guardar</button>
                        </div>
                }
            </form>
            <TablePersons persons={persons} edit={edit} remove={remove} />
        </ContentScores>
    );
}

// export default DataScores
export {DataScores}