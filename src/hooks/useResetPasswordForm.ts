"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/services/resetPasswordService";
import { useMainNavBar } from "./MainNavContext";
import { supabase } from "@/libs/supabaseClient";

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

  // Ref to prevent the fallback timeout from firing after token is verified
  const verifiedRef = useRef(false);

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");
  const type = params.get("type");

  // set session manually if token exist
  if (accessToken && refreshToken && type === "recovery") {
    supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    }).then(({ data, error }) => {
         if (data.session) {
        verifiedRef.current = true;
        setTokenVerified(true);
        setLoading(false);

        //  tokens from URL bar
        window.history.replaceState({}, "", "/reset-password");
      } else {
        setErrorMessage("Invalid or expired token. Please request a new password reset link.");
        setErrorOpen(true);
        setLoading(false);
      }
    });
    return;
  }

  // Fallback for onAuthStateChange 
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    
    if ((event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") && session) {
      verifiedRef.current = true;
      setTokenVerified(true);
      setLoading(false);
    }
    if (event === "SIGNED_OUT") {
      setTokenVerified(false);
      setLoading(false);
    }
  });

  const timeout = setTimeout(() => {
    if (!verifiedRef.current) {
      setErrorMessage("Invalid or expired token. Please request a new password reset link.");
      setErrorOpen(true);
      setLoading(false);
    }
  }, 4000);

  return () => {
    subscription.unsubscribe();
    clearTimeout(timeout);
  };
}, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tokenVerified) {
      setErrorMessage(
        "Please wait for token verification or use a valid reset link."
      );
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
        throw new Error("Failed to reset password. Please try again.");
      }

      setSuccessOpen(true);
      setTimeout(() => {
        router.replace("/");
        setIsLogin(true);
      }, 3000);
    } catch (err: any) {

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
    setErrorMessage,
    errorMessage,
    handleSubmit,
    tokenVerified,
  };
}