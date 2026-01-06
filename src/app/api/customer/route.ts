import { NextResponse } from "next/server";
import { fetchAuthEmails } from "./helpers/fetchAuthEmail";
import { fetchCustomerData } from "./helpers/fetchCustomerData";
import { buildUsersList } from "./helpers/buildUserList";

export async function GET() {
  try {
    
    // Fetch all required data
    const [profiles, emailMap, bookings, providers, services] = await Promise.all([
      fetchCustomerData. getProfiles(),
      fetchAuthEmails(),
      fetchCustomerData.getBookings(),
      fetchCustomerData.getProviders(),
      fetchCustomerData.getServices(),
    ]);

    // Build the users list with all aggregated data
    const users = buildUsersList({
      profiles,
      emailMap,
      bookings,
      providers,
      services,
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Unexpected error in /api/customer:", error);
    return NextResponse. json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}