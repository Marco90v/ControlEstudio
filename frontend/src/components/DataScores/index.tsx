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
import { fetchClassesByProfessionAndSemesters, fetchTeachersByProfessionAndSemesters } from "../../store/module/scoresStore";
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

    // const teachers = useSelector((state:store) => state.teachers);
    // const pensum = useSelector((state:store) => state.pensum);
    
    const [person, setPerson] = useState(initialDataPerson);
    const [classes, setClasses] = useState<classe[]>([]);
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
                setPerson({...person, role:ID});
                dispatch(fetchGetPersonByRole(ID));
            }
        });
        return () => {}
    }, [roles.data]);    

    const changeSelect = (e:any,IdClasses:number) => {
        const element = e.target.id;
        const value = Number(e.target.value);
        const newData = score.map((item:scores)=>{
            return item.IdClasses===IdClasses ? {...item, [element]:value} : item
        })
        setScores(newData);
    }

    const edit = (idx:number) => {
        const IdPersons:number | undefined = persons.data[idx].id;
        const student:students | undefined = students.data.filter((item:students)=>item.IdPersons===IdPersons)[0];
        if(student){
            const {IdProfession,IdSemesters,id} = student;
            dispatch(fetchClassesByProfessionAndSemesters({IdProfession,IdSemesters})).then((items:any)=>{
                const newData:scores[] = items.payload.map((item:classe) => { return { ...initialDataScores, IdClasses:item.id, IdStudents:id } });
                setScores(newData);        
                setClasses(items.payload);
                dispatch(fetchTeachersByProfessionAndSemesters({IdProfession,IdSemesters}));
            });
        }
    }

    const remove = (idx:number) => {
        console.log(idx);
    }

    const listTeachersByClasse = (IdClasses:number):any => {
        return scores.data.teacherByPS.filter((item:teacherByPSC)=>item.IdClasses===IdClasses)
            .map((item:teacherByPSC)=>{
                const names = `${item.names} ${item.lastNames}`;
                return {id:item.id,names}
            }
        );
    }

    const listShiftsByTeacher = (IdClasses:number,idx:number):any => {
        return scores.data.teacherByPS.filter((item:teacherByPSC)=>item.IdClasses===IdClasses && item.id === score[idx].IdTeachers)
            .map((item:teacherByPSC)=>{
                const names = shifts.data.filter((s:shifts)=>s.id===item.IdShifts)[0].names;
                return {id:item.IdShifts,names};
            }
        );
    }

    const listSectionsByTeacher = (IdClasses:number,idx:number):any => {
        return scores.data.teacherByPS.filter((item:teacherByPSC)=>item.IdClasses===IdClasses && item.id === score[idx].IdTeachers && item.IdShifts === score[idx].IdShifts)
            .map((item:teacherByPSC)=>{
                const names = sections.data.filter((s:shifts)=>s.id===item.IdSections)[0].names;
                return {id:item.IdShifts,names};
            }
        );
    }

    return(
        <ContentScores className="content" wait={wait}>
            <form onSubmit={(e)=>e.preventDefault()} >
                {
                    classes.map((item:classe, idx:number)=>{
                        const id = item.id.toString();
                        return(
                            <div key={id}>
                                <input type="text" name="classes" id={id} value={item.names} disabled={true} />
                                <Select identify="IdTeachers" changeSelect={(e)=>changeSelect(e, item.id)} value={score[idx].IdTeachers | 0} data={listTeachersByClasse(item.id)} disabled={wait} />
                                <Select identify="IdShifts" changeSelect={(e)=>changeSelect(e, item.id)} value={score[idx].IdShifts | 0} data={listShiftsByTeacher(item.id,idx)} disabled={wait} />
                                <Select identify="IdSections" changeSelect={(e)=>changeSelect(e, item.id)} value={score[idx].IdSections | 0} data={listSectionsByTeacher(item.id,idx)} disabled={wait} />
                                <input type="text" name="score" id="score" />
                            </div>
                        )
                    })
                }
            </form>
            <TablePersons persons={persons} edit={edit} remove={remove} />
        </ContentScores>
    );
}

export default DataScores