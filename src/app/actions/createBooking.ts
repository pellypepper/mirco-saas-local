'use server';

import { supabaseAdmin } from '@/libs/supabaseAdmin';

interface BookingData {
  metadata: {
    provider_id: string;
    customer_id: string;
    availability_id: string;
    services_id: string;
    amount: number;
    currency: string;
    admin_fee: string | number;
    provider_amount: string | number;
  };
  paymentId: string;
  customer_email: string;
}
 

export const createBookingAction = async (data: BookingData) => {
  'use server'; // REQUIRED for client-side calling


  
  
  const { error } = await supabaseAdmin.from('bookings').insert({
    provider_id: data.metadata.provider_id,
    customer_id: data.metadata.customer_id,
    availability_id: data.metadata.availability_id,
    services_id: data.metadata.services_id,
    amount: data.metadata.amount,
    currency: data.metadata.currency,
    status: 'pending',
    booking_date: new Date().toISOString(),
    payment_id: data.paymentId,
    admin_fee: Number(data.metadata.admin_fee),
    provider_amount: Number(data.metadata.provider_amount),
    customer_email: data.customer_email,
  });

  if (error) {
 
    throw error;
  }
};
