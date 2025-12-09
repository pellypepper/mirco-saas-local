import { useState } from "react";
import { useSignUp } from "./useAuth";
import { upsertUserProfile } from "@/services/authService";

export default function useCustomerSignup({ setIsLogin, setIsOpen }: any) {
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
      if (data?.user) await upsertUserProfile(data.user.id, "customer", fullName);
      setSuccessOpen(true);
    } catch (err: any) {
      setErrorMessage(err.message || "Signup failed");
      setErrorOpen(true);
    }
  };

  const handleLogin = () => {
    setIsLogin(true);
    setIsOpen(false);
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
    handleLogin,
  };
}
