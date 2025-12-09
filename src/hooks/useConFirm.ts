

const useConFirm = (data: {currency: string, amount: number, servicesId: string }, selectedSlot: any, profile: any, providerId: any) => {

     const handleConfirmBooking = async (data: {currency: string, amount: number, servicesId: string }) => {
    console.log("Selected slot:", selectedSlot);
    if (!selectedSlot) return;

    console.log("Booking data:", {customer_id: profile.id, availability_id: selectedSlot.id, provider_id: providerId , currency: data.currency, amount: data.amount, services_id: data.servicesId });

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        
        body: JSON.stringify({customer_id: profile.id, availability_id: selectedSlot.id, provider_id: providerId , currency: data.currency, amount: data.amount, services_id: data.servicesId }),
      });

   const { url } = await res.json();


  window.location.href = url;
    } catch (err) {
      console.error(err);
      alert("Failed to create booking");
    }
  };
  return {
   handleConfirmBooking
  }
}

export default useConFirm
