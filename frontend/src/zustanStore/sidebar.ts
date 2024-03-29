import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

type State = {
  visibleSideBar: boolean
}

type Action = {
  toggleStatus: () => void,
}

const useStoreSideBar = create<State & Action>()(
  devtools(
    persist(
      (set)=>({
        visibleSideBar: true,
        toggleStatus: () => set((state) => {
          const newValue = !state.visibleSideBar
          return { ...state, visibleSideBar: newValue }
        }),
      }),
      {
        name:"Visible Side Bar",
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
)

export default useStoreSideBar
export {useStoreSideBar}