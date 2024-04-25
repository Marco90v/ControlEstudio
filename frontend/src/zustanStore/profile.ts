import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

type Profile = {
    id:number,
    names: string,
    lastNames: string,
    sex: string,
    email: string,
    phone: number,
    photo: string,
    role: number,
    nameRole: string,
    userUID: string
}

type State = {
    profile: Profile
}

type Action = {
  setProfile: (profile:Profile) => void,
  deleteProfile: () => void
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
    nameRole: '',
    userUID: ''
}

const useStoreProfile = create<State & Action>()(
  devtools(
    persist(
      (set)=>({
        profile: initialState,
        setProfile: (profile:Profile) => set((state) => {
          return { ...state, profile:{...profile}}
        }),
        deleteProfile: () => ({profile:{...initialState}}),
      }),
      {
        name:"Profile",
        storage: createJSONStorage(() => sessionStorage)
      }
    )
  )
)

export default useStoreProfile
export {useStoreProfile}