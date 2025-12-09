import { supabase } from "@/libs/supabaseClient";
import { AvailabilityRecord } from "@/types/type";



/**
 * Fetch availability records for a provider
 */
export async function fetchAvailability(providerId: string): Promise<AvailabilityRecord[]> {
  const { data, error } = await supabase
    .from("availability")
    .select("*")
    .eq("is_booked", false)
    .eq("provider_id", providerId)
    .order("date", { ascending: true })
    .order("start_time", { ascending: true });

  if (error) throw error;
  return data || [];
}

/**
 * Save (upsert) new availability records
 */
export async function saveAvailability(records: AvailabilityRecord[]): Promise<void> {
  const { error } = await supabase.from("availability").upsert(records);
  if (error) throw error;
}

/**
 * Delete a specific time slot
 */
export async function deleteSlot(slotId: string): Promise<void> {
  const { error } = await supabase.from("availability").delete().eq("id", slotId);
  if (error) throw error;
}


/**
 * Fetch availability records for a customer
 */
export async function getProviderAvailability(providerId: string): Promise<AvailabilityRecord[]> {
  const { data, error } = await supabase
    .from("availability")
    .select("*")
    .eq("provider_id", providerId)
    .eq("is_booked", false);

  if (error) throw error;
  return data || [];
}


export async function getAvailabilityById(availabilityId: string): Promise<{ is_booked: boolean } | null> {
  const { data, error } = await supabase
      .from("availability")
      .select("is_booked")
      .eq("id", availabilityId)
      .single();
  if (error) {
    console.error("getAvailabilityById error:", error);
    return null;
  }
  return data || null;
}

export async function markAvailabilityAsBooked(availabilityId: string): Promise<void> {
  const { error } = await supabase
    .from("availability")
    .update({ is_booked: true })
    .eq("id", availabilityId);
  if (error) {
    console.error("markAvailabilityAsBooked error:", error);
    throw error;
  }
}

export  async function checkAvailabilitySlotExists (availabilityId: string): Promise<boolean> {
  const { data ,error} = await supabase
      .from("availability")
      .select("is_booked")
      .eq("id", availabilityId)
      .single();
  if (error) {
    console.error("checkAvailabilitySlotExists error:", error);
    return false;
  }
 return !data?.is_booked;
};