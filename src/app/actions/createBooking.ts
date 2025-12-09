"use server";

import { supabaseAdmin } from "@/libs/supabaseAdmin";

export const createBookingAction = async (data: any) => {
  "use server";  // REQUIRED for client-side calling



  const { error } = await supabaseAdmin.from("bookings").insert({
    provider_id: data.metadata.provider_id,
    customer_id: data.metadata.customer_id,
    availability_id: data.metadata.availability_id,
    services_id: data.metadata.services_id,
    amount: data.metadata.amount,
    currency: data.metadata.currency,
    status: "pending",
    booking_date: new Date().toISOString(),
    payment_id: data.paymentId,
    admin_fee: Number(data.metadata.admin_fee),
    provider_amount: Number(data.metadata.provider_amount),
    customer_email: data.customer_email,
  });

  if (error) {
    console.log("Supabase error:", error);
    throw error;
  }

};
