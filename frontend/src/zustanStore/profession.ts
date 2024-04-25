import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type Profession = {
    id:number | null | undefined,
    names: string | null | undefined,
}

type State = {
    professions: Profession[]
}

type Action = {
  setProfessions: (profession:Profession[]) => void,
  addProfession: (profession:Profession) => void,
  updateProfession:(profession:Profession) => void,
  deleteProfession: (id:number) => void
}

const initialState:Profession[] = []

const useStoreProfessions = create<State & Action>()(
  devtools(
    persist(
      (set)=>({
        professions: initialState,
        setProfessions: (profession:Profession[]) => set((state) => {
            return {
                ...state,
                professions: profession 
            }
        }),
        addProfession: (profession:Profession) => set((state)=> {
          return {
            ...state,
            professions: [...state.professions, profession]
          }
        }),
        updateProfession: (profession:Profession) => set((state)=> {
          return {
            ...state,
            professions: state.professions.map(p=>p.id===profession.id ? profession : p)
          }
        }),
        deleteProfession: (id:number) => set((state)=>{
          return {
            ...state,
            professions: state.professions.filter(item=>item.id!==id)
          }
        })
      }),
      {
        name:"Profession"
      }
    )
  )
)

export default useStoreProfessions
export {useStoreProfessions}