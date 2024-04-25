import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const db = import.meta.env.VITE_DB_NAME

// const supabase = createClient(supabaseUrl, supabaseKey, { db: {schema:db}})


const createSupabaseClient = (supabaseAccessToken: string | null) => {
    const supabase = createClient(
        supabaseUrl,
        supabaseKey,
        {
            global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
            db: { schema:db }
        }
    );
    console.log(supabase)
    return supabase;
};


// export {supabase}

export {createSupabaseClient}