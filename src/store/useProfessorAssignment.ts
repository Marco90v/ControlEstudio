import { devtools, persist } from "zustand/middleware"

import { create } from "zustand"
import type { ProfessorAssignment } from "@/types"

type State = {
  professorAssignments: ProfessorAssignment[],
  loading: boolean
  error: string | null
}

type Action = {
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setProfessorAssignments: (ProfessorAssignments: ProfessorAssignment[]) => void
  addProfessorAssignment: (ProfessorAssignment: ProfessorAssignment) => void
  updateProfessorAssignment: (ProfessorAssignment: ProfessorAssignment) => void
  deleteProfessorAssignment: (id: string) => void
  deleteAssignment: (id: string) => void
}

const useProfessorAssignment = create<State & Action>()(devtools(
  devtools(
    persist(
      (set)=>({
        professorAssignments: [],
        loading: false,
        error: null,
        setLoading: (loading:boolean) => set((state) => {
          return { ...state, loading: loading }
        }),
        setError: (error:string | null) => set((state) => {
          return { ...state, error: error }
        }),
        setProfessorAssignments: (professorAssignments:ProfessorAssignment[]) => set((state) => {
          return {
            ...state,
            professorAssignments: professorAssignments
          }
        }),
        addProfessorAssignment: (professorAssignment:ProfessorAssignment) => set((state) => {
          return {
            ...state,
            professorAssignments: [...state.professorAssignments, professorAssignment]
          }
        }),
        updateProfessorAssignment: (professorAssignment:ProfessorAssignment) => set((state) => {
          return {
            ...state,
            professors: state.professorAssignments.map(p => 
              p.id === professorAssignment.id 
                ? { ...professorAssignment}
                : p
            )}
        }),
        deleteProfessorAssignment: (id:string) => set((state) => {
          return {
            ...state,
            professorAssignments: state.professorAssignments.filter(p => p.professorId !== id)
          }
        }),
        deleteAssignment: (id:string) => set((state) => {
          return {
            ...state,
            professorAssignments: state.professorAssignments.filter(p => p.id !== id)
          }
        })
      }),
      {
        name:"useProfessorAssignment"
      }
    )
  )
))

export default useProfessorAssignment