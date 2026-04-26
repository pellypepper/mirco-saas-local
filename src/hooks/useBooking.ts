'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { AvailabilityRecord, BookingCustomer, BookingProvider } from '@/types/type';
import useExtraService from './extraServices';
import {
  sendCustomerBookingConfirmedEmail,
  sendCustomerBookingCancelledEmail,
  sendProviderBookingCancelledEmail,
  sendProviderBookingConfirmedEmail,
  sendConfirmationEmail,
  sendProviderNotificationEmail,
} from '@/lib/emailSender';

interface FormatTimeOptions {
  hour: '2-digit';
  minute: '2-digit';
}

interface FormatDateOptions {
  weekday: 'short';
  year: 'numeric';
  month: 'short';
  day: 'numeric';
}

interface StatusConfig {
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge: string;
}

const getEmail = async (id: string) => {
  const res = await fetch(`/api/provider/${id}`);
  return res.json();
};

export const useProviderBooking = ({ user }: { user: { id: string } }) => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState<BookingProvider[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<BookingProvider | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [noteInput, setNoteInput] = useState('');
  const [openDelete, setOpenDelete] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchBookings = async () => {
    const response = await fetch('/api/bookings/provider');
    const data = await response.json();
    setBookings(data);
  };

  useEffect(() => {
    setLoading(true);
    fetchBookings().finally(() => setLoading(false));
  }, []);

  const filteredBookings = useMemo(() => {
    if (!search) return bookings;
    return bookings.filter(
      (b) =>
        b.customer?.[0]?.full_name.toLowerCase().includes(search.toLowerCase()) ||
        b.services?.[0]?.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, bookings]);

  const bookingStats = useMemo(
    () => ({
      total: bookings.length,
      confirmed: bookings.filter((b) => b.status === 'confirmed').length,
      pending: bookings.filter((b) => b.status === 'pending').length,
      cancelled: bookings.filter((b) => b.status === 'cancelled').length,
    }),
    [bookings],
  );

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

  const formatTime = (dateString: string) =>
    new Date(dateString).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });

  const handleViewDetails = (booking: BookingProvider) => {
    setSelectedBooking(booking);
    setNoteInput('');
    setShowDetailsModal(true);
  };

  const handleConfirmBooking = async (id: string) => {
    if (!selectedBooking?.provider_id) {
       throw new Error('Missing provider_id in selected booking');
      return;
    }
    setLoading(true);

    await fetch(`/api/bookings/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'confirmed' }),
    });

    const provider = await getEmail(selectedBooking?.provider_id);
    const customer = await getEmail(selectedBooking?.customer[0]?.id);

    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'confirmed' } : b)));
    setShowConfirmModal(false);
    setShowDetailsModal(false);

    sendProviderBookingConfirmedEmail({
      to: provider?.email || '',
      bookingId: selectedBooking?.id || '',
      amount: selectedBooking?.amount.toString() || '',
      formattedDate: formatDate(selectedBooking?.booking_date || ''),
      bookingTime: formatTime(selectedBooking?.booking_date || ''),
      serviceName: selectedBooking?.services[0]?.title || '',
      serviceDescription: selectedBooking?.services[0]?.description || '',
      duration_minutes: selectedBooking?.services[0]?.duration_minutes || 0,
      customerName: customer?.full_name || '',
      customerEmail: customer?.email || '',
      customerPhone: customer?.phone_number || '',
    });

    sendCustomerBookingConfirmedEmail({
      to: customer?.email || '',
      bookingId: selectedBooking?.id || '',
      amount: selectedBooking?.amount.toString() || '',
      formattedDate: formatDate(selectedBooking?.booking_date || ''),
      bookingTime: formatTime(selectedBooking?.booking_date || ''),
      serviceName: selectedBooking?.services[0]?.title || '',
      serviceDescription: selectedBooking?.services[0]?.description || '',
      duration_minutes: selectedBooking?.services[0]?.duration_minutes || 0,
      providerName: provider?.full_name || '',
      location: provider?.location || '',
      country: provider?.country || '',
      email: provider?.email || '',
      phone_number: provider?.phone_number || '',
    });

    setLoading(false);
    setSuccessMessage('Booking confirmed successfully!');
  };

  const handleCancelBooking = async (id: string) => {
    setLoading(true);

    if (!selectedBooking) {
      throw new Error('No booking selected');
      return;
    }

    const provider = await getEmail(selectedBooking?.provider_id);
    const customer = await getEmail(selectedBooking?.customer[0]?.id);

    await fetch(`/api/bookings/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'cancelled' }),
    });

    await fetch(`/api/availability/${selectedBooking?.availability[0]?.id}/available`, {
      method: 'PATCH',
    });

    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b)));

    await sendCustomerBookingCancelledEmail({
      to: customer?.email || '',
      bookingId: selectedBooking?.id.toString() || '',
      amount: selectedBooking?.amount.toString() || '',
      formattedDate: formatDate(selectedBooking?.booking_date || ''),
      providerName: provider.full_name ?? '',
      bookingTime: formatTime(selectedBooking?.booking_date || ''),
      serviceName: selectedBooking?.services[0]?.title || '',
      cancellationReason: 'Provider cancelled the booking',
      cancelledBy: 'provider',
    });

    await sendProviderBookingCancelledEmail({
      to: provider?.email || '',
      bookingId: selectedBooking?.id.toString() || '',
      amount: selectedBooking?.amount.toString() || '',
      formattedDate: formatDate(selectedBooking?.booking_date || ''),
      customerName: customer.full_name,
      customerPhone: customer.phone_number ?? '',
      customerEmail: customer.email ?? '',
      bookingTime: formatTime(selectedBooking?.booking_date || ''),
      serviceName: selectedBooking?.services[0]?.title || '',
      cancellationReason: 'Provider cancelled the booking',
      cancelledBy: 'provider',
    });

    setShowCancelModal(false);
    setShowDetailsModal(false);
    setLoading(false);
    setSuccessMessage('Booking cancelled successfully!');
  };

  const cancelDeleteModal = () => setOpenDelete(false);

  const onConfirmDelete = async (booking: any) => {
    if (!booking) return;

    await fetch(`/api/bookings/${booking.id}`, { method: 'DELETE' });

    setOpenDelete(false);
    fetchBookings();
    setSuccessMessage('Booking deleted successfully!');
  };

  return {
    onConfirmDelete,
    openDelete,
    setOpenDelete,
    cancelDeleteModal,
    search,
    setSearch,
    loading,
    filteredBookings,
    bookingStats,
    formatDate,
    formatTime,
    selectedBooking,
    setSelectedBooking,
    showDetailsModal,
    setShowDetailsModal,
    handleViewDetails,
    showConfirmModal,
    setShowConfirmModal,
    handleConfirmBooking,
    showCancelModal,
    setShowCancelModal,
    handleCancelBooking,
    noteInput,
    setNoteInput,
    successMessage,
    setSuccessMessage,
  };
};

export const useCustomerBooking = ({ user }: { user: { id: string } }) => {
  const [bookings, setBookings] = useState<BookingCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<BookingCustomer | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showBookAgainModal, setShowBookAgainModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/bookings/customer/${user?.id}`);
      const data = await res.json();
      setBookings(data);
    } catch (err) {
        
      setError(err instanceof Error ? err.message : 'Failed to load bookings. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleViewDetails = (booking: BookingCustomer): void => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const handleReschedule = async (booking: BookingCustomer): Promise<void> => {
    setLoading(true);
    setSelectedBooking(booking);
    setShowRescheduleModal(true);
    setLoading(false);
  };

  const handleBookAgain = async (booking: BookingCustomer) => {
    if (!booking?.provider_id) {
      throw new Error('Missing provider_id in booking');
      return;
    }
    setLoading(true);
    setSelectedBooking(booking);

    const customer = await getEmail(booking?.customer_id);
    const provider = await getEmail(booking?.provider_id);

    sendProviderNotificationEmail({
      to: provider.email ?? '',
      bookingId: booking.id.toString(),
      amount: booking.amount.toString(),
      formattedDate: formatDate(booking.booking_date),
      bookingTime: formatTime(booking.booking_date),
      serviceName: booking.services[0]?.title,
      serviceDescription: booking.services[0]?.description,
      duration_minutes: booking.services[0]?.duration_minutes,
      customerName: customer.full_name ?? '',
      customerEmail: customer.email ?? '',
      customerPhone: customer.phone_number ?? '',
    });

    sendConfirmationEmail({
      to: customer.email ?? '',
      bookingId: booking.id.toString(),
      amount: booking.amount.toString(),
      formattedDate: formatDate(booking.booking_date),
      bookingTime: formatTime(booking.booking_date),
      serviceName: booking.services[0]?.title,
      serviceDescription: booking.services[0]?.description,
      duration_minutes: booking.services[0]?.duration_minutes,
      providerName: provider.full_name ?? '',
      location: provider.location ?? '',
      country: booking.provider[0]?.country,
      email: provider.email,
      phone_number: booking.provider[0]?.phone_number || '',
    });

    setLoading(false);
    setShowBookAgainModal(true);
  };

  const handleCancel = (booking: BookingCustomer): void => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  const handleRescheduleSuccess = () => fetchBookings();
  const handleCancelSuccess = () => fetchBookings();
  const handleBookAgainSuccess = async () => await fetchBookings();

  const getStatusConfig = (status: string): StatusConfig => {
    const configs: Record<string, StatusConfig> = {
      confirmed: {
        color: 'bg-[#008800]/20 text-[#008800] border-[#008800]/30',
        icon: CheckCircle,
        label: 'Confirmed',
        badge: 'bg-[#008800]',
      },
      pending: {
        color: 'bg-chart-3/20 text-chart-3 border-chart-3/30',
        icon: AlertCircle,
        label: 'Pending',
        badge: 'bg-chart-4',
      },
      cancelled: {
        color: 'bg-red-50 text-red-700 border-red-200',
        icon: XCircle,
        label: 'Cancelled',
        badge: 'bg-chart-1',
      },
    };
    return configs[status] || configs.pending;
  };

  const formatDate = (dateString: string): string =>
    new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const formatTime = (dateString: string): string =>
    new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

  const formatAmount = (amount: number, currency: string): string => `${amount.toFixed(2)}`;

  const cancelDeleteModal = () => setOpenDelete(false);

  const onConfirmDelete = async (booking: any) => {
    if (!booking) return;
    await fetch(`/api/bookings/${booking.id}`, { method: 'DELETE' });
    setOpenDelete(false);
    fetchBookings();
    setSuccessMessage('Booking deleted successfully!');
  };

  const filteredBookings = bookings.filter(
    (booking) => filter === 'all' || booking.status === filter,
  );

  return {
    bookings,
    loading,
    filter,
    setFilter,
    openDelete,
    setOpenDelete,
    onConfirmDelete,
    cancelDeleteModal,
    error,
    selectedBooking,
    showDetailsModal,
    setShowDetailsModal,
    showRescheduleModal,
    setShowRescheduleModal,
    showCancelModal,
    setShowCancelModal,
    handleViewDetails,
    handleReschedule,
    handleCancel,
    handleRescheduleSuccess,
    handleCancelSuccess,
    getStatusConfig,
    formatDate,
    formatTime,
    formatAmount,
    filteredBookings,
    showBookAgainModal,
    setShowBookAgainModal,
    handleBookAgain,
    handleBookAgainSuccess,
    openMenuId,
    setOpenMenuId,
    successMessage,
    setSuccessMessage,
  };
};

export const useConfirmBooking = ({
  profile,
  providerId,
}: {
  profile: any;
  providerId: string;
}) => {
  const [selectedSlot, setSelectedSlot] = useState<any | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleConfirmBooking = async (data: {
    provider_payout_enabled: boolean;
    currency: string;
    amount: number;
    servicesId: string;
  }) => {
    if (!selectedSlot) return;

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_id: profile.id,
          availability_id: selectedSlot.id,
          provider_id: providerId,
          amount: data.amount,
          services_id: data.servicesId,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || errorData?.message || 'Checkout failed');
      }

      const { url } = await res.json();
      if (!url) throw new Error('Stripe checkout URL missing');
      window.location.href = url;
    } catch (err: any) {
     throw new Error(err.message || 'An error occurred during booking. Please try again.');
      setErrorMessage(err.message);
      setShowError(true);
    }
  };

  return {
    selectedSlot,
    setSelectedSlot,
    showBooking,
    setShowBooking,
    handleConfirmBooking,
    showError,
    setShowError,
    errorMessage,
  };
};

interface Provider {
  id: string;
  avatar_url: string;
  full_name: string;
  service_type: string;
  hourly_rate: number;
  payout_enabled: boolean;
}

export const useBookingModal = ({
  provider,
  slot,
  onConfirm,
}: {
  provider: Provider;
  slot: AvailabilityRecord;
  onConfirm: (data: {
    servicesId: string;
    amount: number;
    currency: string;
    provider_payout_enabled: boolean;
  }) => void;
}) => {
  interface Services {
    id?: string;
    title: string;
    price: number;
    currency: string;
    duration_minutes: number;
  }

  const { services } = useExtraService(provider.id);
  const [selectedService, setSelectedService] = useState<Services | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const startTime =
    slot.start_time && slot.date ? new Date(`${slot.date}T${slot.start_time}`) : null;
  const isValidDate = startTime && !isNaN(startTime.getTime());

  const formattedDate = isValidDate
    ? startTime.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Invalid date';

  const formattedTime = isValidDate
    ? startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : 'Invalid time';

  const avatarSrc =
    provider.avatar_url && provider.avatar_url.trim() !== ''
      ? provider.avatar_url
      : 'https://api.dicebear.com/7.x/initials/svg?seed=' + encodeURIComponent(provider.full_name);

  const isProviderBlocked = !provider.payout_enabled;

  const handleConfirm = () => {
    if (selectedService) {
      onConfirm({
        provider_payout_enabled: provider.payout_enabled,
        servicesId: selectedService.id!,
        amount: selectedService.price,
        currency: selectedService.currency,
      });
    }
  };

  return {
    isProviderBlocked,
    services,
    selectedService,
    setSelectedService,
    isDropdownOpen,
    setIsDropdownOpen,
    formattedDate,
    formattedTime,
    avatarSrc,
    handleConfirm,
  };
};