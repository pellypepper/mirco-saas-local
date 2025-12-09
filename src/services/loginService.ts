import { supabase } from "@/libs/supabaseClient";

export async function loginWithEmail(email: string, password: string) {
  return await supabase.auth.signInWithPassword({ email, password });
}