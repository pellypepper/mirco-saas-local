"use client"; 

import { useState } from "react";
import { useSignUp } from "./useAuth";
import { Capitalize } from "@/lib/Capitalize";
import { useRouter } from "next/navigation";


export default function useCustomerSignup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { signUp, loading } = useSignUp();
  const router = useRouter();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {

    const formattedFullName = Capitalize(fullName);
    const data = await signUp(email, password, formattedFullName);
        router.push(`/auth/check-email?email=${encodeURIComponent(email)}`);
    if (!data) {
      throw new Error("Signup failed");
    }
    setSuccessOpen(true);
  } catch (err: any) {
    console.error("Signup error:", err);
    setErrorMessage(err.message || "Signup failed");
    setErrorOpen(true);
  }
};


  return {
    fullName,
    email,
    password,
    loading,
    successOpen,
    errorOpen,
    errorMessage,
    setFullName,
    setEmail,
    setPassword,
    setSuccessOpen,
    setErrorOpen,
    handleSubmit,

  };
}