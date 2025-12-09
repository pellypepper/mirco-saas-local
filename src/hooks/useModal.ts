import { useState,useEffect, useCallback } from "react";
import BookingService from '@/services/bookingService';
import { set } from "react-hook-form";

export const useCustomerModal = ({onCancel, onClose, booking, onReschedule}: {onCancel?: () => void; onClose: () => void; booking: any ; onReschedule?: () => void }) => {

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
          console.log('Rescheduling to:', selectedDate);
      const slots = await BookingService.fetchAvailableSlots(String(booking.provider.id), selectedDate);
     
      setAvailableSlots(slots);
    } catch (error) {
      console.error('Error fetching slots:', error);
    } finally {
      setLoading(false);
    }
  }, [booking.provider.id, selectedDate]);

  useEffect(() => {
    if (selectedDate) {
      fetchSlots();
    }
  }, [selectedDate, fetchSlots]);

const handleReschedule = async () => {
  if (!selectedDate || !selectedTime || !availabilityId) return;

  if (!selectedTime.includes(" - ")) {
    console.error("Invalid selectedTime format:", selectedTime);
    return;
  }

  setLoading(true);
  try {
const oldDate = booking.booking_date.split("T")[0];
const oldStartTime = new Date(booking.booking_date)
  .toISOString()
  .split("T")[1]
  .substring(0, 5); // "HH:MM"


    // Extract new start time
    const startTime = selectedTime.split(" - ")[0];
    const [hours, minutes] = startTime.split(":").map(Number);

    const newBookingDate = new Date(selectedDate);
    newBookingDate.setHours(hours, minutes, 0, 0);

    await BookingService.rescheduleBooking(
      String(booking.id),
      newBookingDate.toISOString(),
           availabilityId,
    );
 
    // ✅ Make the old slot available again
    await BookingService.makeSlotAvailable(
      booking.provider.id,
            booking.availability.id,
    );
  

    await BookingService.markSlotUnavailable(
      booking.provider.id,
     availabilityId,
    );

 

    await fetchSlots(); // Refresh available slots





      setSuccessOpen(true);

      setTimeout(() => {
  if (onReschedule) onReschedule();
  onClose();
}, 2000);
  } catch (error) {
    console.error("Error rescheduling:", error);
  } finally {
    setLoading(false);
  }
};


  const handleCancel = async () => {
    setLoading(true);
    try {
      await BookingService.cancelBooking(String(booking.id), booking.availability.id);
     setSuccessOpen(true);

      setTimeout(() => {
  if (onCancel) onCancel();
  onClose();
}, 2000);
    } catch (error) {
      console.error('Error cancelling booking:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return{
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

  }
}


export const useBookAgain = ({booking, onSuccess, onClose}: {
  booking: any;
  onSuccess: ()=> void;
  onClose: ()=> void;
})=>{


const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState<any[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const providerId = booking.provider.id;
  const serviceId = booking.services.id;



  // Fetch slots for a specific date
  const fetchSlots = useCallback(async (date: string) => {
    try {
      setLoading(true);
      const available = await BookingService.fetchAvailableSlots(providerId, date);
      setSlots(available);
    } catch (e) {
      setSlots([]);
      setError("Failed to load available slots.");
    }
    setLoading(false);
  }, [providerId]);


  // Fetch today's slots on first load
  useEffect(() => {
    fetchSlots(selectedDate);
  }, [fetchSlots, selectedDate]);


  // Fetch slots whenever date changes
  useEffect(() => {
    fetchSlots(selectedDate);
    setSelectedSlot(null); // Reset slot when date changes
  }, [selectedDate, fetchSlots]);


  const handleConfirm = async () => {
    if (!selectedSlot) {
      setError("Please select a slot.");
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
    }
    };
    try {
        const response = await fetch("/api/create-booking", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(bookingPayload),
});

const result = await response.json();

      await BookingService.markSlotUnavailable(providerId, selectedSlot.id);
   
      await BookingService.deleteBookingForCustomer(booking.id);
   
      
      setSuccess("Booking successful!");
    
  

    } catch (err) {
      setError("Booking failed. Try again.");
    }

    setLoading(false);
  };



  return{
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
    

  }
}