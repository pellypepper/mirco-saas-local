"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginWithEmail } from "@/services/loginService";

export function useLoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);



  async function handleEmailSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
    const password = (e.currentTarget.elements.namedItem("password") as HTMLInputElement).value;

    const res = await loginWithEmail(email, password);

    setLoading(false);

    if (res.error) {
      setErrorMsg(res.error.message);
      setErrorOpen(true);
    } else {
      setSuccessOpen(true);
    }
  }

  function handleSuccessClose() {
    setSuccessOpen(false);
    router.replace("/dashboard");
  }

  function handleErrorClose() {
    setErrorOpen(false);
  }

  return {
    loading,
    errorMsg,
    successOpen,
    errorOpen,
 
    handleEmailSignIn,
    handleSuccessClose,
    handleErrorClose,
    setSuccessOpen,
    setErrorOpen
  };
}