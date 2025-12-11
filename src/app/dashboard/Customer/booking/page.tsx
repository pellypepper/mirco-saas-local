"use client";

import { useUser } from "@/hooks/UserContext";
import CustomerBookingsPage from "@/component/CustomerBooking/customerBooking";

export default function CustomerBooking() {
  const { user } = useUser();

  return <CustomerBookingsPage user={user} />;
}
