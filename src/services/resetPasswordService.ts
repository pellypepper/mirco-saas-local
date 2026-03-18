import { supabase } from "@/libs/supabaseClient";



// Reset password with Supabase 
export async function resetPassword(newPassword: string) {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {

    throw error;
  }

  return data;
}