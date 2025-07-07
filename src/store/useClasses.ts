import { devtools, persist } from "zustand/middleware"

import { create } from "zustand"
import type { Class } from "@/types"

type State = {
  classes: Class[]
  loading: boolean
  error: string | null
}

type Action = {
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setClasses: (classes: Class[]) => void
  addClass: (classData: Class) => void
  updateClass: (classData: Class) => void
  deleteClass: (id: string) => void
}

const useClasses = create<State & Action>()(devtools(
  devtools(
    persist(
      (set)=>({
        classes: [],
        loading: false,
        error: null,
        setLoading: (loading:boolean) => set((state) => {
          return { ...state, loading: loading }
        }),
        setError: (error:string | null) => set((state) => {
          return { ...state, error: error }
        }),
        setClasses: (classes:Class[]) => set((state) => {
          return { ...state, classes: classes }
        }),
        addClass: (classData:Class) => set((state) => {
          return { ...state, classes: [...state.classes, classData] }
        }),
        updateClass: (classData:Class) => set((state) => {
          return {
            ...state,
            classes: state.classes.map(cls => 
              cls.id === classData.id 
                ? { ...classData}
                : cls
            )}
        }),
        deleteClass: (id:string) => set((state) => {
          return { ...state, classes: state.classes.filter(cls => cls.id !== id) }
        })  
      }),
      {
        name:"useClasses"
      }
    )
  )
))

export default useClasses