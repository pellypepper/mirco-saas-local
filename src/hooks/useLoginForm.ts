import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginWithEmail } from "@/services/loginService";

export function useLoginForm({ setIsLogin, setIsForgotPassword, setIsOpen }: {
  setIsForgotPassword: (value: boolean) => void,
  setIsLogin: (value: boolean) => void,
  setIsOpen: (value: boolean) => void
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  function handleForgotPassword() {
    setIsForgotPassword(true);
    setIsLogin(false);
  }

  function handleSignup() {
    setIsLogin(false);
    setIsOpen(true);
  }

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
    handleForgotPassword,
    handleSignup,
    handleEmailSignIn,
    handleSuccessClose,
    handleErrorClose,
    setSuccessOpen,
    setErrorOpen
  };
}