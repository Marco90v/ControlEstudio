import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

type Shift = {
    id: number,
    names: string
}

type State = {
    shifts: Shift[]
}

type Action = {
  setShift: (shifts:Shift[]) => void,
  clearShift: () => void,
}

const initialState:Shift[] = []

const useStoreShifts = create<State & Action>()(
    devtools(
        persist(
            (set)=>({
                shifts: initialState,
                setShift: (shifts:Shift[]) => set((state) => {
                    return {
                        ...state,
                        shifts: [...shifts]
                    }
                }),
                clearShift: () => set((state) => {
                    return {
                        ...state,
                        shifts: [...initialState]
                    }
                }),
            }),
            {
                name:"Shifts",
                storage: createJSONStorage(() => sessionStorage)
            }
        )
    )
)

export default useStoreShifts
export { useStoreShifts }