import { NextResponse } from "next/server";
import StripeService from "@/services/stripeService";
import {getAvailabilityById} from "@/services/availabilityService";
import { getProviderStripeId } from "@/services/providerService";
import { validateCheckoutInput } from "@/services/validationService";
import { calculateFees } from "@/services/feeService";

export async function POST(req: Request) {
  try {
    const input = await req.json();

    // Validate request
    const validationError = validateCheckoutInput(input);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const { availability_id, provider_id, amount } = input;

    // Check availability
    const availability = await getAvailabilityById(availability_id);
    if (!availability || availability.is_booked) {
      return NextResponse.json(
        { error: "This time slot is no longer available" },
        { status: 400 }
      );
    }

    // Check provider Stripe onboarding
    const stripeAccount = await getProviderStripeId(provider_id);
    if (!stripeAccount) {
      return NextResponse.json(
        { error: "Provider has not completed Stripe onboarding" },
        { status: 400 }
      );
    }

    // Calculate fees
    const fees = calculateFees(Number(amount));

    // Create Stripe session
    const session = await StripeService.createCheckoutSession({
      ...input,
      stripeAccount,
      fees
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("CHECKOUT ERROR:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
