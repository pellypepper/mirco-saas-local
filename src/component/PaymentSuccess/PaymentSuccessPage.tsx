"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams,} from "next/navigation";
import { useBooking } from "@/hooks/usePayment";
import Loader from "../Spinner";
import Processing from "./Processing";
import SuccessDisplay from "./SuccessDisplay";
import { downloadReceipt, addToCalendar, shareBooking } from "@/lib/HelperFunction";

export default function PaymentSuccessPage() {
  const [confetti, setConfetti] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const customerId = searchParams.get("customer_id");

  const { booking, serviceDetails, profileData, providerData, loading } = useBooking(sessionId, customerId);

  useEffect(() => {
    const timer = setTimeout(() => setConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, [])

  

    if (loading) {
    return (

          <Loader message="Loading booking details.." />
         
    );
  }

  if (!booking) {
    return <Processing />;
  }

  // Extract booking info
  const bookingId = booking.id;
  const serviceName = serviceDetails?.title;
  const providerName = providerData?.full_name;
  const iso = booking.booking_date;
  const dateObj = new Date(iso);
  const formattedDate = dateObj.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const formattedTime = dateObj.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  const bookingTime = formattedTime || "Time not specified";
  const location = providerData?.location || profileData?.location || "Location not specified";
  const confirmationEmail = booking.customer_email || "";
  const amount = booking.amount ? `${booking.currency === 'usd' ? '$' : '£'}${parseFloat(booking.amount).toFixed(2)}` : "£0.00";
   


  



  return (
<SuccessDisplay 
    confetti={confetti}
    bookingId={bookingId}
    serviceName={serviceName}
    providerName={providerName}
    formattedDate={formattedDate}
    bookingTime={bookingTime}
    location={location}
    confirmationEmail={confirmationEmail}
    amount={amount}
    downloadReceipt={() => downloadReceipt(bookingId, serviceName, providerName, formattedDate, bookingTime, location, amount, booking)}
    addToCalendar={() => addToCalendar(bookingId, serviceName, providerName, formattedDate, bookingTime, location, amount, booking)}
    shareBooking={(platform) => shareBooking(setShowShareMenu, platform, bookingId, serviceName, providerName, formattedDate, bookingTime, location, amount, booking)}
    showShareMenu={showShareMenu}
    setShowShareMenu={setShowShareMenu}
    receiptRef={receiptRef}
/>
  );
}
