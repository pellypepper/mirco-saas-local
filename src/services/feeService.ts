export const calculateFees = (amount: number) => {
  const platformFee = Math.round(amount * 0.1 * 100); // in cents

  return {
    platformFee,
    adminFee: (amount * 0.1).toFixed(2),
    providerAmount: (amount * 0.9).toFixed(2),
  };
};
