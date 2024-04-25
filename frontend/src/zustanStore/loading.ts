import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type error = {
    message:string
}

type State = {
    loading: boolean,
    error:error | null
}

type Action = {
    handlerLoading: (value:boolean) => void,
    handlerError: (message:string) => void,
    resetError: () => void
}

const initialState:boolean = false

const useStoreLoading = create<State & Action>()(
    devtools(
        (set)=>({
            loading: initialState,
            error:null,
            handlerLoading: (value:boolean) => set((state) => {
                return {
                    ...state,
                    loading:value
                }
            }),
            handlerError:(message:string) => set((state) => {
                return{
                    ...state,
                    error:{message}
                }
            }),
            resetError: () => set((state)=>{
                return{
                    ...state,
                    error:null
                }
            })
        }),
        {
            name:"Classes",
        }
    )
)

export default useStoreLoading
export {useStoreLoading}