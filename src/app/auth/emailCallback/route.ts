// app/auth/callback/route.ts
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { insertProfile } from "@/services/authService";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Exchange code for session
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Error exchanging code for session:", error);
      return NextResponse.redirect(
        new URL("/auth/error?message=Could not verify email", requestUrl.origin)
      );
    }

    // Get the authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      // Check if profile exists
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("id, role")
        .eq("id", user.id)
        .maybeSingle();

      // If profile doesn't exist, create it from user metadata
      if (!existingProfile) {
        const fullName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
        const role = user.user_metadata?.role || null;

        if (role) {
          await insertProfile(user.id, role, fullName);
        } else {
          // Create profile without role - user will select role later
          await insertProfile(user.id, "customer", fullName); // Default to customer
        }
      }

      // Get updated profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      // Redirect based on role
      if (!profile?.role) {
        return NextResponse.redirect(
          new URL("/select-role", requestUrl.origin)
        );
      }

      const dashboardUrl =
        profile.role === "customer"
          ? "/customer/dashboard"
          : "/provider/dashboard";

      return NextResponse.redirect(new URL(dashboardUrl, requestUrl.origin));
    }
  }

  // Fallback redirect
  return NextResponse.redirect(new URL("/", requestUrl.origin));
}