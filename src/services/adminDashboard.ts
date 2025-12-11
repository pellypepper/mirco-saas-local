import { supabase } from "@/libs/supabaseClient";

export async function getBookings() {
  return await supabase.from("bookings").select("*");
}

export async function getCustomers() {
  return await supabase.from("profiles").select("*").eq("role", "customer");
}

export async function getProviders() {
  return await supabase.from("profiles").select("*").eq("role", "provider");
}

export async function getServices() {
  return await supabase.from("services").select("*");
}

export const adminDashboardService = {
  getBookings,
  getCustomers,
  getProviders,
  getServices
};
