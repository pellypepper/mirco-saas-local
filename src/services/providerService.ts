import { supabase } from "@/libs/supabaseClient";

export const fetchServiceTypes = async (): Promise<string[]> => {
  const { data, error } = await supabase.from("profiles").select("service_type");
  if (error) {
    console.error("Error fetching service types:", error);
    return [];
  }
  const uniqueTypes = Array.from(
    new Set(
      data
        .map((item: any) => item.service_type)
        .filter((type: string | null) => type && type.trim() !== "")
    )
  ).sort();
  return uniqueTypes;
};

export const upsertProviderProfile = async ({
  id,
  name,
  service_type,
  address,
  country,

}: {
  id: string;
  name: string;
  service_type: string;
  address: string;
  country: string;

}) => {
  return await supabase.from("profiles").upsert({
    id,
    role: "provider",
    full_name: name,
    service_type,
    location: address,
    country,

  });
};


export const fetchProviderProfile = async () => {

       const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "provider");


      if (!error) return data || [];
    };


export const fetchProviderById = async (providerId: string) => {
  const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", providerId)
        .single();

      if (!error) return data || [];
    };


export const getProviderStripeId = async (providerId: string): Promise<string | null> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("stripe_account_id")
    .eq("id", providerId)
    .single();  
  if (error) {
    console.error("getProviderStripeId error:", error);
    return null;
  }
  return data?.stripe_account_id || null;
}