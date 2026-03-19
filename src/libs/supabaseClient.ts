import { createBrowserClient } from "@supabase/ssr";


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wcqqluhzyzprvmfqsdgh.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjcXFsdWh6eXpwcnZtZnFzZGdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2ODAxODIsImV4cCI6MjA3NjI1NjE4Mn0.xaNNLg5biCq8qCE5FlLrZ93M_N-IZUr30XMODdqonM0';

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);