"use client";

import { use } from "react"; 
import { ProviderProfile } from "@/component/dashboard/customerMainDisplay/ProviderProfile";
import BookingModal from "@/component/dashboard/customerMainDisplay/component/BookingModal";
import { useRouter } from "next/navigation";
import { useProvider } from "@/hooks/useProvider";
import useAvailability from "@/hooks/useAvailability";
import Loader  from "@/component/Spinner";
import { useUser } from "@/hooks/UserContext";
import  {useConfirmBooking} from "@/hooks/useBooking";

export default function ProviderPage({ params }: any) {
  const router = useRouter();
 const { id: providerId } = use(params) as { id: string };
   const {  profile } = useUser();

  


  // Fetch provider
   const {providerData, providerLoading} = useProvider(providerId);

  // Fetch availability
  const {availability, loading} = useAvailability(providerId);

// Booking modal state
  const { handleConfirmBooking, selectedSlot, setSelectedSlot, showBooking, setShowBooking } = useConfirmBooking({ profile, providerId });



  if (loading || providerLoading) return <Loader />;

  if (!providerData) return  <Loader />;

  return (
    <>
      <ProviderProfile
        provider={  providerData}
        availability={availability}
        onBookClick={(slot) => {
          setSelectedSlot(slot);
          setShowBooking(true);
        }}
        onBack={() => router.push("/dashboard")}
      />

      {showBooking && selectedSlot && (
        <BookingModal
          slot={selectedSlot}
          provider={providerData}
          onConfirm={handleConfirmBooking}
          onClose={() => setShowBooking(false)}
        />
      )}
    </>
  );
}
