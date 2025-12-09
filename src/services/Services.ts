import { supabase } from "@/libs/supabaseClient";
import { Service } from "@/types/type";



// FETCH ALL SERVICES OF PROVIDER
export async function getServices(providerId: string) {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("provider_id", providerId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data as Service[];
}

// ADD SERVICE
export async function addService(providerId: string, service: {
  title: string;
  price: number;
  description?: string;
  currency: string;
    duration_minutes?: number;
}) {
  const { data, error } = await supabase
    .from("services")
    .insert([{ provider_id: providerId, ...service }])
    .select()
    .single();

  if (error) throw error;
  return data as Service;
}

// UPDATE SERVICE
export async function updateService(id: string, service: {
  title: string;
  price: number;
  description?: string;
    currency: string;
    duration_minutes?: number;
}) {
  const { data, error } = await supabase
    .from("services")
    .update(service)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Service;
}

// DELETE SERVICE
export async function deleteService(id: string) {
  const { error } = await supabase
    .from("services")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function fetchServiceById(serviceId: string): Promise<Service | null> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("id", serviceId)
    .single();
  if (error) {
    console.error("fetchServiceById error:", error);
    return null;
  }
  return data as Service;
}
