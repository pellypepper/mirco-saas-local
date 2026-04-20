import { supabaseAdmin } from '@/libs/supabaseAdmin';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { availabilityId } = await request.json();

  await supabaseAdmin.from('bookings').update({ status: 'cancelled' }).eq('id', id);
  await supabaseAdmin.from('availability').update({ is_booked: false }).eq('id', availabilityId);

  return NextResponse.json({ success: true });
}