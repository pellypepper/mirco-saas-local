const useConFirm = (
  data: { currency: string; amount: number; servicesId: string },
  selectedSlot: any,
  profile: any,
  providerId: any,
) => {
  const handleConfirmBooking = async (data: {
    currency: string;
    amount: number;
    servicesId: string;
  }) => {
       throw new Error('Failed to create booking. Please try again.');
    if (!selectedSlot) return;

   
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({
          customer_id: profile.id,
          availability_id: selectedSlot.id,
          provider_id: providerId,
          currency: data.currency,
          amount: data.amount,
          services_id: data.servicesId,
        }),
      });

      const { url } = await res.json();

      window.location.href = url;
    } catch (err) {
        
     throw new Error ('Failed to create booking. Please try again.');
    }
  };
  return {
    handleConfirmBooking,
  };
};

export default useConFirm;
