import { supabase } from "@/libs/supabaseClient";

export const uploadAvatar = async (file: File) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const fileExt = file.name.split(".").pop();
  const filePath = `${user.id}/avatar.${fileExt}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, { upsert: true });

  if (error) throw error;

  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  return data.publicUrl;
};



export const updateProfile = async (
  userId: string,
  role: string,
  formData: any,
  imageUrl: string
) => {
  
  // Convert empty strings to null 
  const sanitized = Object.fromEntries(
    Object.entries(formData).map(([key, value]) => [
      key,
      value === "" ? null : value,
    ])
  );

  const { error } = await supabase
    .from("profiles")
    .update({ ...sanitized, avatar_url: imageUrl })
    .eq("id", userId);

  if (error) throw error;
};