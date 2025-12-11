export const calculatePercentageChange = (current: number, previous: number) => {
  if (previous === 0) {
    return current > 0 ? 100 : 0;
  }
  return Math.min(Math.round(((current - previous) / previous) * 100), 100);
};

export const formatActivityMessage = (b: any, customer: any) => {
  if (b.status === "confirmed") {
    return `Booking confirmed: ${b.services?.title} for ${customer.full_name}`;
  } else if (b.status === "pending") {
    return `New booking request from ${customer.full_name} awaiting your approval`;
  } else if (b.status === "cancelled") {
    return `Booking cancelled by ${customer.full_name}`;
  }
  return `Booking updated: ${b.services?.title}`;
};
