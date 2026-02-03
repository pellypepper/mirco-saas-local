"use client"; 

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useProviderSignUp } from "@/hooks/useAuth";
import { fetchServiceTypes, upsertProviderProfile } from "@/services/providerService";

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
      const result = await signUpProvider(
        payload.email,
        payload.password,
        payload.name,
        payload.service_type,
        payload.address,
        payload.country,
  
      );

      if (result?.user) {
        const { error: upsertError } = await upsertProviderProfile({
          id: result.user.id,
          name: payload.name,
          service_type: payload.service_type,
          address: payload.address,
          country: payload.country,
        
        });

        if (upsertError) {
          setErrorMessage(upsertError.message);
          setErrorOpen(true);
        } else {
          setSuccessOpen(true);
        }
      }

      if (parentOnSubmit) await parentOnSubmit(payload);
      reset();
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