import { useEffect, useState } from "react";
import { Popup, Select} from "../";
import useStoreProfile from "../../zustanStore/profile";
import useStorePersons from "../../zustanStore/persons";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { ADD_SCORE, DATA_SCORES, GET_ROLES, GET_SECTIONS, GET_SHIFTS, GET_STUDENT_BY_PERSON, UPDATE_SCORE } from "../../ultil/const";
import useStoreStudentProfessionSemester from "../../zustanStore/studentClasses";
import useStoreScores from "../../zustanStore/scores";
import { filter__typename } from "../../ultil";
import { ClassesByProfessionAndSemesters, TeachersByProfessionAndSemesters } from "../../__generated__/graphql";

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
    const profile = useStoreProfile((state)=>state.profile)
    const {professionSemester, setProfessionSemester, clearProfessionSemester} = useStoreStudentProfessionSemester((state)=>state)
    const {classes, teachers,scores, setClasses, setTeachers, setScores, changeScores, clearScore } = useStoreScores((state)=>state)
    const person = useStorePersons((state)=>state.data.person)
    const clearPerson = useStorePersons((state)=>state.clearPerson)
    const statusFetch = false

    const { data:roles } = useQuery(GET_ROLES);
    const { data:shifts } = useQuery(GET_SHIFTS);
    const { data:sections } = useQuery(GET_SECTIONS);

    const [getStudentByPerson, { data:personData }] = useLazyQuery(GET_STUDENT_BY_PERSON)
    const [getDataScores, { data:data }] = useLazyQuery(DATA_SCORES)

    const [AddScore, { data:dataAddScore }] = useMutation(ADD_SCORE)
    const [UpdateScore, { data:dataUpdateScore }] = useMutation(UPDATE_SCORE)


    const [modal,setModal] = useState({type:"", value:false, data:{id:0,names:""}});

    useEffect(() => {
        if(person.id > 0){
            getScores();
        }    
      return () => {}
    }, [person]);

    useEffect(() => {
        if(personData?.getStudentsByPerson && personData?.getStudentsByPerson.IdPersons > 0){
            setProfessionSemester(filter__typename(personData.getStudentsByPerson))
        }    
      return () => {}
    }, [personData])

    useEffect(() => {
        setDataScores()
      return () => {}
    }, [data])
    

    useEffect(() => {
      if(professionSemester.IdPersons>0){
        getClassesAndTeachers()
      }
    
      return () => {}
    }, [professionSemester])
        

    const resetInput = () => {
        // setScores([]);
    }

    const setDataScores = () => {
        if(data){
            const {
                getClassesByProfessionAndSemesters,
                getTeachersByProfessionAndSemesters,
                getScores} = data
            if(getClassesByProfessionAndSemesters && getClassesByProfessionAndSemesters.length >0){
                const c = getClassesByProfessionAndSemesters.map(e=>filter__typename<ClassesByProfessionAndSemesters>(e))
                setClasses(c)
            }
            if(getTeachersByProfessionAndSemesters && getTeachersByProfessionAndSemesters.length >0){
                const t = getTeachersByProfessionAndSemesters.map(e=>filter__typename<TeachersByProfessionAndSemesters>(e))
                setTeachers(t)
            }
            if(getClassesByProfessionAndSemesters && getClassesByProfessionAndSemesters.length >0 && getScores){
                const c = getClassesByProfessionAndSemesters.map(e=>filter__typename<ClassesByProfessionAndSemesters>(e))
                const newScores = c.map(e=>({...initialDataScores,IdClasses:e.id, IdStudents:professionSemester.id }))
                const completScores = newScores.map(nS=>{
                    const res = getScores.find(s=>nS.IdClasses === s?.IdClasses)
                    return res ? res : nS;
                })
                setScores(completScores)
            }
        }
    }

    const getClassesAndTeachers = () => {
        getDataScores({
            variables:{
                professionAndSemesters: {
                    IdProfession: professionSemester.IdProfession,
                    IdSemesters: professionSemester.IdSemesters
                },
                idStudents: professionSemester.id,
            }
        })
    }

    const getScores = async () => {
        const IdPersons:number | undefined = verifyRole() ? profile.id : person.id;
        if(personData?.getStudentsByPerson && personData?.getStudentsByPerson?.IdPersons > 0 && person.id === personData?.getStudentsByPerson?.IdPersons){
            setProfessionSemester(filter__typename(personData.getStudentsByPerson))
            setDataScores()
        }else{
            clearScore()
            getStudentByPerson({
                variables:{
                    idPersons:IdPersons
                }
            })
        }
    }
    
    const verifyRole = () => {
        if(roles?.allRoles){
            const role = roles?.allRoles.find((e)=>e?.id === profile.role)?.names ?? false;
            return role === "Estudiante" ? true : false;
        }else{
            return false
        }
    }
    const getNameClasse = (IdClasses:number):string =>{
        return classes.find((item:classe)=>item.id===IdClasses)?.names || "";
    }
    const changeSelectN = (e:any,item:any) => {
        const element = e.target.id;
        const value = Number(e.target.value);
        const {IdClasses} = item;
        changeScores(element, value, IdClasses)
    }
    const list = (scoreStudent:scores):[] => {
        const {IdClasses} = scoreStudent;
        const newData:any = [];
        teachers.forEach((t:teacherByPSC)=>{
            if(t.IdClasses===IdClasses){
                if(shifts?.allShifts && sections?.allSections){
                    const nameShift = shifts?.allShifts.find((s)=>s?.id===t.IdShifts)?.names.toLocaleLowerCase();
                    const nameSection = sections?.allSections.find((s)=>s?.id===t.IdSections)?.names;
                    newData.push(
                        {
                            id:t.id, 
                            names:`Profesor: ${t.names} ${t.lastNames}  -  Turno: ${nameShift}  -  Seccion: ${nameSection}`
                        }
                    );
                }
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
        clearPerson()
        clearProfessionSemester()
        clearScore()
    }
    const updateScores = () => {
        const newData:scores[] = []
        const tempOld = data?.getScores?.map(i=>filter__typename<ClassesByProfessionAndSemesters>(i)) || []

        scores.forEach((item:scores)=>{
            if(item.id===0){
                if(item.IdTeachers && item.IdShifts && item.IdSections){
                    newData.push(item);
                }else{
                    console.log("faltan campos para insertar");
                }
            }else{
                const existData = tempOld.find(ele=>ele.id===item.id)
                if(JSON.stringify(item)!==JSON.stringify(existData)){
                    UpdateScore({
                        variables:{
                            dataScores:[item]
                        }
                    })
                }
            }
        });
        newData.length > 0 && AddScore({
            variables:{
                dataScores: newData
            }
        })
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
                    scores.map((item:scores, idx:number)=>{
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
                                    max = "20"
                                    onChange = {(e)=>changeSelectN(e, item)}
                                    value = {item.score}
                                    disabled = { statusFetch || permisions(1,2) }
                                />
                            </div>
                        )
                    })
                }
                {
                    scores.length > 0 &&
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
export default Record;
export {Record};