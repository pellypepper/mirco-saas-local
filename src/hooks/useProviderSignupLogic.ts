"use client"; 
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useProviderSignUp } from "@/hooks/useAuth";
import { fetchServiceTypes } from "@/services/providerService";
import { Capitalize } from "@/lib/Capitalize";

export function useProviderSignupForm(parentOnSubmit?: (data: any) => void) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      service_type: "",
      custom_service_type: "",
      price: "",
      address: "",
      country: "",
    },
  });

  const { signUpProvider, loading, error, message } = useProviderSignUp();
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const selectedServiceType = watch("service_type");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setServiceTypes(await fetchServiceTypes());
    })();
  }, []);

  const onSubmit = async (data: any) => {
    const finalServiceType =
      data.service_type === "Other" ? data.custom_service_type : data.service_type;

    const payload = {
      ...data,
      service_type: finalServiceType,
      price: data.price ? Number(data.price) : null,
    };

    try {

      const formattedName = Capitalize(payload.name);

      const result = await signUpProvider(
        payload.email,
        payload.password,
        formattedName,
        payload.service_type,
        payload.address,
        payload.country,
  
      );

      if (!result || !result.user) {
      setErrorMessage("Signup failed");
      setErrorOpen(true);
      return;
    }
      setSuccessOpen(true);
      if (parentOnSubmit) await parentOnSubmit(payload);
      reset();
        router.push(`/auth/check-email?email=${encodeURIComponent( payload.email)}`);
    } catch (err: any) {
      console.error("Signup failed:", err);
      setErrorMessage(err?.message || "Signup failed");
      setErrorOpen(true);
    }
  };

  return {
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
    isSubmitting,
    reset,
    serviceTypes,
    successOpen,
    setSuccessOpen,
    errorOpen,
    setErrorOpen,
    errorMessage,
    setErrorMessage,
    selectedServiceType,
    loading,
    error,
    message,
    onSubmit,
  };
}