import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/libs/supabaseAdmin";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY in environment variables");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const supabase = supabaseAdmin;

    // Get profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (profileError) {
      return NextResponse.json({ error: "Profile not found" }, { status: 400 });
    }

    let accountId = profile?.stripe_account_id;

    // Create Stripe Connect account if none exists
    if (!accountId) {
      const account = await stripe.accounts.create({
        type: "express",
        metadata: { userId }, 
      });

      accountId = account.id;

      // Save Stripe account ID AND mark payout_enabled as true
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          stripe_account_id: accountId,
          payout_enabled: true,
        })
        .eq("id", userId);

      if (updateError) {
        console.error("Supabase update error:", updateError);
      }
    } else {
      // Account already exists
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ payout_enabled: true })
        .eq("id", userId);

      if (updateError) {
        console.error("Supabase update error:", updateError);
      }
    }

    //  onboarding link
    const link = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
      type: "account_onboarding",
    });

    return NextResponse.json({ url: link.url });
  } catch (error: any) {
    console.error("API ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
