import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const type = requestUrl.searchParams.get("type");

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

  // Email change confirmed
  if (type === "email_change") {
    return NextResponse.redirect(
      new URL("/profile?message=Email changed successfully", requestUrl.origin)
    );
  }

  //  session exchange
  if (!code) {
    return NextResponse.redirect(new URL("/login", requestUrl.origin));
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
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