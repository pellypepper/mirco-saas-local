"use client";
import BookingsPage from "@/component/ProviderBooking/providerBooking";
import { useUser } from "@/hooks/UserContext";

const ProviderBooking = () => {

const { user } = useUser();

  return (
    <BookingsPage user={user} />
  )
}

export default ProviderBooking