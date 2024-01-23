import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

type Semester = {
    id:number | null | undefined,
    names: string | null | undefined,
}

type State = {
    semesters: Semester[]
}

type Action = {
  setSemesters: (Semester:Semester[]) => void,
  addSemester: (Semester:Semester) => void,
  deleteSemester: (id:number) => void
}

const initialState:Semester[] = []

const useStoreSemesters = create<State & Action>()(
  devtools(
    persist(
      (set)=>({
        semesters: initialState,
        setSemesters: (semester:Semester[]) => set((state) => {
            return {
                ...state,
                semesters: semester
            }
        }),
        addSemester: ({id,names}:Semester) => set((state)=> {
          return {
            ...state,
            semesters: [...state.semesters, {id, names}]
          }
        }),
        deleteSemester: (id:number) => set((state)=>{
          return {
            ...state,
            professions: state.semesters.filter(item=>item.id!==id)
          }
        })
      }),
      {
        name:"Semester",
        storage: createJSONStorage(() => sessionStorage)
      }
    )
  )
)

export default useStoreSemesters
export {useStoreSemesters}