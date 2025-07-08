import type { Profile } from '@/types'
import type { Session } from '@supabase/supabase-js'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type State = {
  token: string | null,
  session: Session | null,
  profile : {
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
  } | null,
  loading: boolean,
  error: string | null
}

type Action = {
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setToken: (token: string) => void,
  setSession: (session: Session) => void,
  deleteToken: () => void
  setProfile: (profile: Profile) => void
  close: () => void
}

const setLocalStorage = (token:string):void => {
  localStorage.setItem("token", JSON.stringify(token))
}

const useAuth = create<State & Action>()(devtools(
  devtools(
    persist(
      (set)=>({
        token: null,
        profile: null,
        session: null,
        loading: false,
        error: null,
        setLoading: (loading:boolean) => set((state) => {
          return { ...state, loading: loading }
        }),
        setError: (error:string | null) => set((state) => {
          return { ...state, error: error }
        }),
        setSession: (session:Session) => set((state) => {
          return { ...state, session: session }
        }),
        setToken: (token:string) => set((state) => {
          setLocalStorage(token)
          return { ...state, token: token }
        }),
        deleteToken: () => set((state)=>{
          localStorage.removeItem("token")
          return {
            ...state, token:null
          }
        }),
        setProfile: (profile:Profile) => set((state) => {
          return { ...state, profile: profile }
        }),
        close: () => set((state) => {
          localStorage.removeItem("token")
          return {
            ...state, token: null, profile: null, session: null
          }
        })
      }),
      {
        name:"useAuth"
      }
    )
  )
))

export default useAuth