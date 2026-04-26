'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  sendCustomerBookingCancelledEmail,
  sendProviderBookingCancelledEmail,
  sendConfirmationEmail,
  sendProviderNotificationEmail,
} from '@/lib/emailSender';
import { Slot } from '@/types/type';

const getEmail = async (id: string) => {
  const res = await fetch(`/api/provider/${id}`);
  return res.json();
};

export const useCustomerModal = ({
  onCancel,
  onClose,
  booking,
  onReschedule,
}: {
  onCancel?: () => void;
  onClose: () => void;
  booking: any;
  onReschedule?: () => void;
}) => {
  const [reason, setReason] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [availabilityId, setAvailabilityId] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const fetchSlots = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/availability/${booking.provider.id}?date=${selectedDate}`);
      const slots = await res.json();
      setAvailableSlots(slots);
    } catch (error) {
  throw  new Error('Failed to load available slots. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [booking.provider.id, selectedDate]);

  useEffect(() => {
    if (selectedDate) fetchSlots();
  }, [selectedDate, fetchSlots]);

  const handleReschedule = async () => {
    if (!selectedDate || !selectedTime || !availabilityId) return;
    if (!selectedTime.includes(' - ')) {
   throw new Error('Invalid time format. Please select a valid time slot.');
      return;
    }

    setLoading(true);
    try {
      const provider = await getEmail(booking.provider_id);
      const customer = await getEmail(booking.customer_id);

      const startTime = selectedTime.split(' - ')[0];
      const [hours, minutes] = startTime.split(':').map(Number);
      const newBookingDate = new Date(selectedDate);
      newBookingDate.setHours(hours, minutes, 0, 0);

      await fetch(`/api/bookings/${booking.id}/reschedule`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newDate: newBookingDate.toISOString(),
          availabilityId,
          oldAvailabilityId: booking.availability.id,
          providerId: booking.provider.id,
        }),
      });

      await fetchSlots();

      sendProviderNotificationEmail({
        to: provider.email ?? '',
        bookingId: booking.id.toString(),
        amount: booking.amount.toString(),
        formattedDate: newBookingDate.toISOString(),
        bookingTime: startTime,
        serviceName: booking.services.title,
        serviceDescription: booking.services.description,
        duration_minutes: booking.services.duration_minutes,
        customerName: customer.full_name ?? '',
        customerEmail: customer.email ?? '',
        customerPhone: customer.phone_number ?? '',
      });

      sendConfirmationEmail({
        to: customer.email ?? '',
        bookingId: booking.id.toString(),
        amount: booking.amount.toString(),
        formattedDate: newBookingDate.toISOString(),
        bookingTime: startTime,
        serviceName: booking.services.title,
        serviceDescription: booking.services.description,
        duration_minutes: booking.services.duration_minutes,
        providerName: provider.full_name ?? '',
        location: provider.location ?? '',
        country: booking.provider.country,
        email: provider.email,
        phone_number: booking.provider.phone_number || '',
      });

      setSuccessOpen(true);
      setTimeout(() => {
        if (onReschedule) onReschedule();
        onClose();
      }, 2000);
    } catch (error) {
      throw new Error('Failed to reschedule booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    setLoading(true);
    const provider = await getEmail(booking.provider_id);
    const customer = await getEmail(booking.customer_id);
    try {
      await fetch(`/api/bookings/${booking.id}/cancel`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ availabilityId: booking.availability.id }),
      });

      await sendCustomerBookingCancelledEmail({
        to: customer?.email || '',
        bookingId: booking.id.toString(),
        amount: booking.amount.toString(),
        formattedDate: selectedDate,
        providerName: provider.full_name ?? '',
        bookingTime: selectedDate.split('T')[1]?.substring(0, 5) || '',
        serviceName: booking.services.title,
        cancellationReason: reason,
        cancelledBy: 'customer',
      });

      await sendProviderBookingCancelledEmail({
        to: provider?.email || '',
        bookingId: booking.id.toString(),
        amount: booking.amount.toString(),
        formattedDate: selectedDate,
        customerName: customer.full_name,
        customerPhone: customer.phone_number ?? '',
        customerEmail: customer.email ?? '',
        bookingTime: selectedDate.split('T')[1]?.substring(0, 5) || '',
        serviceName: booking.services.title,
        cancellationReason: reason,
        cancelledBy: 'customer',
      });

      setSuccessOpen(true);
      setTimeout(() => {
        if (onCancel) onCancel();
        onClose();
      }, 2000);
    } catch (error) {
    throw new Error('Failed to cancel booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    reason,
    setReason,
    loading,
    handleCancel,
    selectedDate,
    setSelectedDate,
    availableSlots,
    selectedTime,
    setSelectedTime,
    setAvailabilityId,
    fetchSlots,
    handleReschedule,
    successOpen,
    setSuccessOpen,
  };
};

export const useBookAgain = ({
  booking,
  onSuccess,
  onClose,
}: {
  booking: any;
  onSuccess: () => void;
  onClose: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState<any[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const providerId = booking.provider.id;
  const serviceId = booking.services.id;

  const fetchSlots = useCallback(
    async (date: string) => {
      try {
        setLoading(true);
        const res = await fetch(`/api/availability/${providerId}?date=${date}`);
        const available = await res.json();
        setSlots(available);
      } catch (e) {
        setSlots([]);
        setError('Failed to load available slots.');
      }
      setLoading(false);
    },
    [providerId],
  );

  useEffect(() => {
    fetchSlots(selectedDate);
  }, [fetchSlots, selectedDate]);

  useEffect(() => {
    fetchSlots(selectedDate);
    setSelectedSlot(null);
  }, [selectedDate, fetchSlots]);

  const handleConfirm = async () => {
    if (!selectedSlot) {
      setError('Please select a slot.');
      return;
    }
    setLoading(true);

    const bookingPayload = {
      customer_email: booking.customer_email,
      metadata: {
        provider_id: providerId,
        customer_id: booking.customer_id,
        availability_id: selectedSlot.id,
        services_id: serviceId,
        amount: String(booking.amount),
        currency: booking.currency,
        admin_fee: String(0),
        provider_amount: String(booking.amount),
      },
    };

    try {
      await fetch('/api/create-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload),
      });

      await fetch(`/api/availability/${selectedSlot.id}/unavailable`, { method: 'PATCH' });
      await fetch(`/api/bookings/${booking.id}`, { method: 'DELETE' });

      setSuccess('Booking successful!');
    } catch (err) {
      setError('Booking failed. Try again.');
    }

    setLoading(false);
  };

  return {
    setError,
    loading,
    slots,
    selectedSlot,
    setSelectedSlot,
    selectedDate,
    setSelectedDate,
    error,
    setSuccess,
    success,
    handleConfirm,
    fetchSlots,
  };
};