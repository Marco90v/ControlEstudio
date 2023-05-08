import { useEffect, useState } from "react";
import { ContentDataPensum, SelectPensum, SelectSemester } from "../../styled/style";
import { addSemester, pensumApi, useDeletePensumMutation, usePostPensumMutation } from "../../store/apis/pensumApi";
import { useAppDispatch } from "../../store/store";
import { useGetProfessionQuery } from "../../store/apis/professionApi";
import { useGetSemestersQuery } from "../../store/apis/semestersApi";
import { useGetClassesQuery } from "../../store/apis/classesApi";
import {Popup, Select, BlockSemester} from "../";

const modalInitial = {
    type:"",
    IdSemesters:0,
    value:false,
    data:{id:0,names:""},
    id:0, semesterName:"",
    ClasseName:""
};

function DataPensum(){

    const dispatch = useAppDispatch();
    const [trigger, { data=[] }] = pensumApi.endpoints.getPensumById.useLazyQuery();
    const { data: professions=[] } = useGetProfessionQuery();
    const { data: semesters=[] } = useGetSemestersQuery();
    const { data: classes=[] } = useGetClassesQuery();
    const [ postPensum ] = usePostPensumMutation();
    const [ deletePensum ] = useDeletePensumMutation();

    const [selectSemesters, setSelectSemesters] = useState<number>(0);
    const [selectPensum, setSelectPensum] = useState<number>(0);

    const [modal,setModal] = useState(modalInitial);
    const [activeInsertSemester, setActiveInsertSemester] = useState(true);

    useEffect(() => {
        selectPensum > 0 ? setActiveInsertSemester(false) : setActiveInsertSemester(true);
        return () => {}
    }, [selectPensum]);
    
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
                const newData = {
                    body:[{
                        IdProfession:selectPensum,
                        IdSemesters:modal.IdSemesters,
                        IdClasses:modal.data.id,
                        Name_Classes:modal.data.names
                    }],
                    p:selectPensum
                }
                postPensum(newData);
                break;
            case "removeClasse":
                const dataDelete = {
                    body:{
                        id: modal.id
                    },
                    p:selectPensum
                }
                deletePensum(dataDelete);
                break;
        }
        setModal((datos:any)=>{
            return{
                ...datos,
                type:"", value:false,  data:{id:0,names:""}
            }
        });
    }

    const changeSelectProfession = (e:any) => {
        const ID = Number(e.target.value);
        setSelectPensum(ID);
        trigger(ID);
    }

    const changeSelectSemester = (e:any) => {
        const ID = Number(e.target.value);
        setSelectSemesters(ID);
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
        const dataSemester = semesters[selectSemesters - 1];
        if( selectSemesters > 0){
            const newSemester:pensum = {
                IdSemesters: dataSemester.id,
                Name_Semesters: dataSemester.names,
                Classes: []
            }
            if(data?.length > 0){
                let exist = false
                data?.forEach((item:pensum)=>{
                    if(item.IdSemesters === dataSemester.id) exist = true
                });
                if(!exist) dispatch(addSemester(newSemester,selectPensum));
            }else{
                dispatch(addSemester(newSemester,selectPensum));
            }
        }
    }
    
    const changeSelectClasses = (e:any) => {
        const ID = Number(e.target.value);
        setModal({
            ...modal,
            data: classes.find(item=> item.id===ID) || { id: 0, names: "string" }
        })
    }

    const cuerpoPopup:any = {
        "insertClasse": <Select identify="classes" changeSelect={changeSelectClasses} value={modal.data.id} data={classes} />,
        "removeClasse": <p>¿Desea eliminar la Clases/Materia <strong>"{modal.ClasseName}"</strong> del <strong>"{modal.semesterName}</strong>?</p>
    };

    const cancelCallBack = () => {
        setModal(modalInitial);
    }

    return(        
        <ContentDataPensum>
            <SelectPensum>
                <h2>Profesiones</h2>
                <Select identify="profesion" changeSelect={changeSelectProfession} value={selectPensum} data={professions} />
            </SelectPensum>
            <section>
                {
                    data.map((semester:pensum)=>{
                        return <BlockSemester key={semester.IdSemesters} semester={semester} insertNewClasse={insertNewClasse} removeClasse={removeClasse} />
                    })
                }
            </section>
            <SelectSemester>
                <Select identify="semestres" changeSelect={changeSelectSemester} value={selectSemesters} data={semesters} />
                <button disabled={activeInsertSemester} onClick={insertNewSemester} >Agregar</button>
            </SelectSemester>
            {
                modal.value && <Popup cancelCallBack={cancelCallBack} aceptCallback={aceptCallback} >
                    {cuerpoPopup[modal.type]}
                </Popup>
            }
        </ContentDataPensum>
    );
}

export { DataPensum };