import { useEffect, useState } from "react";
import { Popup, Select, BlockSemester } from "../";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import useStorePensum from "../../zustanStore/pensum";
import { ADD_CLASSES_PENSUM, DELETE_CLASSES_PENSUM, GET_ClASSES, GET_PENSUM, GET_PROFESSIONS, GET_SEMESTERS, identifySelect } from "../../ultil/const";
import { filter__typename } from "../../ultil";
import { ClasseFormatPensum, Pensum } from "../../__generated__/graphql";
import DeletePopUp from "./DeletePopUp";

type data = {
    id: number,
    names: string,
}
type modalInitial = {
    type:string,
    IdSemesters:number,
    value:boolean,
    data:data,
    id:number,
    semesterName:string,
    ClasseName:string,
}

const modalInitial: modalInitial = {
    type:"",
    IdSemesters:0,
    value:false,
    data:{id:0,names:""},
    id:0, semesterName:"",
    ClasseName:""
};

function DataPensum(){

    const {pensum, setPensum, addSemester, clearPensum} = useStorePensum((state)=>state)

    const { data:dataClasses } = useQuery(GET_ClASSES);
    const { data:dataProfessions } = useQuery(GET_PROFESSIONS);
    const { data:dataSemesters } = useQuery(GET_SEMESTERS);

    const [getPensumById, { loading:loadingPensum, data, refetch:refetchPensum } ]= useLazyQuery(GET_PENSUM);
    const [AddClassePensum, { loading:loadingAddClasse }] = useMutation(ADD_CLASSES_PENSUM)
    const [DeleteClassePensum, { loading:loadingDeleteClasse }] = useMutation(DELETE_CLASSES_PENSUM)

    const loading = loadingPensum || loadingAddClasse || loadingDeleteClasse

    const [selectSemesters, setSelectSemesters] = useState<number>(0);
    const [selectPensum, setSelectPensum] = useState<number>(0);

    const [modal,setModal] = useState(modalInitial);
    const [activeInsertSemester, setActiveInsertSemester] = useState(true);

     /** Data Pensum */
     useEffect(() => {
        if(data && data.getPensumById && data.getPensumById.length > 0){
            const newData = data.getPensumById.map(item => {
                if(item && item.Classes){
                    const newPensum = filter__typename<Pensum | undefined>(item)
                    const newClasses = item.Classes.map(itemClasses=>{
                        return filter__typename<ClasseFormatPensum | undefined>(itemClasses)
                    })
                    return {
                        ...newPensum,
                        Classes:newClasses
                    }
                }else{
                    return item
                }
            })
            setPensum(newData as any)
        }    
        return () => {
            clearPensum()
        }
    }, [data])

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
                AddClassePensum({
                    variables:{
                        dataPensum: newData
                    }
                })
                refetchPensum()
                break;
            case "removeClasse":
                DeleteClassePensum({
                    variables:{
                        deleteClassePensumId: modal.id
                    }
                })
                refetchPensum()
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
        getPensumById({
            variables:{
                getPensumByIdId: ID
            }
        })
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
        const dataSemester = ( dataSemesters && dataSemesters.allSemesters ) ? 
                                ( dataSemesters?.allSemesters[selectSemesters - 1] || {id:0, names:""} ) : 
                                {id:0, names:""}
        if( selectSemesters > 0){
            const newSemester:pensum = {
                IdSemesters: dataSemester.id,
                Name_Semesters: dataSemester.names,
                Classes: []
            }
            if(data && data?.getPensumById && data?.getPensumById?.length > 0){
                let exist = false
                data.getPensumById.forEach((item)=>{
                    if(item?.IdSemesters === dataSemester.id) exist = true
                })
                if(!exist) addSemester(newSemester)
            }else{
                addSemester(newSemester)
            }
        }
    }
    
    const changeSelectClasses = (e:any) => {
        const ID = Number(e.target.value);
        setModal({
            ...modal,
            data: dataClasses?.allClasses.find(item=> item.id===ID) as data || { id: 0, names: "" }
        })
    }

    const cuerpoPopup:any = {
        "insertClasse": <Select
                            identify={identifySelect.CLASSES}
                            changeSelect={changeSelectClasses}
                            value={modal.data.id}
                            data={dataClasses?.allClasses}
                            disabled={loading}
                        />,
        "removeClasse": <DeletePopUp value={modal.ClasseName} textIni={"¿Desea eliminar la Clases/Materia"} textFin={"?"} />
    };

    const cancelCallBack = () => {
        setModal(modalInitial);
    }

    return(        
        <div className="p-5 m-5">
            <div className="grid grid-cols-[200px_1fr] mb-5">
                <h2 className="text-lg font-semibold text-gray-800">Profesiones</h2>
                <Select
                    identify={identifySelect.PROFESSION}
                    changeSelect={changeSelectProfession}
                    value={selectPensum}
                    data={dataProfessions?.allProfession}
                    disabled={loading}
                />
            </div>
            <section>
                {
                    pensum.map((semester:pensum)=>{
                        return (
                            <BlockSemester
                                key={semester?.IdSemesters}
                                semester={semester}
                                insertNewClasse={insertNewClasse}
                                removeClasse={removeClasse}
                                disabled={loading}
                            />
                        )
                    })
                }
            </section>
            <div  className="grid grid-cols-[1fr_200px] gap-x-5 mt-5">
                <Select
                    identify={identifySelect.SEMESTERS}
                    changeSelect={changeSelectSemester}
                    value={selectSemesters}
                    data={dataSemesters?.allSemesters}
                    disabled={loadingAddClasse || loadingDeleteClasse}
                />
                <button
                    className="btn-greend"
                    disabled={activeInsertSemester || loading}
                    onClick={insertNewSemester}
                >
                    Agregar    
                </button>
            </div>
            {
                modal.value && (
                    <Popup cancelCallBack={cancelCallBack} aceptCallback={aceptCallback} >
                        {cuerpoPopup[modal.type]}
                    </Popup>
                )
            }
        </div>
    );
}

export default DataPensum;
export {DataPensum};