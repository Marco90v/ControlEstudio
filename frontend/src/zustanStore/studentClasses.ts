import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

type ProfessionSemester = {
    id:number,
    IdPersons:number,
    IdProfession:number,
    IdSemesters:number,
}

type State = {
    professionSemester: ProfessionSemester,
    idsProfessionSemester:number[]
}

type Action = {
  setProfessionSemester: (professionSemester:ProfessionSemester) => void,
  changeProfessionSemester: (camp:string, value:string) => void,
  clearProfessionSemester: () => void,
}

const initialState:ProfessionSemester = {
    id:0,
    IdPersons:0,
    IdProfession:0,
    IdSemesters:0,
}

const useStoreStudentProfessionSemester = create<State & Action>()(
    devtools(
        (set)=>({
            professionSemester: initialState,
            idsProfessionSemester:[],
            setProfessionSemester: (professionSemester:ProfessionSemester) => set((state) => {
                return {
                    ...state,
                    professionSemester: {...professionSemester}
                }
            }),
            changeProfessionSemester: (camp:string, value:string) => set((state) => {
                return {
                    ...state,
                    professionSemester: {
                        ...state.professionSemester,
                        [camp]:Number(value)
                    }
                }
            }),
            clearProfessionSemester: () => set((state) => {
                return {
                    ...state,
                    professionSemester: {...initialState}
                }
            })
        }),
        {
        name:"useStoreStudentProfessionSemester",
        // storage: createJSONStorage(() => sessionStorage)
        }
    )
)

export default useStoreStudentProfessionSemester
export { useStoreStudentProfessionSemester }