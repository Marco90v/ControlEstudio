import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

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
        addProfession: ({id,names}:Profession) => set((state)=> {
          return {
            ...state,
            professions: [...state.professions, {id, names}]
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
        name:"Profession",
        storage: createJSONStorage(() => sessionStorage)
      }
    )
  )
)

export default useStoreProfessions
export {useStoreProfessions}