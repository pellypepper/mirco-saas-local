'use client';

import { useState, useEffect } from 'react';
import { fetchBookingByPayment, fetchService, fetchProfile } from '@/services/PaymentService';

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
    let interval: NodeJS.Timeout = null as any;

    const tryFetch = async () => {
      attempts++;
      const data = await fetchBookingByPayment(sessionId, customerId);

      if (data) {
        setBooking(data);
        setLoading(false);       // ✅ only stop loading when found
        clearInterval(interval);
        return;
      }

      if (attempts >= maxAttempts) {
        setLoading(false);       // ✅ give up after max attempts
        clearInterval(interval);
      }
    };

    // Try immediately, then every second
    tryFetch();
    interval = setInterval(tryFetch, 1000);

    // Safety cleanup after 15 seconds
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setLoading(false);
    }, 15000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
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