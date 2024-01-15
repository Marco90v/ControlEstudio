import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

type Classe = {
    id:number | null | undefined,
    names: string | null | undefined,
}

type State = {
    classes: Classe[]
}

type Action = {
  setClasses: (classe:Classe[]) => void,
  addClasse: (classe:Classe) => void,
  deleteClasse: (id:number) => void
}

const initialState:Classe[] = []

const useStoreClasses = create<State & Action>()(
  devtools(
    persist(
      (set)=>({
        classes: initialState,
        setClasses: (classe:Classe[]) => set((state) => {
            return {
                ...state,
                classes: classe 
            }
        }),
        addClasse: ({id,names}:Classe) => set((state)=> {
          return {
            ...state,
            classes: [...state.classes, {id, names}]
          }
        }),
        deleteClasse: (id:number) => set((state)=>{
          return {
            ...state,
            classes: state.classes.filter(item=>item.id!==id)
          }
        })
      }),
      {
        name:"Classes",
        storage: createJSONStorage(() => sessionStorage)
      }
    )
  )
)

export default useStoreClasses
export {useStoreClasses}