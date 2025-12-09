export const calculateFees = (amount: number) => {
  const platformFee = Math.round(amount * 0.10 * 100); // in cents

  return {
    platformFee,
    adminFee: (amount * 0.10).toFixed(2),
    providerAmount: (amount * 0.90).toFixed(2),
  };
};
