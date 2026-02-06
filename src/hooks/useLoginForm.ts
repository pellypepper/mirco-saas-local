"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginWithEmail } from "@/services/loginService";
import { getUserRole } from "@/services/authService";
import { supabase } from "@/libs/supabaseClient";

export function useLoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [showResendEmail, setShowResendEmail] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState<string>("");
  const [resendLoading, setResendLoading] = useState(false);

  async function handleEmailSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setShowResendEmail(false);

    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
    const password = (e.currentTarget.elements.namedItem("password") as HTMLInputElement).value;

    try {
      const res = await loginWithEmail(email, password);

      if (res?.error) {
        // Special handling for unverified email
        if (
          res.error.message === "Email not confirmed" ||
          res.error.message.includes("not confirmed") ||
          res.error.message.includes("Email not confirmed")
        ) {
          setErrorMsg(
            "Please verify your email address. Check your inbox for the confirmation link."
          );
          setShowResendEmail(true);
          setUnverifiedEmail(email);
        } else {
          // Map other error messages to user-friendly text
          const errorMessage = getErrorMessage(res.error.message);
          setErrorMsg(errorMessage);
        }
        setErrorOpen(true);
        setLoading(false);
        return;
      }

      // Success - show success message
      setSuccessOpen(true);

      // Add delay before redirect
      setTimeout(() => {
        checkUserRoleAndRedirect();
      }, 1500);
    } catch (err: any) {
      console.error("Login error:", err);
      setErrorMsg("An unexpected error occurred. Please try again.");
      setErrorOpen(true);
    } finally {
      setLoading(false);
    }
  }

  // Resend verification email function
  async function handleResendEmail() {
    if (!unverifiedEmail) return;

    setResendLoading(true);
    setErrorMsg(null);

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: unverifiedEmail,
      });

      if (error) {
        setErrorMsg("Failed to resend email: " + error.message);
        setErrorOpen(true);
      } else {
        setErrorMsg("Verification email sent! Please check your inbox.");
        setSuccessOpen(true);
        setShowResendEmail(false);
        setErrorOpen(false);
      }
    } catch (err: any) {
      setErrorMsg("Failed to resend email. Please try again.");
      setErrorOpen(true);
    } finally {
      setResendLoading(false);
    }
  }

  // Helper function to provide user-friendly error messages
  function getErrorMessage(errorMsg: string): string {
    const errorMap: Record<string, string> = {
      "Email not confirmed": "Please verify your email address. Check your inbox for the confirmation link.",
      "Invalid login credentials": "Invalid email or password. Please try again.",
      "User not found": "No account found with this email. Please sign up first.",
      "Invalid email": "Please enter a valid email address.",
      "Password should be at least 6 characters": "Password must be at least 6 characters long.",
      "Too many requests": "Too many login attempts. Please try again later.",
      "Network request failed": "Network error. Please check your connection and try again.",
    };

    // Check for exact matches
    if (errorMap[errorMsg]) {
      return errorMap[errorMsg];
    }

    // Check for partial matches
    for (const [key, value] of Object.entries(errorMap)) {
      if (errorMsg.includes(key)) {
        return value;
      }
    }

    // Return original error if no match found
    return errorMsg || "An error occurred. Please try again.";
  }

  // Helper function to check role and redirect
  async function checkUserRoleAndRedirect() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { profile } = await getUserRole(user.id);

    if (!profile?.role) {
      router.push("/select-role");
      return;
    }

    if (profile.role === "customer") {
      router.push("/customer/dashboard");
    } else if (profile.role === "provider") {
      router.push("/provider/dashboard");
    }
  }

  function handleSuccessClose() {
    setSuccessOpen(false);
    router.replace("/dashboard");
  }

  function handleErrorClose() {
    setErrorOpen(false);
    setShowResendEmail(false);
  }

  return {
    loading,
    errorMsg,
    successOpen,
    errorOpen,
    showResendEmail,
    resendLoading,
    handleEmailSignIn,
    handleResendEmail,
    handleSuccessClose,
    handleErrorClose,
    setSuccessOpen,
    setErrorOpen,
  };
}