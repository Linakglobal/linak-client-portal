import { createClient } from '@supabase/supabase-js'

// Use demo values if environment variables are not set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Client {
  id: string
  email: string
  dob: string
  name?: string
  company?: string
  created_at: string
  updated_at: string
}
