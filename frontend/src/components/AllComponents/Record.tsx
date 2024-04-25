import { useEffect } from "react";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";
import Popup from "./Popup";
import { TABLE_NAME } from "../../ultil/const";
import useStoreStudentProfessionSemester from "../../zustanStore/studentClasses";
import { useShallow } from "zustand/react/shallow";
import { supaService } from "../../supabase/supaService";
import { useSupabase } from "../../hooks/useSupabase";
import useStoreProfile from "../../zustanStore/profile";
import useStorePersons from "../../zustanStore/persons";
import useStoreScores from "../../zustanStore/scores";
import useStoreSupabase from "../../zustanStore/supabase";
import useStoreLoading from "../../zustanStore/loading";
import useStoreRoles from "../../zustanStore/roles";
import useStoreShifts from "../../zustanStore/shifts";
import useStoreSections from "../../zustanStore/sections";
import useStoreModal from "../../zustanStore/modal";

function Record () {

    const { supabase } = useStoreSupabase(useShallow(state=>({
        supabase:state.supabase
    })))
    const {getAll, updateMultiple, insertSingle,
        getClassesByProfessionAndSemesters:getClaByProAndSem,
        getTeachersByProfessionAndSemesters: getTeaByProAndSem} = supaService(supabase)

    const {handlerLoading, handlerError} = useStoreLoading(useShallow((state=>({
        handlerError: state.handlerError,
        handlerLoading: state.handlerLoading
    }))))

    const { handlerChange, type } = useStoreModal(useShallow((state=>({
        handlerChange: state.handlerChange,
        dataModal: state.data,
        type: state.type,
        value: state.value
    }))))

    const {profile} = useStoreProfile(useShallow((state=>({
        profile: state.profile,
    }))))

    const {roles, setRoles} = useStoreRoles(useShallow((state=>({
        roles: state.roles,
        setRoles: state.setRoles,
    }))))

    const {shifts, setShift} = useStoreShifts(useShallow((state=>({
        shifts: state.shifts,
        setShift: state.setShift,
    }))))

    const {sections, setSections} = useStoreSections(useShallow((state=>({
        sections: state.sections,
        setSections: state.setSections,
    }))))

    const { professionSemester, setProfessionSemester, clearProfessionSemester } = useStoreStudentProfessionSemester(useShallow((state=>({
        professionSemester: state.professionSemester,
        setProfessionSemester: state.setProfessionSemester,
        clearProfessionSemester: state.clearProfessionSemester,
    }))))

    const {classes, teachers, scores, setClasses, setTeachers, setScores, changeScores, clearScore} = useStoreScores(useShallow((state=>({
        classes: state.classes,
        teachers: state.teachers,
        scores: state.scores,
        setClasses: state.setClasses,
        setTeachers: state.setTeachers,
        setScores: state.setScores,
        changeScores: state.changeScores,
        clearScore: state.clearScore,
    }))))

    const { person, clearPerson } = useStorePersons(useShallow((state=>({
        person: state.data.person,
        clearPerson: state.clearPerson
    }))))

    const {getSupabase:getRole} = useSupabase(TABLE_NAME.ROLES,handlerLoading, handlerError)
    const {getSupabase:getShifts} = useSupabase(TABLE_NAME.SHIFTS,handlerLoading, handlerError)
    const {getSupabase:getSections} = useSupabase(TABLE_NAME.SECTIONS,handlerLoading, handlerError)
    const {getSupabase:getStuByPer} = useSupabase(TABLE_NAME.STUDENTS,handlerLoading, handlerError)
    const {getClassesOrTeacherByProfessionAndSemesters:getClaOrTeaByProAndSem} = useSupabase(TABLE_NAME.PENSUM,handlerLoading, handlerError)
    const {getSupabase:getScore, updateMultipleSupabase:updateScore, insertMultipleSupabase:insertScore} = useSupabase(TABLE_NAME.SCORES,handlerLoading, handlerError)

    useEffect(() => {
        if(person.id > 0){
            const IdPersons:number | undefined = verifyRole() ? profile.id : person.id;
            const eqObj={
                eq:"IdPersons",
                eqData:IdPersons
            }
            getStuByPer(getAll, setProfessionSemester, eqObj)
        }    
      return () => {}
    }, [person])
    
    useEffect(() => {
        roles.length <= 0 && getRole(getAll, setRoles)
        shifts.length <= 0 && getShifts(getAll, setShift)
        sections.length <= 0 && getSections(getAll, setSections)
        return () => {}
    }, [])    

    useEffect(() => {
      if(professionSemester.IdPersons>0){
        const { id, IdProfession, IdSemesters } = professionSemester
        const eqObj={
            IdProfession,
            IdSemesters,
        }
        getClaOrTeaByProAndSem(getClaByProAndSem,eqObj, setClasses)
        getClaOrTeaByProAndSem(getTeaByProAndSem,eqObj, setTeachers)
        const eqObj2 = {
            eq:"IdStudents",
            eqData:id
        }
        getScore(getAll, setScores, eqObj2)
      }
    
      return () => {}
    }, [professionSemester])
    
    const verifyRole = () => {
        if(roles){
            const role = roles.find((e)=>e?.id === profile.role)?.names ?? false;
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
                if(shifts && sections){
                    const nameShift = shifts.find((s)=>s?.id===t.IdShifts)?.names.toLocaleLowerCase();
                    const nameSection = sections.find((s)=>s?.id===t.IdSections)?.names;
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
        handlerChange({type:"edit",value:true,data:{id:0, names:""}})
    }
    const cancel = () => {
        clearPerson()
        clearProfessionSemester()
        clearScore()
    }
    const updateScores = () => {
        const newData:scores[] = []
        const updateData:scores[] = []

        scores.forEach((item:scores)=>{
            if(item.id===0){
                if(item.IdTeachers && item.IdShifts && item.IdSections){
                    newData.push(item);
                }else{
                    console.log("faltan campos para insertar");
                }
            }else{
                updateData.push(item)
            }
        });
        updateData.length > 0 && updateScore(updateMultiple, updateData, cancel)
        newData.length > 0 && insertScore(insertSingle, newData, cancel)
    }

    const cancelCallBack = () => {
        handlerChange({type:"",value:false,data:{id:0, names:""}})
    }

    const aceptCallback = (type:string) => {
        switch (type) {
            case "edit":
                updateScores();
                break;
        }
        handlerChange({type:"",value:false,data:{id:0, names:""}})
    }

    const bodyModal = (type:string, value:string, data:any, valueModal:boolean) => {
        if(type === "edit") return <p>¿Desea Guardar los cambios?</p>
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
                                    disabled = { permisions(1) }
                                />
                                <Input
                                    type="number"
                                    id="score"
                                    name="score"
                                    value={item.score}
                                    onChange={(e)=>changeSelectN(e, item)}
                                    disabled={ permisions(1,2)}
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
                            <Button type="button" color="red" className="font-semibold text-white ml-auto" onClick={cancel} >Cancelar</Button>
                            <Button type="button" color="green" className="font-semibold text-white items-end" onClick={save} disabled={ permisions(1,2) } >Guardar</Button>
                        </div>
                }
            </form>
            {
                type === "edit" &&
                <Popup key={'Record'} cancelCallBack={cancelCallBack} aceptCallback={aceptCallback} bodyModal={bodyModal} />
            }
        </>
    )
}
export default Record;
export {Record};