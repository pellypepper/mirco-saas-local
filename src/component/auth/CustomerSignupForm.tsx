


"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "../Spinner";
import SuccessModal from "../SuccessModal";
import ErrorModal from "../ErrorModal";
import useCustomerSignup from "@/hooks/useCustomerSignup";

export default function CustomerSignupForm({ setIsLogin, setIsOpen }: any) {
  const {
    fullName,
    email,
    password,
    loading,
    successOpen,
    errorOpen,
    errorMessage,
    handleSubmit,
    handleLogin,
    setFullName,
    setEmail,
    setPassword,
    setSuccessOpen,
    setErrorOpen
  } = useCustomerSignup({ setIsLogin, setIsOpen });

  return (
    <div className="relative">
      {loading && <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 rounded-md"><Loader message="Creating Account..." /></div>}

      <SuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} title="Account Created!" message="Your account has been created." buttonText="Log in" />
      <ErrorModal open={errorOpen} onClose={() => setErrorOpen(false)} title="Signup Failed" message={errorMessage} buttonText="Close" />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <Button className="w-full" type="submit" disabled={loading}>Sign Up</Button>
        <p className="text-center text-sm text-gray-600">
          Already have an account? <span onClick={handleLogin} className="text-chart-2 cursor-pointer">Log in</span>
        </p>
      </form>
    </div>
  );
}
