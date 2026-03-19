import { supabaseAdmin } from "@/libs/supabaseAdmin";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { newEmail} = await request.json();
  const cookieStore = await cookies();

  // Get current user 
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

  // Get authenticated user 
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

 

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // generate confirmation link
  const { data, error } = await supabaseAdmin.auth.admin.generateLink({
    type: "email_change_new",
    email: user.email!,       // current email
    newEmail: newEmail,       // new email
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/confirm?type=email_change`,
    },
  });

  const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  `http://localhost:3000`;


  // Api call for sending change confirmation email
  await fetch(`${baseUrl}/api/send-change-email`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    to: newEmail,
    currentEmail: user.email,
    confirmationUrl: data?.properties?.action_link,
  }),
});



  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}