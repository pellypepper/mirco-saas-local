import { buildBookingsMap, buildProviderMap, buildServiceMap } from "./buildMaps";
import { calculateBookingStats, getRecentBookings } from "./aggregrateBooking";

interface BuildUsersListParams {
  profiles: any[];
  emailMap: Record<string, string>;
  bookings: any[];
  providers: any[];
  services: any[];
}

export function buildUsersList({
  profiles,
  emailMap,
  bookings,
  providers,
  services,
}:  BuildUsersListParams) {
  // Build maps for quick lookup
  const bookingsMap = buildBookingsMap(bookings);
  const providerMap = buildProviderMap(providers);
  const serviceMap = buildServiceMap(services);

  // Build users list
  const users = profiles.map((profile) => {
    const userBookings = bookingsMap[profile.id] ??  [];
    
    // Calculate booking statistics
    const bookingStats = calculateBookingStats(userBookings);
    
    // Get recent bookings with full details
    const recentBookings = getRecentBookings(userBookings, providerMap, serviceMap);

    return {
      ...profile,
      email: emailMap[profile.id] ?? "",
      joined: new Date(profile.created_at).toISOString(),
      ...bookingStats,
      recentBookings,
    };
  });

  return users;
}