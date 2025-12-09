import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/libs/supabaseAdmin";

export async function POST(request: Request) {

  
  const data = await request.json();


 
  const bookingData = {
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
  };

  const { data: result, error } = await supabaseAdmin
    .from("bookings")
    .insert(bookingData)
    .select();

  if (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log("✅ Success");
  return NextResponse.json({ success: true, data: result });
}