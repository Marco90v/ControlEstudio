import { useEffect, useState } from "react";
import { ContentScores } from "../../styled/style";
import { useGetRolesQuery } from "../../store/apis/rolesApi";
import { studentsApi } from "../../store/apis/studentsApi";
import { personApi } from "../../store/apis/personApi";
import { useGetShiftsQuery } from "../../store/apis/shiftsApi";
import { useGetSectionsQuery } from "../../store/apis/sectionsApi";
import { scoresApi, usePostScoreMutation, useUpdateScoreByIdMutation } from "../../store/apis/scoresApi";
import { Popup, Select, TablePersons } from "../";
import { useSelector } from "react-redux";

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

function DataScores(){

    const profile = useSelector((state:store) => state.profile);

    const { data:roles=[] } = useGetRolesQuery();
    const { data:shifts=[] } = useGetShiftsQuery();
    const { data:sections=[] } = useGetSectionsQuery();
    const [ updateScoreById, {isLoading:isLoadUpSco, isSuccess:isSuccSuccSco } ] = useUpdateScoreByIdMutation();
    const [ postScore, {isLoading:isLoadPosSco, isSuccess:isSuccPosSco } ] = usePostScoreMutation();

    const [ triggerPersons, { data:persons=[] } ] = personApi.endpoints.getPersonByRole.useLazyQuery();
    const [ triggerStudents ] = studentsApi.endpoints.getStudentsById.useLazyQuery();
    const [ triggerGetClassesByProfessionAndSemesters, { data:classes=[] } ] = scoresApi.endpoints.getClassesByProfessionAndSemesters.useLazyQuery();
    const [ triggerGetTeachersByProfessionAndSemesters, { data:teachers=[] } ] = scoresApi.endpoints.getTeachersByProfessionAndSemesters.useLazyQuery();
    const [ triggerGetScoresByIdStudent, { data:scores=[] } ] = scoresApi.endpoints.getScoresByIdStudent.useLazyQuery();

    const [modal,setModal] = useState({type:"", value:false, data:{id:0,names:""}});

    const [ selectPerson, setSelectPeron ] = useState<number>(0);
    const [person, setPerson] = useState(initialDataPerson);
    const [score, setScores] = useState<scores[]>([]);

    useEffect(() => {  
        if( isSuccSuccSco || isSuccPosSco ) resetInput();
        return () => {}
    }, [ isSuccSuccSco || isSuccPosSco ]);
    
    useEffect(() => {
        roles.forEach(e=>{
            if (e.names === "Estudiante"){
                const ID:number = Number(e.id);
                if(e.id !== profile.role){
                    triggerPersons(ID);
                }else{
                    edit();
                }
                setPerson(()=>{
                    if(e.id === profile.role){
                        return {...profile, idPerson: profile.id, photo:''};
                    }else{
                        return {...person, role:ID};
                    }
                });
            }
        });
        return () => {}
    }, [roles]);

    useEffect(() => {
        selectPerson > 0 && triggerGetScoresByIdStudent({IdStudents:selectPerson});
      return () => {}
    }, [selectPerson]);

    const resetInput = () => {
        const zero:any = 0;
        setScores([]);
        setSelectPeron(zero);
    }

    const isWait = () => {
        return isLoadUpSco || isLoadPosSco;
    }

    const verifyRole = () => {
        const role = roles.find(e=>e.id === profile.role)?.names ?? false;
        return role === "Estudiante" ? true : false;
    }
    
    const edit = async (idx:number=0) => {
        const IdPersons:number | undefined = verifyRole() ? profile.id : persons[idx].id;
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
        setModal({type:"edit",value:true, data:{id:0,names:""}});
    }

    const remove = (idx:number) => {
        setModal({type:"delete",value:true, data:{id:0,names:""}});
    }

    const updateScores = () => {
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

    const permisions = (...rls:number[]) => {
        const temp = rls.find( e => e===profile.role );
        return temp ? false : true;
    }

    const aceptCallback = () => {
        switch (modal.type) {
            case "edit":
                updateScores();
                break;
            case "delete":
                break;
            case "noData":
                resetInput();
                break;
        }
        setModal((datos:any)=>{
            return{
                ...datos,
                type:"", value:false,  data:{id:0,names:""}
            }
        });
    }

    const cuerpoPopup:any = {
        "edit": <p>¿Desea Guardar los cambios?</p>,
        "delete": <p>Esta acción esta prohibida en este modulo</p>,
        "noData": <p>Usuario sin profesión ni semestre asignado</p>
    };

    const cancelCallBack = () => {
        setModal({type:"", value:false,  data:{id:0,names:""}});
    }

    return(
        <ContentScores className="content" wait={isWait()}>
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
                                    disabled = { isWait() || permisions(1) }
                                />
                                <input
                                    type = "number"
                                    name = "score"
                                    id = "score"
                                    min = "0"
                                    max = "10"
                                    onChange = {(e)=>changeSelectN(e, item)}
                                    value = {item.score}
                                    disabled = { isWait() || permisions(1,2) }
                                />
                            </div>
                        )
                    })
                }
                {
                    score.length > 0 &&
                        <div className="save">
                            <button className="cancel" onClick={cancel} disabled={isWait()} >Cancelar</button>
                            <button onClick={save} disabled={ isWait() || permisions(1,2) } >Guardar</button>
                        </div>
                }
            </form>
            {
                verifyRole() ?
                    <TablePersons persons={[profile]} edit={edit} remove={remove} wait={isWait()} />
                    :
                    <TablePersons persons={persons} edit={edit} remove={remove} wait={isWait()} />

            }
            {
                modal.value && <Popup setModal={setModal} aceptCallback={aceptCallback} > {cuerpoPopup[modal.type]} </Popup>
            }
        </ContentScores>
    );
}

export { DataScores };