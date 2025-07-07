import { devtools, persist } from "zustand/middleware"

import { create } from "zustand"
import type { Professor } from "@/types"

type State = {
  professors: Professor[],
  loading: boolean
  error: string | null
}

type Action = {
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
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
        loading: false,
        error: null,
        setLoading: (loading:boolean) => set((state) => {
          return { ...state, loading: loading }
        }),
        setError: (error:string | null) => set((state) => {
          return { ...state, error: error }
        }),
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