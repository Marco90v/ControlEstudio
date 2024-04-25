import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

type Role = {
    id: number,
    names: string,
}

type State = {
    roles: Role[]
}

type Action = {
  setRoles: (roles:Role[]) => void,
  clearRoles: () => void
}

const initialState:Role[] = []

const useStoreRoles = create<State & Action>()(
    devtools(
        persist(
            (set)=>({
                roles: initialState,
                setRoles: (roles:Role[]) => set((state) => {
                    return {
                        ...state,
                        roles: roles
                    }
                }),
                clearRoles: () => set((state) => {
                    return {
                        ...state,
                        roles: []
                    }
                })
            }),
            {
            name:"Roles",
            // storage: createJSONStorage(() => sessionStorage)
            }
        )
    )
)

export default useStoreRoles
export {useStoreRoles}