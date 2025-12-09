import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/libs/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: "Invalid email provided." }, { status: 400 });
    }

    // List users (paginated)
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Error checking email." }, { status: 500 });
    }

    // Check if the email exists
    const exists = data.users.some((user) => user.email === email);

    return NextResponse.json({ exists });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error." }, { status: 500 });
  }
}
