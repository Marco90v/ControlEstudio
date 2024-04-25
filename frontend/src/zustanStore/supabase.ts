import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { createClient, SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const db = import.meta.env.VITE_DB_NAME

const supabase = createClient(supabaseUrl, supabaseKey, { db: {schema:db}})

type State = {
    supabase: SupabaseClient<any, any, any>
}

type Action = {
  setSupabase: (supabase:SupabaseClient<any, any, any>) => void,
}

const useStoreSupabase = create<State & Action>()(
  devtools(
    (set)=>({
        supabase,
        setSupabase: (supabase:SupabaseClient<any, any, any>) => set((state) => {
            return {
                ...state,
                supabase
            }
        }),
    }),
    {
    name:"supabase",
    // storage: createJSONStorage(() => sessionStorage)
    }
  )
)

export default useStoreSupabase
export {useStoreSupabase}