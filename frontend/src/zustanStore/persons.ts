import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

type Person = {
    email: string,
    id: number,
    lastNames: string,
    names: string,
    phone: number,
    role: number,
    sex: string,
    idPerson: number,
    name:string,
    photo?: string | undefined | null,
}

type State = {
    data: {
        persons: Person[],
        person: Person
    }
}

type Action = {
  setPersons: (persons:Person[]) => void,
  selectPerson: (person:Person) => void,
  clearPersons: () => void,
  clearPerson: () => void,
  changePerson: (camp:string, value:string) => void
}

const initialState={
    persons: [],
    person: {
        email: "",
        id: 0,
        lastNames: "",
        names: "",
        phone: 0,
        photo: "",
        role: 0,
        sex: "",
        idPerson: 0,
        name: "",
    }
}

const useStorePersons = create<State & Action>()(
    devtools(
        (set)=>({
            data: initialState,
            setPersons: (persons:Person[]) => set((state) => {
                return {
                    ...state,
                    data:{
                        ...state.data,
                        persons:persons,
                    }
                }
            }),
            selectPerson: (person:Person) => set((state) => {
                return {
                    ...state,
                    data:{
                        ...state.data,
                        person:person
                    }
                }
            }),
            clearPersons: () => set((state) => {
                return {
                    ...state,
                    data: {...initialState}
                }
            }),
            clearPerson: () => set((state) => {
                return {
                    ...state,
                    data:{
                        ...state.data,
                        person: initialState.person
                    }
                }
            }),
            changePerson: (camp:string, value:string) => set((state) => {
                return {
                    ...state,
                    data: {
                        ...state.data,
                        person: {
                            ...state.data.person,
                            [camp]:value
                        }
                    }
                }
            })
        }),
        {
        name:"Persons",
        // storage: createJSONStorage(() => sessionStorage)
        }
    )
)

export default useStorePersons
export {useStorePersons}