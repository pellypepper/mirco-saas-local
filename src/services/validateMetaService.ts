import { PaymentMetadata } from "../types/type";


class ValidateMetaService {
  static validateMetadata(metadata: PaymentMetadata) {
    const required = [
      "provider_id",
      "customer_id",
      "availability_id",
      "services_id",
      "amount",
      "currency",
    ];

    for (const key of required) {
      if (!metadata[key as keyof PaymentMetadata]) throw new Error("Missing metadata: " + key);
    }
  }

}


export default ValidateMetaService;