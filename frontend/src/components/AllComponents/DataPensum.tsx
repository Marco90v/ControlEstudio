import { useEffect, useState } from "react";
import { ContentDataPensum, SelectPensum, SelectSemester } from "../../styled/style";
// import { useAppDispatch } from "../../store/store";
// import { addSemester, pensumApi, useDeletePensumMutation, usePostPensumMutation } from "../../store/apis/pensumApi";
// import { useGetProfessionQuery } from "../../store/apis/professionApi";
// import { useGetSemestersQuery } from "../../store/apis/semestersApi";
// import { useGetClassesQuery } from "../../store/apis/classesApi";
import {Popup, Select, BlockSemester} from "../";
import { gql } from "../../__generated__";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import useStoreClasses from "../../zustanStore/classes";
import useStoreProfessions from "../../zustanStore/profession";
import useStoreSemesters from "../../zustanStore/semesters";
import useStorePensum from "../../zustanStore/pensum";

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

const GET_ClASSES = gql(`
    query AllClasses {
        allClasses {
            id
            names
        }
    }
`)

const GET_PROFESSIONS = gql(`
    query AllProfession {
        allProfession {
            id
            names
        }
    }
`)

const GET_SEMESTERS = gql(`
    query AllSemesters {
        allSemesters {
            names
            id
        }
    }
`)

const GET_PENSUM = gql(`
    query GetPensumById($getPensumByIdId: Int) {
        getPensumById(id: $getPensumByIdId) {
            IdSemesters
            Name_Semesters
            Classes {
                id
                IdClasses   
                Name_Classes
            }
  }
    }
`)

const ADD_CLASSES_PENSUM = gql(`
    mutation AddClassesPensum($dataPensum: DataPensum) {
        addClassesPensum(DataPensum: $dataPensum)
    }
`)

const DELETE_CLASSES_PENSUM = gql(`
    mutation DeleteClassePensum($deleteClassePensumId: Int) {
        deleteClassePensum(id: $deleteClassePensumId)
    }
`)

function DataPensum(){

    // const classes:any = []
    // const professions:any = []
    // const semesters:any = []
    // const data:any = []

    // const dispatch = useAppDispatch();
    // const [trigger, { data=[] }] = pensumApi.endpoints.getPensumById.useLazyQuery();
    // const { data: professions=[] } = useGetProfessionQuery();
    // const { data: semesters=[] } = useGetSemestersQuery();
    // const { data: classes=[] } = useGetClassesQuery();
    // const [ postPensum ] = usePostPensumMutation();
    // const [ deletePensum ] = useDeletePensumMutation();

    const {classes, setClasses, addClasse:AddClasseStore, deleteClasse:dC} = useStoreClasses((state)=>state)
    const {professions, setProfessions, addProfession:AddProfessionStore, deleteProfession:dP} = useStoreProfessions((state)=>state)
    const {semesters, setSemesters, addSemester:AddSemesterStore, deleteSemester:dS} = useStoreSemesters((state)=>state)
    const {pensum, setPensum, addSemester} = useStorePensum((state)=>state)
    // console.log(pensum)

    const [getPensumById, { loading, error, data, refetch:refetchPensum } ]= useLazyQuery(GET_PENSUM);
    // const [AddClassePensum, { loading:L_ACP, error:E_ACP, data:D_ACP } ]= useLazyQuery(ADD_CLASSES_PENSUM);
    const [AddClassePensum, { data:dataACP, reset:resetACP }] = useMutation(ADD_CLASSES_PENSUM)
    const [DeleteClassePensum, { data:dataDCP, reset:resetDCP }] = useMutation(DELETE_CLASSES_PENSUM)


    const { data:dataClasses } = useQuery(GET_ClASSES);
    const { data:dataProfessions } = useQuery(GET_PROFESSIONS);
    const { data:dataSemesters } = useQuery(GET_SEMESTERS);


    const [selectSemesters, setSelectSemesters] = useState<number>(0);
    const [selectPensum, setSelectPensum] = useState<number>(0);

    const [modal,setModal] = useState(modalInitial);
    const [activeInsertSemester, setActiveInsertSemester] = useState(true);

     /** Data Pensum */
     useEffect(() => {
        if(data?.getPensumById?.length && data?.getPensumById?.length > 0){
            const newData = data.getPensumById.map(item => {
                const newClasses = item?.Classes?.map(itemClasses=>{
                    return {
                        id:itemClasses?.id,
                        IdClasses: itemClasses?.IdClasses,
                        Name_Classes: itemClasses?.Name_Classes,
                    }
                })
                return {
                    IdSemesters: item?.IdSemesters,
                    Name_Semesters: item?.Name_Semesters,
                    Classes:newClasses
                }
            })
            setPensum(newData)
            // console.log(newData)
        }    
        return () => {}
    }, [data])

    useEffect(() => {
        if (dataACP?.addClassesPensum || dataDCP?.deleteClassePensum) {
            resetACP()
            resetDCP()
            refetchPensum()
        }
        return () => {}
    }, [dataACP, dataDCP])

    /** Data Classes */
    useEffect(() => {
        if(dataClasses?.allClasses?.length && dataClasses?.allClasses?.length > 0){
            const newData = dataClasses.allClasses.map(item => ({id:item?.id, names:item?.names}))
            setClasses(newData)
        }    
        return () => {}
    }, [dataClasses])

    /** Data Professions */
    useEffect(() => {
        if(dataProfessions?.allProfession?.length && dataProfessions?.allProfession?.length > 0){
            const newData = dataProfessions.allProfession.map(item => ({id:item?.id, names:item?.names}))
            setProfessions(newData)
        }    
        return () => {}
    }, [dataProfessions])

    /** Data Semesters */
    useEffect(() => {
        if(dataSemesters?.allSemesters?.length && dataSemesters?.allSemesters?.length > 0){
            const newData = dataSemesters.allSemesters.map(item => ({id:item?.id, names:item?.names}))
            setSemesters(newData)
        }    
        return () => {}
    }, [dataSemesters])

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
                // console.log(newData)
                // postPensum(newData);
                AddClassePensum({
                    variables:{
                        dataPensum: newData
                    }
                })
                break;
            case "removeClasse":
                // const dataDelete = {
                //     body:{
                //         id: modal.id
                //     },
                //     p:selectPensum
                // }
                // deletePensum(dataDelete);
                DeleteClassePensum({
                    variables:{
                        deleteClassePensumId: modal.id
                    }
                })
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
        // trigger(ID);
        getPensumById({
            variables:{
                getPensumByIdId: ID
            }
        })
        // console.log(ID)
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
            if(pensum && pensum.length > 0){
                let exist = false
                pensum.forEach((item)=>{
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
            data: classes.find(item=> item.id===ID) as data || { id: 0, names: "" }
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
                    pensum?.map((semester:pensum)=>{
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

export default DataPensum;
export {DataPensum};