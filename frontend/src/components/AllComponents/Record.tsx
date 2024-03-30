import { useEffect, useState } from "react";
import { Popup, Select, Button, Input} from "../";
import useStoreProfile from "../../zustanStore/profile";
import useStorePersons from "../../zustanStore/persons";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client/react/hooks";
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

    const { data:roles } = useQuery(GET_ROLES);
    const { data:shifts } = useQuery(GET_SHIFTS);
    const { data:sections } = useQuery(GET_SECTIONS);

    const [getStudentByPerson, { data:personData }] = useLazyQuery(GET_STUDENT_BY_PERSON)
    const [getDataScores, { data:data }] = useLazyQuery(DATA_SCORES)

    const [AddScore, { loading:loadingAddScore}] = useMutation(ADD_SCORE)
    const [UpdateScore, { loading:loadingUpdateScore }] = useMutation(UPDATE_SCORE)

    const loading = loadingAddScore || loadingUpdateScore

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
            <form className="border-solid border-l border-r border-b border-gray-200 mb-4 rounded-lg min-h-32 shadow" onSubmit={(e)=>e.preventDefault()} >
                <div className="grid grid-cols-[1fr_1fr_5rem] gap-x-4 mb-4 bg-gray-300 text-gray-500 rounded-md p-[0.5rem_0_0.5rem_0.5rem]">
                    <label className="font-bold">Clases/Materia</label>
                    <label className="font-bold">Profesor</label>
                    <label className="font-bold">Nota</label>
                </div>
                {
                    scores.map((item:scores, idx:number)=>{
                        const id = item.id.toString();
                        return(
                            <div className="grid grid-cols-[1fr_1fr_5rem] gap-x-4 m-4" key={idx}>
                                <Input type="text" id={id} name={id} value={getNameClasse(item.IdClasses)} disabled={true} className="w-full" />
                                <Select
                                    identify = "IdTeachers"
                                    changeSelect = {(e)=>changeSelectN(e, item)}
                                    value = {item.IdTeachers}
                                    data = {list(item)}
                                    disabled = { loading || permisions(1) }
                                />
                                <Input
                                    type="number"
                                    id="score"
                                    name="score"
                                    value={item.score}
                                    onChange={(e)=>changeSelectN(e, item)}
                                    disabled={loading || permisions(1,2)}
                                    className="w-full"
                                    otherAtributes={{
                                        min:"0",
                                        max:"20"
                                    }}
                                />
                            </div>
                        )
                    })
                }
                {
                    scores.length > 0 &&
                        <div className="grid grid-cols-[1fr_auto_auto] gap-4 m-4">
                            <p className="ml-auto mr-8 font-bold italic px-4 rounded bg-gray-200 text-gray-700">Estudiante: <span className="font-normal">{person.names} {person.lastNames}</span></p>
                            <Button type="button" color="red" className="font-semibold text-white ml-auto" onClick={cancel} disabled={ loading } >Cancelar</Button>
                            <Button type="button" color="green" className="font-semibold text-white items-end" onClick={save} disabled={ loading || permisions(1,2) } >Guardar</Button>
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