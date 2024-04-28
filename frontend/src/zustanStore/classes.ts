import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

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
  updateClasse: (classe:Classe) => void,
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
        updateClasse: (classe:Classe) => set((state)=>{
          return{
            ...state,
            classes: state.classes.map(c=>c.id===classe.id ? classe : c)
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
      }
    )
  )
)

export default useStoreClasses
export {useStoreClasses}