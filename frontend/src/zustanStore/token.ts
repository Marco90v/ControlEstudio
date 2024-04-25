import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type State = {
  token: string
}

type Action = {
  setToken: (token: State['token']) => void,
  deleteToken: () => void
}

const setLocalStorage = (token:string):void => {
  localStorage.setItem("token", JSON.stringify(token))
}

const useStoreToken = create<State & Action>()(devtools(
  devtools(
    persist(
      (set)=>({
        token: localStorage.getItem('token') || "",
        setToken: (token:string) => set((state) => {
          setLocalStorage(token)
          return { ...state, token: token }
        }),
        deleteToken: () => set((state)=>{
          localStorage.removeItem("token")
          return {
            ...state, token:""
          }
        })
      }),
      {name:"Token"}
    )
  )
))

export default useStoreToken
export {useStoreToken}