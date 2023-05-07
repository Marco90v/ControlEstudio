import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetRolesQuery } from "../../store/apis/rolesApi";
import { scoresApi, usePostScoreMutation, useUpdateScoreByIdMutation } from "../../store/apis/scoresApi";
import { useGetSectionsQuery } from "../../store/apis/sectionsApi";
import { useGetShiftsQuery } from "../../store/apis/shiftsApi";
import { studentsApi } from "../../store/apis/studentsApi";
import { resetPerson } from "../../store/module/personStore";
import { setStateFetch } from "../../store/module/statusFetch";
import { useAppDispatch } from "../../store/store";
import { Popup } from "../Popup/Popup";
import { Select } from "../Select";

const initialDataScores:scores = {
    id:0,
    IdStudents:0,
    IdClasses:0,
    IdTeachers:0,
    IdShifts:0,
    IdSections:0,
    score:0
};

const cuerpoPopup:any = {
    "edit": <p>¿Desea Guardar los cambios?</p>,
    "delete": <p>Esta acción esta prohibida en este modulo</p>,
    "noData": <p>Usuario sin profesión ni semestre asignado</p>
};

function Record () {
    const dispatch = useAppDispatch();
    const profile = useSelector((state:store) => state.profile);
    const {data:person} = useSelector((state:store) => state.person);
    const {data:statusFetch} = useSelector((state:store) => state.stateFetch);

    const { data:roles=[] } = useGetRolesQuery();
    const { data:shifts=[] } = useGetShiftsQuery();
    const { data:sections=[] } = useGetSectionsQuery();

    const [ updateScoreById, {isLoading:isLoadUpSco, isSuccess:isSuccSuccSco } ] = useUpdateScoreByIdMutation();
    const [ postScore, {isLoading:isLoadPosSco, isSuccess:isSuccPosSco } ] = usePostScoreMutation();
    
    const [ triggerStudents ] = studentsApi.endpoints.getStudentsById.useLazyQuery();
    const [ triggerGetClassesByProfessionAndSemesters, { data:classes=[] } ] = scoresApi.endpoints.getClassesByProfessionAndSemesters.useLazyQuery();
    const [ triggerGetTeachersByProfessionAndSemesters, { data:teachers=[] } ] = scoresApi.endpoints.getTeachersByProfessionAndSemesters.useLazyQuery();
    const [ triggerGetScoresByIdStudent, { data:scores=[] } ] = scoresApi.endpoints.getScoresByIdStudent.useLazyQuery();

    const [score, setScores] = useState<scores[]>([]);
    const [modal,setModal] = useState({type:"", value:false, data:{id:0,names:""}});

    useEffect(() => {  
        if( isSuccSuccSco || isSuccPosSco ) dispatch(setStateFetch(false));
        return () => {}
    }, [ isSuccSuccSco || isSuccPosSco ]);

    useEffect(() => {
        if(person.id > 0){
            getScores();
        }
        if(person.id === 0){
            dispatch(studentsApi.util.resetApiState());
            setScores([]);
        }
    
      return () => {}
    }, [person]);

    const resetInput = () => {
        setScores([]);
    }

    const getScores = async () => {
        const IdPersons:number | undefined = verifyRole() ? profile.id : person.id;
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
            setModal({type:"noData",value:true, data:{id:0,names:""}});
        }
    }
    
    const verifyRole = () => {
        const role = roles.find((e:role)=>e.id === profile.role)?.names ?? false;
        return role === "Estudiante" ? true : false;
    }
    const getNameClasse = (IdClasses:number):string =>{
        return classes.find((item:classe)=>item.id===IdClasses)?.names || "";
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
    // const isWait = () => {return false}
    const permisions = (...rls:number[]) => {
        const temp = rls.find( e => e===profile.role );
        return temp ? false : true;
    }
    const save = () => {
        setModal({type:"edit",value:true, data:{id:0,names:""}});
    }
    const cancel = () => {
        dispatch(resetPerson());
    }
    const updateScores = () => {
        dispatch(setStateFetch(true));
        const newData:scores[] = []
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
    const aceptCallback = () => {
        switch (modal.type) {
            case "edit":
                updateScores();
                break;
        }
        setModal((datos:any)=>{
            return{
                ...datos,
                type:"", value:false,  data:{id:0,names:""}
            }
        });
    }
    return(
        <>
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
                                <Select
                                    identify = "IdTeachers"
                                    changeSelect = {(e)=>changeSelectN(e, item)}
                                    value = {item.IdTeachers}
                                    data = {list(item)}
                                    disabled = { statusFetch || permisions(1) }
                                />
                                <input
                                    type = "number"
                                    name = "score"
                                    id = "score"
                                    min = "0"
                                    max = "10"
                                    onChange = {(e)=>changeSelectN(e, item)}
                                    value = {item.score}
                                    disabled = { statusFetch || permisions(1,2) }
                                />
                            </div>
                        )
                    })
                }
                {
                    score.length > 0 &&
                        <div className="save">
                            <button className="cancel" onClick={cancel} disabled={ statusFetch } >Cancelar</button>
                            <button onClick={save} disabled={ statusFetch || permisions(1,2) } >Guardar</button>
                        </div>
                }
            </form>
            {
                modal.value && <Popup key={'Record'} setModal={setModal} aceptCallback={aceptCallback} > {cuerpoPopup[modal.type]} </Popup>
            }
        </>
    )
}
export { Record }