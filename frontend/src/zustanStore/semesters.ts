import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type Semester = {
    id:number,
    names: string,
}

type State = {
    semesters: Semester[]
}

type Action = {
  setSemesters: (semester:Semester[]) => void,
  addSemester: (semester:Semester) => void,
  updateSemester:(semester:Semester) => void,
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
        updateSemester: (semester:Semester) => set((state)=> {
          return {
            ...state,
            professions: state.semesters.map(s=>s.id===semester.id ? semester : s)
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
      }
    )
  )
)

export default useStoreSemesters
export {useStoreSemesters}