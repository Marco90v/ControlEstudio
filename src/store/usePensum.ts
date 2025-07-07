import { devtools, persist } from "zustand/middleware"

import { create } from "zustand"
import type { PensumEntry } from "@/types"

type State = {
  pensums: PensumEntry[]
}

type Action = {
  setPensums: (pensum: PensumEntry[]) => void
  addPensum: (pensum: PensumEntry) => void
  updatePensum: (pensum: PensumEntry) => void
  deletePensum: (id: string) => void
}

const usePensum = create<State & Action>()(devtools(
  devtools(
    persist(
      (set)=>({
        pensums: [],
        setPensums: (pensums:PensumEntry[]) => set((state) => {
          return { ...state, pensums: pensums }
        }),
        addPensum: (pensum:PensumEntry) => set((state) => {
          return { ...state, pensums: [...state.pensums, pensum] }
        }),
        updatePensum: (pensum:PensumEntry) => set((state) => {
          return {
            ...state,
            pensums: state.pensums.map(p => 
              p.id === pensum.id 
                ? { ...pensum}
                : p
            )}
        }),
        deletePensum: (id:string) => set((state) => {
          return { ...state, pensums: state.pensums.filter(p => p.id !== id) }
        })  
      }),
      {
        name:"usePensum"
      }
    )
  )
))

export default usePensum