import { devtools, persist } from "zustand/middleware"

import { create } from "zustand"
import type { Student } from "@/types"

type State = {
  students: Student[],
  loading: boolean
  error: string | null
}

type Action = {
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setStudents: (students: Student[]) => void
  addStudent: (student: Student) => void
  updateStudent: (student: Student) => void
  deleteStudent: (id: string) => void
}

const useStudents = create<State & Action>()(devtools(
  devtools(
    persist(
      (set)=>({
        students: [],
        loading: false,
        error: null,
        setLoading: (loading:boolean) => set((state) => {
          return { ...state, loading: loading }
        }),
        setError: (error:string | null) => set((state) => {
          return { ...state, error: error }
        }),
        setStudents: (students:Student[]) => set((state) => {
          return { ...state, students: students }
        }),
        addStudent: (student:Student) => set((state) => {
          return { ...state, students: [...state.students, student] }
        }),
        updateStudent: (student:Student) => set((state) => {
          return {
            ...state,
            students: state.students.map(p => 
              p.id === student.id 
                ? { ...student}
                : p
            )}
        }),
        deleteStudent: (id:string) => set((state) => {
          return { ...state, students: state.students.filter(p => p.id !== id) }
        })  
      }),
      {
        name:"useStudents"
      }
    )
  )
))

export default useStudents