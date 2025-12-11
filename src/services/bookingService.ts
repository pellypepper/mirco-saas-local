import { supabaseAdmin } from "@/libs/supabaseAdmin";


class BookingService {


  static async bookingExists(paymentId: string) {
    const { data } = await supabaseAdmin
      .from("bookings")
      .select("id")
      .eq("payment_id", paymentId)
      .single();

    return !!data;
  }

  


  static async createBooking({ paymentId, metadata, customer_email }: any) {
    console.log("Creating booking with metadata:", metadata);
    console.log("Customer email:", customer_email);
    console.log("Payment ID:", paymentId);
    const { error } = await supabaseAdmin.from("bookings").insert({
      provider_id: metadata.provider_id,
      customer_id: metadata.customer_id,
      availability_id: metadata.availability_id,
      services_id: metadata.services_id,
      amount: metadata.amount,
      currency: metadata.currency,
      status: "pending",
      booking_date: new Date().toISOString(),
      payment_id: paymentId,
      admin_fee: Number(metadata.admin_fee),
      provider_amount: Number(metadata.provider_amount),
      customer_email,
    });

    if (error) throw error;
  }

  static async fetchBookingsByCustomer(customerId: string) {
    const { data, error } = await supabaseAdmin
      .from("bookings")
      .select(
        `
        id,
        amount,
        currency,
        provider_id,
        customer_id,
        status,
        booking_date,
        customer_email,
       availability:bookings_availability_id_fkey(id,date, start_time, end_time),
      services:booking_services_id_fkey(id, title, description, duration_minutes),
      provider:profiles!bookings_provider_id_fkey(id, full_name, location, phone_number, country)
      `
      )
      .eq("customer_id", customerId)
      .eq("deleted_by_customer", false)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("fetchBookingsByCustomer error:", error);
      return [];
    }
    return data || [];
  } 

  static async fetchBookingsByProvider(providerId: string) {

  const { data, error } = await supabaseAdmin
    .from("bookings")
    .select(
      `
      id,
      amount,
      currency,
      status,
      booking_date,
      provider_id,
      customer_email,
         availability:bookings_availability_id_fkey(id, date, start_time, end_time),
      services:services_id(id, title, description, duration_minutes),
      customer:profiles!bookings_customer_id_fkey(id, role, full_name, phone_number, country)
      `
    )
    .eq("provider_id", providerId)
    .eq("deleted_by_provider", false)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("fetchBookingsByProvider error:", error);
    return [];
  }

  return data || [];
}

static async updateBookingStatus(bookingId: string, status: string) {
  const { data, error } = await supabaseAdmin
    .from("bookings")
    .update({ status })
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error("updateBookingStatus error:", error);
    return null;
  }

  return data;
}

static async cancelBooking(bookingId: string, availabilityId: string) {
  try {
    // Fetch booking to get provider + slot info
    const { data: booking, error: fetchError } = await supabaseAdmin
      .from("bookings")
      .select("id, provider_id, booking_date, status")
      .eq("id", bookingId)
      .single();

    if (fetchError || !booking) {
      console.error("cancelBooking fetch error:", fetchError);
      return { error: "Booking not found" };
    }


   

    //Update booking status → cancelled
    const { error: updateError } = await supabaseAdmin
      .from("bookings")
      .update({ status: "cancelled" })
      .eq("id", bookingId);

    if (updateError) {
      console.error("cancelBooking update error:", updateError);
      return { error: "Failed to cancel booking" };
    }

    // make the slot available again

    const { error: slotError } = await supabaseAdmin
      .from("availability")
      .update({ is_booked: false })
      .eq("provider_id", booking.provider_id)
  .eq("id", availabilityId)
   
    

    if (slotError) {
      console.error("cancelBooking slot free error:", slotError);
      return { error: "Booking cancelled but slot was not freed" };
    }

    return { success: true };

  } catch (err) {
    console.error("cancelBooking unexpected error:", err);
    return { error: "Unexpected error while cancelling booking" };
  }
}

  
  
static async fetchAvailableSlots(providerId: string, date: string) {
  try {
    // Define start and end of the day as time strings
    console.log('Fetching available slots for providerId:', providerId, 'on date:', date);
    const startTime = "00:00:00";
    const endTime = "23:59:59";

    // Fetch availability for the provider
    const { data, error } = await supabaseAdmin
      .from("availability")
      .select(`
        id,
        start_time,
        end_time,
        is_booked
      `)
      .eq("provider_id", providerId)
      .eq("date", date)
      .gte("start_time", startTime)
      .lte("start_time", endTime)
      .order("start_time", { ascending: true });

    if (error) {
      console.error("fetchAvailableSlots error:", error);
      return [];
    }
console.log('Availability fetch result:', data);
    // Filter only unbooked slots
    const availableSlots = data?.filter((slot: any) => !slot.is_booked) || [];

    return availableSlots;
  } catch (err) {
    console.error("Error fetching available slots:", err);
    return [];
  }
}



static async rescheduleBooking(bookingId: string, timestamp: string, availability_id: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from("bookings")
      .update({ booking_date: timestamp , status : "pending", availability_id })
      .eq("id", bookingId)
      .select()
      .single();

    if (error) {
      console.error("rescheduleBooking error:", error);
      return null;
    }
    
    return data;
  } catch (err) {
    console.error("Error rescheduling booking:", err);
    return null;
  }
}
// bookingService.ts
static async makeSlotAvailable(
  providerId: string | number,
availabilityId: string
) {
  try {
   console.log("Making slot available:", availabilityId, "for provider:", providerId);
    const { data, error } = await supabaseAdmin
      .from("availability")
      .update({ is_booked: false })
      .eq("provider_id", providerId)
      .eq("id", availabilityId)
       .select();
     

   

    if (error) {
      console.error("makeSlotAvailable error:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Error making slot available:", err);
    return null;
  }
}


static async markSlotUnavailable(providerId: string | number, availabilityId: string) {
  try {
        const { data, error } = await supabaseAdmin
      .from("availability") 
      .update({ is_booked: true })
      .eq("provider_id", providerId)
      .eq("id", availabilityId);



    if (error) {
      console.error("markSlotUnavailable error:", error);
      return null;
    }
    return data;
  } catch(error) {
    console.error("markSlotUnavailable error:", error);
    return null;
  }
}

static async deleteBookingForCustomer(bookingId: string) {
  const { data, error } = await supabaseAdmin
    .from("bookings")
    .update({ deleted_by_customer: true })
    .eq("id", bookingId)
    .select()
    .single();
  if (error) {
    console.error("deleteBookingForCustomer error:", error);
    return null;
  }
  return data;
}

static async deleteBookingForProvider(bookingId: string) {
  console.log("Deleting booking for provider, bookingId:", bookingId);
  try {
    const { data, error } = await supabaseAdmin
      .from("bookings")
      .update({ deleted_by_provider: true }) 
      .eq("id", bookingId)
      .select()
      .single();

    if (error) {
      console.error("deleteBookingForProvider error:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("deleteBookingForProvider exception:", err);
    return null;
  }
}


}
export default BookingService;
