import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type State = {
  visibleSideBar: boolean
}

type Action = {
  toggleStatus: () => void,
}

const useStoreSideBar = create<State & Action>()(devtools(
  (set)=>({
    visibleSideBar: false,
    toggleStatus: () => set((state) => {
      return { ...state, visibleSideBar: !state.visibleSideBar }
    }),
  }),
  {name:"Visible Side Bar"}
))

export default useStoreSideBar
export {useStoreSideBar}