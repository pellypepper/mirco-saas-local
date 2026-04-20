import { createClient } from '@/libs/supabaseClient';

export async function loginWithEmail(email: string, password: string) {
  const supabase =  createClient();
  return await supabase.auth.signInWithPassword({ email, password });
}
