import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetPersonByRole } from "../../store/module/personStore";
import { changeSelectRole, fetchRoles } from "../../store/module/rolesStore";
import { fetchGetStudents } from "../../store/module/studentsStore";
import { changeSelectPensum, fetchDeleteClassePensum, fetchGetPensum, fetchPostClassePensum, insertSemester } from "../../store/module/pensumStore";
import { changeSelectTeacher, fetchDeleteDataTeacherById, fetchDeleteTeacherByIdPerson, fetchGetTeachers, fetchPostTeachers, fetchUpdateDataTeachers } from "../../store/module/teachersStore";

import { ContentScores, ContentStudent } from "../../styled/style";
import Select from "../Select";
import TablePersons from "../TablePersons";
import { changeSelectStudent, fetchClassesByProfessionAndSemesters, fetchGetScoresByIdStudent, fetchPostScores, fetchTeachersByProfessionAndSemesters, fetchUpdateScores } from "../../store/module/scoresStore";
import { fetchGetShifts } from "../../store/module/shiftsStore";
import { fetchGetSections } from "../../store/module/sectionsStore";

const initialDataPerson:person = {
    id:0,
    idPerson:0,
    name: "",
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

function DataScores(){
    const dispatch = useDispatch();
    const roles = useSelector((state:store) => state.roles);
    const persons = useSelector((state:store) => state.persons);
    const students = useSelector((state:store) => state.students);
    const scores = useSelector((state:store) => state.scores);
    const shifts = useSelector((state:store) => state.shifts);
    const sections = useSelector((state:store) => state.sections);

    const [person, setPerson] = useState(initialDataPerson);
    const [score, setScores] = useState<scores[]>([]);
    const [wait, setWait] = useState<boolean>(false);
    
    useEffect(() => {
        const promiseRoles = dispatch(fetchRoles());
        const promiseStudents = dispatch(fetchGetStudents());
        const promiseShifts = dispatch(fetchGetShifts());
        const promiseSections = dispatch(fetchGetSections());
        return () => {
            promiseRoles.abort();
            promiseStudents.abort();
            promiseShifts.abort();
            promiseSections.abort();
        }
    }, []);

    useEffect(() => {
        roles.data.forEach(e=>{
            if (e.names === "Estudiante"){
                const ID:any = e.id;
                dispatch(changeSelectRole(ID));
                dispatch(fetchGetPersonByRole(ID));
                setPerson({...person, role:ID});
            }
        });
        return () => {}
    }, [roles.data]);

    useEffect(() => {
        scores.selectStudent > 0 && dispatch(fetchGetScoresByIdStudent(scores.selectStudent));
      return () => {}
    }, [scores.selectStudent]);
    
    const edit = (idx:number) => {
        const IdPersons:number | undefined = persons.data[idx].id;
        const student:students | undefined = students.data.filter((item:students)=>item.IdPersons===IdPersons)[0];
        if(student){
            const {IdProfession,IdSemesters,id} = student;
            const _id:any = id;
            dispatch(fetchClassesByProfessionAndSemesters({IdProfession,IdSemesters})).then((items:any)=>{
                const newData:scores[] = items.payload.map((item:classe) => { return { ...initialDataScores, IdClasses:item.id, IdStudents:id } });
                dispatch(fetchTeachersByProfessionAndSemesters({IdProfession,IdSemesters})).then(()=>{
                    dispatch(fetchGetScoresByIdStudent(id)).then((item:any)=>{
                        const dataComplet = newData.map((nD:scores)=>{
                            const res = item.payload.find((sC:scores)=>nD.IdClasses===sC.IdClasses);
                            return res ? res : nD;
                        });
                        dispatch(changeSelectStudent(_id));
                        setScores(dataComplet);
                    });
                });
            });
        }else{
            const zero:any = 0;
            setScores([]);
            dispatch(changeSelectStudent(zero));
        }
    }

    const remove = (idx:number) => {}
    
    const getNameClasse = (IdClasses:number):string =>{
        return scores.data.classes.find((item:classe)=>item.id===IdClasses)?.names || "";
    }

    const list = (scoreStudent:scores):[] => {
        const {IdClasses} = scoreStudent;
        const newData:any = [];
        scores.data.teacherByPS.forEach((t:teacherByPSC)=>{
            if(t.IdClasses===IdClasses){
                const nameShift = shifts.data.find((s:shifts)=>s.id===t.IdShifts)?.names.toLocaleLowerCase();
                const nameSection = sections.data.find((s:sections)=>s.id===t.IdSections)?.names;
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
                        const {IdShifts,IdSections} = scores.data.teacherByPS.find((x:teacherByPSC)=>x.id===value);
                        return {...x, IdShifts, IdSections, [element]:value};
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
        dispatch(changeSelectStudent(zero));
        setScores([]);
    }

    const save = () => {
        const newData:scores[] = []
        score.forEach((item:scores)=>{
            if(item.id===0){
                if(item.IdTeachers && item.IdShifts && item.IdSections){
                    newData.push(item);
                }else{
                    console.log("faltan campos para insertar");
                }
            }else{
                const oldData = scores.data.scores.find((ele:scores)=>ele.id===item.id);
                if(JSON.stringify(item)!==JSON.stringify(oldData)) dispatch(fetchUpdateScores(item));
            }
        });
        newData.length > 0 && dispatch(fetchPostScores(newData));
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

export default DataScores