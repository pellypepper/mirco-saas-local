

interface Profile {
  id: string;
}


const useStripe = ({profile}:{profile: Profile}) => {

const createStripeLink = async () => {
  
  try {
    const res = await fetch("/api/stripe/create-account", {
      method: "POST",
      body: JSON.stringify({ userId: profile?.id }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Server error:", text);
      alert("Stripe error — check server logs.");
      return;
    }

    const data = await res.json();

    if (data.url) window.location.href = data.url;
  } catch (err) {
    console.error("Client error:", err);
  }
};




  return {
  createStripeLink
}
}

export default useStripe
