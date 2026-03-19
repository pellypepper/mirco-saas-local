import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const type = requestUrl.searchParams.get("type");
  const token_hash = requestUrl.searchParams.get("token_hash");

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );

  // ✅ email_change uses token_hash + verifyOtp, not exchangeCodeForSession
  if (type === "email_change" && token_hash) {
    const { error } = await supabase.auth.verifyOtp({
      type: "email_change",
      token_hash,
    });

    if (error) {
      console.error("[CONFIRM] email_change verifyOtp failed:", error);
      return NextResponse.redirect(
        new URL(`/profile?error=${encodeURIComponent(error.message)}`, requestUrl.origin)
      );
    }

    return NextResponse.redirect(
      new URL("/profile?message=Email changed successfully", requestUrl.origin)
    );
  }

  // ✅ All other flows (signup, recovery) use exchangeCodeForSession
  if (!code) {
    return NextResponse.redirect(new URL("/login", requestUrl.origin));
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("[CONFIRM] exchangeCodeForSession failed:", error);
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(error.message)}`, requestUrl.origin)
    );
  }

  switch (type) {
    case "recovery":
      return NextResponse.redirect(
        new URL("/auth/reset-password", requestUrl.origin)
      );
    default:
      return NextResponse.redirect(new URL("/dashboard", requestUrl.origin));
  }
}