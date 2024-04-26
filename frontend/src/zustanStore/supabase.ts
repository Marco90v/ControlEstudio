import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { createClient, SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const db = import.meta.env.VITE_DB_NAME

const temp = localStorage.getItem("token")
const token =  temp ? JSON.parse(temp) : ""

const supabase = createClient(supabaseUrl, supabaseKey, {
  db: {
    schema:db
  },
  global:{
    headers:{
      Authorization:`Bearer ${token}`
    }
  }
})

type State = {
    supabase: SupabaseClient<any, any, any>
}

type Action = {
  setSupabase: (supabase:SupabaseClient<any, any, any>) => void,
  getSupabase: () => SupabaseClient<any, any, any>
}

const useStoreSupabase = create<State & Action>()(
  devtools(
    persist(
      (set)=>({
          supabase,
          setSupabase: (supabase:SupabaseClient<any, any, any>) => set((state) => {
              return {
                  ...state,
                  supabase
              }
          }),
          getSupabase:() => {
            return supabase
          }
      }),
      {
      name:"supabase",
      // storage: createJSONStorage(() => sessionStorage)
      }
    )
  )
)

export default useStoreSupabase
export {useStoreSupabase}