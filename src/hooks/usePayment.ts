import { useState, useEffect } from "react";
import { fetchBookingByPayment, fetchService, fetchProfile } from "@/services/PaymentService";

export const useBooking = (sessionId: string | null, customerId: string | null) => {
  const [booking, setBooking] = useState<any>(null);
  const [serviceDetails, setServiceDetails] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [providerData, setProviderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId || !customerId) {
      setLoading(false);
      return;
    }

    let attempts = 0;
    const maxAttempts = 10;

    const tryFetch = async (): Promise<boolean> => {
      attempts++;
      const data = await fetchBookingByPayment(sessionId, customerId);
      if (data) {
        setBooking(data);
        return true;
      }
      return false;
    };

    const fetchBooking = async () => {
      const found = await tryFetch();
      if (!found && attempts < maxAttempts) {
        const interval = setInterval(async () => {
          const foundNow = await tryFetch();
          if (foundNow || attempts >= maxAttempts) clearInterval(interval);
        }, 1000);

        setTimeout(() => clearInterval(interval), maxAttempts * 1000);
      }
      setLoading(false);
    };

    fetchBooking();
  }, [sessionId, customerId]);

  useEffect(() => {
    if (!booking) return;

    const fetchAllData = async () => {
      if (booking.services_id) setServiceDetails(await fetchService(booking.services_id));
      if (customerId) setProfileData(await fetchProfile(customerId));
      if (booking.provider_id) setProviderData(await fetchProfile(booking.provider_id));
    };

    fetchAllData();
  }, [booking, customerId]);

  return { booking, serviceDetails, profileData, providerData, loading };
};
