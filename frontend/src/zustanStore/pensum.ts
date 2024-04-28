import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type ClasseFormatPensum = {
    id: number,
    IdClasses: number,
    Name_Classes: string,
}

type Pensum = {
    IdSemesters: number,
    Name_Semesters: string,
    Classes: ClasseFormatPensum[],
}

type State = {
    pensum: Pensum[]
}

type Action = {
    setPensum: (pensum:Pensum[]) => void,
    addClassePensum: (pensum:any) => void,
    addSemesterPensum: (pensum:Pensum) => void,
    removeClassePensum: (id:number) => void,
    clearPensum: () => void
}

const initialState:Pensum[] = []

const useStorePensum = create<State & Action>()(
    devtools(
        persist(
            (set)=>({
                pensum: initialState,
                setPensum: (pensum:Pensum[]) => set((state) => {
                    return {
                        ...state,
                        pensum
                    }
                }),
                addClassePensum: (pensum:any) => set((state) => {
                    if(state.pensum.find(e=>e.IdSemesters === pensum.IdSemesters) ){
                        const newData = state.pensum.map(e=>{
                            if(e.IdSemesters === pensum.IdSemesters){
                                return{
                                    ...e,
                                    Classes:[
                                        ...e.Classes,
                                        {
                                            id:pensum.id,
                                            IdClasses: pensum.IdClasses,
                                            Name_Classes: pensum.classes.Name_Classes,
                                        }
                                    ]
                                }
                            }
                            return e
                        })
                        return {
                            ...state,
                            pensum: newData
                        }
                    }else{
                        return {
                            ...state,
                            pensum: [
                                ...state.pensum,
                                {
                                    IdSemesters:pensum.IdSemesters,
                                    Name_Semesters: pensum.IdSemesters,
                                    Classes:[{
                                        id:pensum.id,
                                        IdClasses:pensum.IdClasses,
                                        Name_Classes: pensum.classes.Name_Semesters,
                                    }]
                                }
                            ]
                        }
                    }
                }),
                addSemesterPensum: (pensum:Pensum) => set(state=>{
                    return{
                        ...state,
                        pensum:[...state.pensum, pensum]
                    }
                }),
                removeClassePensum: (id:number) => set(state=>{
                    return{
                        ...state,
                        pensum: state.pensum.map(e=>({...e,Classes:e.Classes.filter(c=>c.id!==id)}))
                    }
                }),
                clearPensum: () => set((state) => {
                    return {
                        ...state,
                        pensum: []
                    }
                })
            }),
            {
            name:"Pensum",
            }
        )
    )
)

export default useStorePensum
export {useStorePensum}