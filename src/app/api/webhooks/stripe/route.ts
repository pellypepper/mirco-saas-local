import { NextResponse } from "next/server";
import StripeWebhookService from "@/services/stripeWebhookService";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const result = await StripeWebhookService.handleRequest(req);
    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
