import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

type Section = {
    id: number,
    names: string
}

type State = {
    sections: Section[]
}

type Action = {
  setSections: (sections:Section[]) => void,
  clearSections: () => void,
}

const initialState:Section[] = []

const useStoreSections = create<State & Action>()(
    devtools(
        persist(
            (set)=>({
                sections: initialState,
                setSections: (sections:Section[]) => set((state) => {
                    return {
                        ...state,
                        sections: [...sections]
                    }
                }),
                clearSections: () => set((state) => {
                    return {
                        ...state,
                        sections: [...initialState]
                    }
                }),
            }),
            {
            name:"Sections",
            }
        )
    )
)

export default useStoreSections
export { useStoreSections }