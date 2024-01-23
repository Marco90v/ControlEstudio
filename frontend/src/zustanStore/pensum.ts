import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

type ClasseFormatPensum = {
    id: number | null | undefined,
    IdClasses: number | null | undefined,
    Name_Classes: string | null | undefined,
}

type Pensum = {
    IdSemesters: number | null | undefined,
    Name_Semesters: string | null | undefined,
    Classes: ClasseFormatPensum[] | null | undefined,
}

type State = {
    pensum: Pensum[]
}

type Action = {
  setPensum: (pensum:Pensum[]) => void,
  addSemester: (pensum:Pensum) => void
}

const initialState:Pensum[] = []

const useStorePensum = create<State & Action>()(
    devtools(
        (set)=>({
            pensum: initialState,
            setPensum: (pensum:Pensum[]) => set((state) => {
                return {
                    ...state,
                    pensum: pensum
                }
            }),
            addSemester: (pensum:pensum) => set((state) => {
                return {
                    ...StaticRange,
                    pensum: [
                        ...state.pensum,
                        pensum
                    ]
                }
            })
        }),
        {
        name:"Pensum",
        // storage: createJSONStorage(() => sessionStorage)
        }
    )
)

export default useStorePensum
export {useStorePensum}