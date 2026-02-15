import { supabase } from "@/libs/supabaseClient";

// Verify reset token
export async function verifyResetToken() {
 
  
  //get session
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
   
    throw new Error("Unable to verify reset session: " + error.message);
  }
  
  if (!session) {
    throw new Error("No active reset session found. Please click the reset link from your email again.");
  }

  
  return session;
}

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