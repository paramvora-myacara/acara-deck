import { createClient } from '@supabase/supabase-js'

export const createSupabaseServerClient = () => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing env.SUPABASE_SERVICE_ROLE_KEY')
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        // It's recommended to disable auto-refreshing sessions for server-side clients
        // as they are stateless and will be re-created on each request.
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
} 