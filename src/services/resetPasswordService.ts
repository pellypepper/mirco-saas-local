import { supabase } from "@/libs/supabaseClient";

// Exchanges the token for a Supabase session
export async function exchangeTokenForSession(token: string) {
  return await supabase.auth.exchangeCodeForSession(token);
}

// Actually invokes password reset in your auth system
export async function resetPassword(newPassword: string, resetPasswordFn: (pw: string) => Promise<any>) {

  return await resetPasswordFn(newPassword);
}