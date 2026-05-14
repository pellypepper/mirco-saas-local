import { supabaseAdmin } from '@/libs/supabaseAdmin';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

const { data, error } = await supabaseAdmin
  .from('bookings')
  .select(`
    *,
    customer:profiles!bookings_customer_id_fkey(*),
    provider:profiles!bookings_provider_id_fkey(*),
    services(*),
    availability!bookings_availability_id_fkey(*)
  `)
  .eq('customer_id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}