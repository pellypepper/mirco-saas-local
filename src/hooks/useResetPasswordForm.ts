"use client"; 


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { exchangeTokenForSession, resetPassword } from "@/services/resetPasswordService";
import { useResetPassword } from "@/hooks/useAuth";

export function useResetPasswordForm() {
  const router = useRouter();
  const { resetPassword: resetPasswordFn } = useResetPassword();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const token = params.get("access_token");

    if (!token) {
      setErrorMessage("Invalid or expired token.");
      setErrorOpen(true);
      return;
    }

    exchangeTokenForSession(token).catch(err => {
      setErrorMessage("Error verifying token: " + err.message);
      setErrorOpen(true);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      setErrorOpen(true);
      return;
    }

    setLoading(true);
    try {
      const result = await resetPassword(newPassword, resetPasswordFn);
      if (result?.error) {
        setErrorMessage(result.error.message || "Failed to reset password.");
        setErrorOpen(true);
      } else {
        setSuccessOpen(true);
        setTimeout(() => router.replace("/"), 3000);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Something went wrong.");
      setErrorOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // Public API of hook
  return {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    successOpen,
    setSuccessOpen,
    errorOpen,
    setErrorOpen,
    errorMessage,
    handleSubmit,
  };
}