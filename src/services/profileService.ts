import { supabase } from "@/libs/supabaseClient";
import { supabaseAdmin } from "@/libs/supabaseAdmin";

export const uploadAvatar = async (userId: string, file: File) => {
  const fileExt = file. name.split(".").pop();
  const filePath = `${userId}/avatar.${fileExt}`;

  const { error: uploadError } = await supabase. storage
    .from("avatars")
    .upload(filePath, file, { upsert:  true });

  if (uploadError) throw uploadError;

  const { data } = supabase. storage.from("avatars").getPublicUrl(filePath);
  return data.publicUrl;
};

export const updateProfile = async (
  userId: string,
  role: string,
  formData: any,
  imageUrl: string
) => {
  // Helper function to clean values
  const cleanValue = (value: any) => {
    if (value === "" || value === undefined) return null;
    return value;
  };

  // Helper to convert to integer
  const toInteger = (value: any) => {
    if (value === "" || value === undefined || value === null) return null;
    const parsed = parseInt(value);
    return isNaN(parsed) ? null : parsed;
  };

  const updateFields: any = {
    full_name: cleanValue(formData.full_name),
    bio: cleanValue(formData. bio),
    location: cleanValue(formData.location),
    phone_number: cleanValue(formData.phone_number),
    website: cleanValue(formData.website),
    years_of_experience: toInteger(formData.years_of_experience), // Convert to integer
    avatar_url: imageUrl || null,
  };

  if (role === "provider") {
    updateFields.service_type = cleanValue(formData.service_type);
  }


  

  const { error: updateError } = await supabase
    .from("profiles")
    .update(updateFields)
    .eq("id", userId);

  if (updateError) {
    console.error('Update error:', updateError);
    throw updateError;
  }
};

export async function getProviderWithEmail(providerId: string) {
  // Fetch profile
  const { data: profile, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("id", providerId)
    .single();

  if (profileError) throw profileError;

  // Fetch email using admin API
  const { data: user, error: userError } = await supabaseAdmin.auth.admin.getUserById(providerId);
  if (userError) throw userError;

  return {
    ...profile,
    email: user.user.email,
  };
}