interface Booking {
  id: string;
  booking_date: string;
  status: string;
  amount: number;
  provider_id: string;
  services_id: string;
}

interface BookingStats {
  totalBookings: number;
  completedBookings:  number;
  pendingBookings: number;
  cancelledBookings: number;
  totalSpent: number;
  lastBooking: string | null;
}

export function calculateBookingStats(bookings:  Booking[]): BookingStats {
  const totalBookings = bookings.length;
  const completedBookings = bookings.filter((b) => b.status === "confirmed").length;
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;
  const cancelledBookings = bookings. filter((b) => b.status === "cancelled").length;

  const totalSpent = bookings
    .filter((b) => b.status === "confirmed")
    .reduce((sum, b) => sum + (b.amount || 0), 0);

  const sortedBookings = [...bookings]. sort(
    (a, b) => new Date(b.booking_date).getTime() - new Date(a.booking_date).getTime()
  );

  const lastBooking = sortedBookings[0]?.booking_date ?? null;

  return {
    totalBookings,
    completedBookings,
    pendingBookings,
    cancelledBookings,
    totalSpent,
    lastBooking,
  };
}

export function getRecentBookings(
  bookings: Booking[],
  providerMap: Record<string, any>,
  serviceMap: Record<string, any>,
  limit: number = 5
) {
  const sortedBookings = [...bookings]. sort(
    (a, b) => new Date(b.booking_date).getTime() - new Date(a.booking_date).getTime()
  );

  return sortedBookings.slice(0, limit).map((b) => {
    const provider = providerMap[b.provider_id];
    const service = serviceMap[b.services_id];

    return {
      id:  b.id,
      date: b.booking_date,
      status: b.status,
      amount: b.amount,

      provider: provider
        ? {
            id: provider.id,
            name: provider.full_name,
            avatar: provider. avatar_url,
          }
        : null,

      service:  service
        ? {
            id: service.id,
            name: service.title,
            description: service.description,
            price: service.price,
          }
        : null,
    };
  });
}