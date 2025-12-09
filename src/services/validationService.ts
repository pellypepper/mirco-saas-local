export const validateCheckoutInput = (input: any) => {
  const required = [
    "availability_id",
    "provider_id",
    "customer_id",
    "services_id",
    "amount",
    "currency"
  ];

  for (const field of required) {
    if (!input[field]) return `Missing ${field}`;
  }

  if (isNaN(Number(input.amount)) || Number(input.amount) <= 0) {
    return "Invalid amount";
  }

  return null; // Valid
};
