import { supabaseAdmin } from "@/libs/supabaseAdmin";

export const fetchCustomerData = {
  async getProfiles() {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("role", "customer");

    if (error) {
      console.error("Profile fetch error:", error);
      throw new Error(`Failed to fetch profiles: ${error.message}`);
    }

    return data || [];
  },

  async getBookings() {
    const { data, error } = await supabaseAdmin
      .from("bookings")
      .select("*");

    if (error) {
      console.error("Booking fetch error:", error);
      throw new Error(`Failed to fetch bookings: ${error.message}`);
    }

    return data || [];
  },

  async getProviders() {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("id, full_name, avatar_url")
      .eq("role", "provider");

    if (error) {
      console.error("Provider fetch error:", error);
      throw new Error(`Failed to fetch providers: ${error.message}`);
    }

    return data || [];
  },

  async getServices() {
    const { data, error } = await supabaseAdmin
      .from("services")
      .select("id, title, price, description");

    if (error) {
      console.error("Service fetch error:", error);
      throw new Error(`Failed to fetch services: ${error.message}`);
    }

    return data || [];
  },
};