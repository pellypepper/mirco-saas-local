import { supabaseAdmin } from '@/libs/supabaseAdmin';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data, error } = await supabaseAdmin
    .from('bookings')
    .select('*, customer:profiles!customer_id(*), provider:profiles!provider_id(*), services(*), availability(*)')
    .eq('customer_id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}