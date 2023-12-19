import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type Profile = {
    id:number,
    names: string,
    lastNames: string,
    sex: string,
    email: string,
    phone: number,
    photo: string,
    role: number,
    nameRole: string
}

type State = {
    profile: Profile
}

type Action = {
  setProfile: (profile:Profile) => void,
  deleteProfile: () => State
}

const initialState:Profile = {
    id:0,
    names: '',
    lastNames: '',
    sex: '',
    email: '',
    phone: 0,
    photo: '',
    role: 0,
    nameRole: ''
}

const useStoreProfile = create<State & Action>()(devtools(
  (set)=>({
    profile: initialState,
    setProfile: (profile:Profile) => set((state) => {
      return { ...state, profile:{...profile}}
    }),
    deleteProfile: () => ({profile:{...initialState}}),
  }),
  {name:"Profile"}
))

export default useStoreProfile
export {useStoreProfile}