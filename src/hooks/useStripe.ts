interface Profile {
  id: string;
}

const useStripe = ({ profile }: { profile: Profile }) => {
  const createStripeLink = async () => {
    try {
      const res = await fetch('/api/stripe/create-account', {
        method: 'POST',
        body: JSON.stringify({ userId: profile?.id }),
      });

      if (!res.ok) {
        const text = await res.text();
   throw new Error(`Stripe account creation failed: ${text}`);
       
        return;
      }

      const data = await res.json();

      if (data.url) window.location.href = data.url;
    } catch (err) {
        throw new Error('Failed to create Stripe account. Please try again.');
    }
  };

  return {
    createStripeLink,
  };
};

export default useStripe;
