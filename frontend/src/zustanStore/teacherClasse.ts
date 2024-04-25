import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

type Classe = {
    IdClasses: number,
    IdPersons: number,
    IdProfession: number,
    IdSections: number,
    IdSemesters: number,
    IdShifts: number,
    id: number,
}

type State = {
    teacherClasses: Classe[],
    idsDelete:number[]
}

type Action = {
  setTeacherClasses: (classes:Classe[]) => void,
  addTeacherClasse: (classe:Classe) => void,
  deleteTeacherClasse: (idx:number) => void,
  changeTeacherClasse: (camp:string, value:string, idx:number) => void,
  clearTeacherClasses: () => void,
}

const initialState:Classe[] = []

const useStoreTeacherClasses = create<State & Action>()(
    devtools(
        persist(
            (set)=>({
                teacherClasses: initialState,
                idsDelete:[],
                setTeacherClasses: (classes:Classe[]) => set((state) => {
                    return {
                        ...state,
                        teacherClasses: [...classes]
                    }
                }),
                addTeacherClasse: (classe:Classe) => set((state) => {
                    return {
                        ...state,
                        teacherClasses: [...state.teacherClasses, classe]
                    }
                }),
                deleteTeacherClasse: (idx:number) => set((state) => {
                    const newData = state.teacherClasses.filter((_,i)=>{
                        return i !== idx
                    })
                    const idD = state.teacherClasses.find((e,i)=>{
                        return i === idx
                    })?.id
                    const newIdsDelete = idD ? [...state.idsDelete, idD] : [...state.idsDelete]
                    return {
                        ...state,
                        teacherClasses:[...newData],
                        idsDelete: [...newIdsDelete]
                    }
                }),
                changeTeacherClasse: (camp:string, value:string, idx:number) => set((state) => {
                    return {
                        ...state,
                        teacherClasses: [...state.teacherClasses.map((e,i)=>{
                            return i===idx ? {...e, [camp]:Number(value)} : e
                        })]
                    }
                }),
                clearTeacherClasses: () => set((state) => {
                    return {
                        ...state,
                        teacherClasses: [...initialState]
                    }
                })
            }),
            {
            name:"TeacherClasses",
            // storage: createJSONStorage(() => sessionStorage)
            }
        )
    )
)

export default useStoreTeacherClasses
export { useStoreTeacherClasses }