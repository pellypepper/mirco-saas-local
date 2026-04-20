// app/api/bookings/provider/route.ts
import { supabaseAdmin } from '@/libs/supabaseAdmin';
import { createClient } from '@/libs/supabaseServer';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabaseAdmin
    .from('bookings')
    .select('*')
    .eq('provider_id', user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}