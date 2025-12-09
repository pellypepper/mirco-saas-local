import { supabase } from "@/libs/supabaseClient";

export const upsertUserProfile = async (
  userId: string,
  role: "customer" | "provider",
  fullName: string,
  extraFields: Record<string, any> = {}
) => {
  const { error } = await supabase
    .from("profiles")
    .upsert({ id: userId, role, full_name: fullName, ...extraFields });
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
    .select("role")
    .eq("id", userId)
    .single();
  return { profile, error };
}


