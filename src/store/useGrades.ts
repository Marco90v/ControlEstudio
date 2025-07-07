import { devtools, persist } from "zustand/middleware"

import { create } from "zustand"
import type { Grade } from "@/types"

type State = {
  grades: Grade[]
  loading: boolean
  error: string | null
}

type Action = {
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setGrades: (grades: Grade[]) => void
  addGrade: (grade: Grade) => void
  updateGrade: (grade: Grade) => void
  deleteGrade: (id: string) => void
}

const useGrades = create<State & Action>()(devtools(
  devtools(
    persist(
      (set)=>({
        grades: [],
        loading: false,
        error: null,
        setLoading: (loading:boolean) => set((state) => {
          return { ...state, loading: loading }
        }),
        setError: (error:string | null) => set((state) => {
          return { ...state, error: error }
        }),
        setGrades: (grades:Grade[]) => set((state) => {
          return { ...state, grades: grades }
        }),
        addGrade: (grade:Grade) => set((state) => {
          return { ...state, grades: [...state.grades, grade] }
        }),
        updateGrade: (grade:Grade) => set((state) => {
          return {
            ...state,
            grades: state.grades.map(p => 
              p.id === grade.id 
                ? { ...grade}
                : p
            )}
        }),
        deleteGrade: (id:string) => set((state) => {
          return { ...state, grades: state.grades.filter(p => p.id !== id) }
        }),
      }),
      {
        name:"useGrades"
      }
    )
  )
))

export default useGrades