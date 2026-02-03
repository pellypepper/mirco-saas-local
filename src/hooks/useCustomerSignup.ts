"use client"; 

import { useState } from "react";
import { useSignUp } from "./useAuth";


export default function useCustomerSignup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { signUp, loading } = useSignUp();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {

    
    const data = await signUp(email, password, fullName);
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