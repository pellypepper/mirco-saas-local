import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/libs/supabaseAdmin";

export async function GET() {
  // Fetch ONLY providers
  const { data: profiles, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("role", "provider");

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  // Fetch auth emails
  const { data: authUsers, error: authError } =
    await supabaseAdmin.auth.admin.listUsers();

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 500 });
  }

  const emails: Record<string, string> = {};
  authUsers.users.forEach((user) => {
    emails[user.id] = user.email ?? "";
  });

  //  Fetch provider revenue + bookings
  const { data: revenueData } = await supabaseAdmin.rpc("calculate_provider_revenue");

  const revenueMap: Record<string, any> = {};
  revenueData?.forEach((r: any) => {
    revenueMap[r.provider_id] = r;
  });

  //  Normalize final provider object
  const providers = profiles.map((p) => ({
   ...p,
    email: emails[p.id] || "No email",

   

    // revenue data
    revenue: revenueMap[p.id]?.total_revenue ?? 0,
    bookings: revenueMap[p.id]?.total_bookings ?? 0,
    monthly: revenueMap[p.id]?.monthly || [],
    adminFee: revenueMap[p.id]?.total_admin_fee ?? 0,

    raw: p, // keep full profile
  }));

  return NextResponse.json({ providers });
}
