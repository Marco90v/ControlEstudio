import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type State = {
  token: string
}

type Action = {
  setToken: (token: State['token']) => void,
  deleteToken: () => void
}

// const store = (set)=>(
//   {
//     token: localStorage.getItem('token') || "",
//     setToken: (token:string) => set(() => {
//       return { token: token }
//     }),
//     deleteToken: () => set(()=>({token:""}))
//   }
// )

const setLocalStorage = (token:string):void => {
  localStorage.setItem("token", JSON.stringify(token))
}

const useStoreToken = create<State & Action>()(devtools(
  (set)=>({
    token: localStorage.getItem('token') || "",
    setToken: (token:string) => set((state) => {
      // console.log(token)
      setLocalStorage(token)
      return { ...state, token: token }
    }),
    // deleteToken: () => set(()=>({token:""}))
    deleteToken: () => set((state)=>{
      localStorage.removeItem("token")
      return {
        ...state, token:""
      }
    })
  }),
  {name:"Token"}
))

export default useStoreToken
export {useStoreToken}