interface Provider {
  id: string;
  full_name: string;
  avatar_url: string | null;
}

interface Service {
  id: string;
  title: string;
  price:  number;
  description: string;
}

interface Booking {
  id: string;
  customer_id: string;
  provider_id: string;
  services_id: string;
  booking_date: string;
  status: string;
  amount: number;
}

export function buildBookingsMap(bookings: Booking[]): Record<string, Booking[]> {
  const bookingsMap: Record<string, Booking[]> = {};

  bookings.forEach((booking) => {
    if (!bookingsMap[booking.customer_id]) {
      bookingsMap[booking.customer_id] = [];
    }
    bookingsMap[booking.customer_id].push(booking);
  });

  return bookingsMap;
}

export function buildProviderMap(providers:  Provider[]): Record<string, Provider> {
  const providerMap: Record<string, Provider> = {};

  providers.forEach((p) => {
    providerMap[p.id] = p;
  });

  return providerMap;
}

export function buildServiceMap(services: Service[]): Record<string, Service> {
  const serviceMap: Record<string, Service> = {};

  services.forEach((s) => {
    serviceMap[s.id] = s;
  });

  return serviceMap;
}