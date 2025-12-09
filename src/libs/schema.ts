// types.ts

export type Role = 'provider' | 'customer' | 'admin';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Profile {
  id: string;            // Supabase auth user ID
  full_name: string;
  service_type?: string;
  price?: number;
  location?: string;
  country?: string;      // 🆕 Added country field
  bio?: string;
  avatar_url?: string;
  role: Role;
  created_at: string;    // ISO string
}



export interface Availability {
  id?: string;
  provider_id: string;
  date: string;       // YYYY-MM-DD
  start_time: string; // HH:MM:SS
  end_time: string;   // HH:MM:SS
  is_booked: boolean;
}


export interface Booking {
  id: string;
  provider_id: string;
  customer_id: string;
  availability_id: string;
  services_id?: string; // 🆕 Added services_id field
  booking_date: string;  // ISO string
  status: BookingStatus;
  payment_id?: string;
  amount ?: number; // 🆕 Added amount field
  currency ?: string; // 🆕 Added currency field
  admin_fee ?: string; // 🆕 Added admin_fee field
  paid_at ?: string;    // ISO string
  created_at: string; // ISO string  

}
