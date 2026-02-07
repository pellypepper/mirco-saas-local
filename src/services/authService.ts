import { supabase } from "@/libs/supabaseClient";
import { supabaseAdmin } from "@/libs/supabaseAdmin";

export const upsertUserProfile = async (
  userId: string,
  role: "customer" | "provider",
  fullName: string,
  extraFields: Record<string, any> = {}
) => {
  const { error } = await supabase
    .from("profiles")
    .upsert(
      { 
        id: userId, 
        role, 
        full_name: fullName, 
        ...extraFields,
        updated_at: new Date().toISOString()
      },
      {
        onConflict: 'id'
      }
    );
  if (error) throw error;
};

export async function getCurrentSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

// Fetches the user profile/role from Supabase
export async function getUserRole(userId: string) {
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role, full_name, id")
    .eq("id", userId)
    .maybeSingle(); // Use maybeSingle() instead of single() to avoid error when no row exists

  return { profile, error };
}

// Check if user has a profile
export async function hasUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", userId)
    .maybeSingle();

  return { exists: !!data, error };
}

// Create initial profile for OAuth users
export async function createOAuthProfile(userId: string, email: string, fullName?: string) {
  const { data, error } = await supabase
    .from("profiles")
    .insert({
      id: userId,
      full_name: fullName || email.split('@')[0],
      role: null, // Role will be set later
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
     .maybeSingle();

  return { data, error };
}


export async function insertProfile(
  userId: string, 
  role: "customer" | "provider", 
  fullName: string,
  extraFields: Record<string, any> = {}
) {
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .insert({
      id: userId,
      full_name: fullName,
      role,
      ...extraFields,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single();
    
  if (error) {
      console.error("Profile insertion error:", error);
      return { data: null, error };
    }
  return { data, error };
}


export async function resendVerificationEmail(email: string) {
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
  });

  return { error };
}