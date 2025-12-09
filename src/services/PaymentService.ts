import { supabase } from "@/libs/supabaseClient";

export const fetchBookingByPayment = async (paymentId: string, customerId: string) => {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .or(`payment_id.eq.${paymentId},payment_id.like.pi_%`)
      .eq("customer_id", customerId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("fetchBookingByPayment error:", err);
    return null;
  }
};

export const fetchService = async (serviceId: string) => {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("id", serviceId)
    .single();
  if (error) console.error("fetchService error:", error);
  return data;
};

export const fetchProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) console.error("fetchProfile error:", error);
  return data;
};
