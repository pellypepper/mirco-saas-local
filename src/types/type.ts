export interface TimeSlot {
  id: string;
  start: string;
  end: string;
  label: string;
  isSaved?: boolean;
}

export interface AvailabilityRecord {
  id?: string;
  provider_id: string;
  date: string;
  start_time: string;
  end_time: string;
  is_booked?: boolean;
}


export interface Service {
  id: string;
  provider_id: string;
  title: string;
  price: number;
  description?: string;
  currency?: string;
  duration_minutes?: number;
  created_at: string;
}

export interface PaymentMetadata {
  provider_id: string;
  customer_id: string;
  availability_id: string;
  services_id: string;
  amount: string;
  currency: string;
  admin_fee: string;
  provider_amount: string;
}

export interface BookingProvider {
  id: string;
  amount: number;
  currency: string;
  status: string;
  booking_date: string;
  customer_email: string;
  provider_id: string;
  availability: {
    id: string;
    date: string;
    start_time: string;
    end_time: string;
  };

  services: {
    title: string;
    description: string;
    duration_minutes: number;
  };

  customer: {
    id: string;
    full_name: string;
    phone_number?: string;
    country?: string;
  };
}


export interface BookingCustomer {
  id: string | number;
  amount: number;
  currency: string;
  status: string;
  booking_date: string;
  customer_email: string;
  services: {
    title: string;
    description: string;
    duration_minutes: number;
  };
  provider: {
    id: string | number;
    full_name: string;
    location: string;
    country: string;
    email?: string;
    phone_number?: string;
  };
}