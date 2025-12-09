import { supabase } from "@/libs/supabaseClient";

// Fetch authenticated user's object from Supabase
export async function fetchAuthUser() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  return { user, userError };
}

// Fetch the user's profile row from Supabase
export async function fetchUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  return { data, error };
}

// Log out the user
export async function logoutUser() {
  return await supabase.auth.signOut();
}