import { devtools, persist } from "zustand/middleware"

import { create } from "zustand"
import type { Professor } from "@/types"

type State = {
  professors: Professor[]
}

type Action = {
  setProfessors: (professors: Professor[]) => void
  addProfessor: (professor: Professor) => void
  updateProfessor: (professor: Professor) => void
  deleteProfessor: (id: string) => void
}

const useProfessors = create<State & Action>()(devtools(
  devtools(
    persist(
      (set)=>({
        professors: [],
        setProfessors: (professors:Professor[]) => set((state) => {
          return { ...state, professors: professors }
        }),
        addProfessor: (professor:Professor) => set((state) => {
          return { ...state, professors: [...state.professors, professor] }
        }),
        updateProfessor: (professor:Professor) => set((state) => {
          return {
            ...state,
            professors: state.professors.map(p => 
              p.id === professor.id 
                ? { ...professor}
                : p
            )}
        }),
        deleteProfessor: (id:string) => set((state) => {
          return { ...state, professors: state.professors.filter(p => p.id !== id) }
        })  
      }),
      {
        name:"useProfessors"
      }
    )
  )
))

export default useProfessors