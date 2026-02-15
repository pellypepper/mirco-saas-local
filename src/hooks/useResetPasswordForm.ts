"use client"; 

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verifyResetToken, resetPassword } from "@/services/resetPasswordService";
import { useMainNavBar } from "./MainNavContext";

export function useResetPasswordForm() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [tokenVerified, setTokenVerified] = useState(false);
  const { setIsLogin } = useMainNavBar();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    const search = window.location.search;
    
   
    
    if (!hash && !search) {
      setErrorMessage("Invalid or expired token. Please request a new password reset link.");
      setErrorOpen(true);
      setLoading(false);
      return;
    }

    // Verify and establish session from the reset token
    verifyResetToken()
      .then((session) => {
       
        setTokenVerified(true);
        setLoading(false);
      })
      .catch(err => {
     
        setErrorMessage(err.message || "Invalid or expired reset link.");
        setErrorOpen(true);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tokenVerified) {
      setErrorMessage("Please wait for token verification or use a valid reset link.");
      setErrorOpen(true);
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      setErrorOpen(true);
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      setErrorOpen(true);
      return;
    }

    setLoading(true);
    try {
      const result = await resetPassword(newPassword);
      if (!result) {
        throw "Failed to reset password. Please try again.";
      }
      
      setSuccessOpen(true);
      setTimeout(() => {
       
        router.replace("/");
         setIsLogin(true);
      }, 3000);
    } catch (err: any) {
      console.error("Password reset error:", err);
      setErrorMessage(err?.message || "Something went wrong.");
      setErrorOpen(true);
    } finally {
      setLoading(false);
    }
  };

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
    tokenVerified,
  };
}