import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSelectPensum, fetchDeleteClassePensum, fetchGetPensum, fetchPostClassePensum, insertSemester } from "../../store/module/pensumStore";
import { fetchDeleteProfession, fetchGetProfession, fetchPostProfession, fetchUpdateProfession } from "../../store/module/professionStore";
import { changeSelectSemesters, fetchGetSemesters } from "../../store/module/semestersStore";
import { ClassesBySemesters, ContentDataPensum, Div, SelectPensum, SelectSemester, Semestres } from "../../styled/style";
import Alert from "../Alert";
import InputForm from "../InputForm";
import Popup from "../Popup/Popup";
import TableComponent from "../Table";
import Select from "../Select";

import iconRemove from "../../assets/x-circle-solid-24.png";
import iconAdd from "../../assets/plus-circle-solid-24.png";
import { fetchClasses } from "../../store/module/classesStore";


function DataPensum(){
    const dispatch = useDispatch();
    const profession = useSelector((state:store) => state.profession);
    const pensum = useSelector((state:store) => state.pensum);
    const semesters = useSelector((state:store) => state.semesters);
    const classes = useSelector((state:store) => state.classes);

    const [modal,setModal] = useState({type:"", IdSemesters:0, value:false, data:{id:0,names:""}, id:0, semesterName:"", ClasseName:""});
    const [activeInsertSemester, setActiveInsertSemester] = useState(true);

    useEffect(() => {
        const promiseProfession = dispatch(fetchGetProfession());
        const promiseSemesters = dispatch(fetchGetSemesters());
        return () => {
            promiseProfession.abort();
            promiseSemesters.abort();
        }
    }, []);

    useEffect(() => {
      pensum.selectPensum > 0 ? setActiveInsertSemester(false) : setActiveInsertSemester(true);
    
      return () => {}
    }, [pensum.selectPensum]);

    useEffect(() => {
        let promiseClasses:any;
        if(modal.value){
            promiseClasses = dispatch(fetchClasses());
        }
    
      return () => {
      }
    }, [modal.value]);
    
    
    const removeClasse = (id:number,semesterName:string,ClasseName:string) => {
        setModal({
            ...modal,
            type:"removeClasse",
            value:true,
            id,
            semesterName,
            ClasseName
        });
    }

    const aceptCallback = () => {
        switch (modal.type) {
            case "insertClasse":
                return dispatch(fetchPostClassePensum([{
                    IdProfession:Number(pensum.selectPensum),
                    IdSemesters:modal.IdSemesters,
                    IdClasses:modal.data.id,
                    Name_Classes:modal.data.names
                }]));
            case "removeClasse":
                return dispatch(fetchDeleteClassePensum({id:modal.id}));
        }
    }

    const changeSelectProfession = (e:any) => {
        const ID = e.target.value;
        ID > 0 && dispatch(fetchGetPensum(ID));
        dispatch(changeSelectPensum(ID));
    }

    const changeSelectSemester = (e:any) => {
        const ID = e.target.value;
        dispatch(changeSelectSemesters(ID));
    }

    const insertNewClasse = (IdSemesters:number) => {
        setModal({
            ...modal,
            value:!modal.value,
            IdSemesters,
            type:"insertClasse"
        });
    }

    const insertNewSemester = () => {
        const selectSemester = semesters.selectSemester;
        const dataSemester = semesters.data[selectSemester - 1];
        if( selectSemester > 0){
            const newSemester = {
                "IdSemesters": dataSemester.id,
                "Name_Semesters": dataSemester.names,
                "Classes": []
            }
            if(pensum.data.length > 0){
                let exist = false
                pensum.data.forEach((item)=>{
                    if(item.IdSemesters === dataSemester.id) exist = true
                });
                !exist && dispatch(insertSemester(newSemester));
            }else{
                dispatch(insertSemester(newSemester));
            }
        }
    }
    
    const changeSelectClasses = (e:any) => {
        const ID = Number(e.target.value);
        setModal({
            ...modal,
            data: classes.data.find(item=> item.id===ID) || { id: 0, names: "string" }
        })
    }


    const cuerpoPopup:any = {
        "insertClasse": <Select identify="classes" changeSelect={changeSelectClasses} value={modal.data.id} data={classes.data} />,
        "removeClasse": <p>¿Desea eliminar la Clases/Materia <strong>"{modal.ClasseName}"</strong> del <strong>"{modal.semesterName}</strong>?</p>
    };

    return(        
        <ContentDataPensum>
            <SelectPensum>
                <h2>Profesiones</h2>
                <Select identify="profesion" changeSelect={changeSelectProfession} value={pensum.selectPensum} data={profession.data} />
            </SelectPensum>
            <section>
                {
                    pensum?.data?.map((semestre:pensum)=>{
                        return(
                            <Semestres key={semestre.IdSemesters} >
                                <h2>
                                    {semestre.Name_Semesters}
                                    <img src={iconAdd} alt="add" onClick={()=>insertNewClasse(semestre.IdSemesters)} />
                                </h2>
                                <ClassesBySemesters>
                                    {
                                        semestre?.Classes?.map((classe:any)=>{
                                            return(
                                                <li key={classe.id}>{classe.Name_Classes} <img src={iconRemove} alt="remove" onClick={()=>removeClasse(classe.id,semestre.Name_Semesters,classe.Name_Classes)}/></li>
                                            )
                                        })
                                    }
                                </ClassesBySemesters>
                            </Semestres>
                        )
                    })
                }
            </section>
            <SelectSemester>
                <Select identify="semestres" changeSelect={changeSelectSemester} value={semesters.selectSemester} data={semesters.data} />
                <button disabled={activeInsertSemester} onClick={insertNewSemester} >Agregar</button>
            </SelectSemester>
            {
                modal.value && <Popup setModal={setModal} aceptCallback={aceptCallback} >
                    {cuerpoPopup[modal.type]}
                </Popup>
            }
        </ContentDataPensum>
    );
}
export default DataPensum;