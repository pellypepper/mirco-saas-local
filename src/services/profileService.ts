import { supabase } from "@/libs/supabaseClient";
import { supabaseAdmin } from "@/libs/supabaseAdmin";

export const uploadAvatar = async (userId: string, file: File) => {
  const fileExt = file.name.split(".").pop();
  const filePath = `${userId}/avatar.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, { upsert: true });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
  return data.publicUrl;
};

export const updateProfile = async (
  userId: string,
  role: string,
  formData: any,
  imageUrl: string
) => {
  const updateFields: any = {
    full_name: formData.full_name,
    bio: formData.bio,
    location: formData.location,
    phone_number: formData.phone_number,
    website: formData.website,
      years_of_experience: formData.years_of_experience,
    avatar_url: imageUrl,
  };

  if (role === "provider") {
    updateFields.service_type = formData.service_type;
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update(updateFields)
    .eq("id", userId);

  if (updateError) throw updateError;
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