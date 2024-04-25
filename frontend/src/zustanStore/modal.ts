import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type data = {
    id:number,
    names:string,
    IdSemesters?:number,
    semesterName?:string,
    classeName?:string,
}
type State = {
    type:string,
    value:boolean,
    data:data
}

type Action = {
    handlerChange: (value:State) => void,
}

const initialState:State = {
    type:"",
    value:false,
    data:{
        id:0,
        names:""
    }
}

const useStoreModal = create<State & Action>()(
    devtools(
        (set)=>({
            value: initialState.value,
            type: initialState.type,
            data: initialState.data,
            handlerChange: (value:State) => set((state) => {
                return {
                    ...state,
                    ...value
                }
            }),
        }),
        {
            name:"Classes",
        }
    )
)

export default useStoreModal
export {useStoreModal}