import { devtools, persist } from "zustand/middleware"

import { create } from "zustand"
import type { Grade } from "@/types"

type State = {
  grades: Grade[]
}

type Action = {
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