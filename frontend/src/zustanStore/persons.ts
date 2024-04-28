import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

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
  clearPersons: () => void,
  updatePersons: (person:Person) => void,
  selectPerson: (person:Person) => void,
  addPerson: (person:Person) => void,
  clearPerson: () => void,
  changePerson: (camp:string, value:string) => void,
  removePerson: (id:number) => void,
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
        persist(
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
                }),
                addPerson: (person:Person) => set(state=>{
                    return{
                        ...state,
                        data:{
                            ...state.data,
                            persons:[
                                ...state.data.persons,
                                person
                            ]
                        }
                    }
                }),
                removePerson: (id:Number) => set(state => {
                    return {
                        ...state,
                        data:{
                            ...state.data,
                            persons: state.data.persons.filter(p=>p.id!==id)
                        }
                    }
                }),
                updatePersons: (person:Person) => set(state => {
                    return{
                        ...state,
                        data: {
                            ...state.data,
                            persons: state.data.persons.map( p => p.id === person.id ? person : p )
                        }
                    }
                })
            }),
            {
                name:"Persons",
            }
        )
    )
)

export default useStorePersons
export {useStorePersons}