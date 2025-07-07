import { devtools, persist } from "zustand/middleware"

import { create } from "zustand"
import type { Profession } from "@/types"

type State = {
  professions: Profession[]
}

type Action = {
  setProfessions: (professions: Profession[]) => void
  addProfession: (profession: Profession) => void
  updateProfession: (profession: Profession) => void
  deleteProfession: (id: string) => void
}

const useProfessions = create<State & Action>()(devtools(
  devtools(
    persist(
      (set)=>({
        professions: [],
        setProfessions: (professions:Profession[]) => set((state) => {
          return { ...state, professions: professions }
        }),
        addProfession: (profession:Profession) => set((state) => {
          return { ...state, professions: [...state.professions, profession] }
        }),
        updateProfession: (profession:Profession) => set((state) => {
          return {
            ...state,
            professions: state.professions.map(pfs => 
              pfs.id === profession.id 
                ? { ...profession}
                : pfs
            )}
        }),
        deleteProfession: (id:string) => set((state) => {
          return { ...state, professions: state.professions.filter(cls => cls.id !== id) }
        })  
      }),
      {
        name:"useProfessions"
      }
    )
  )
))

export default useProfessions