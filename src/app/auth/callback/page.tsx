"use client";
import AuthCallbackComponent from "@/component/auth/AuthCallbackComponent";
import { useAuthCallback } from "@/hooks/useAuth";

export default function AuthCallbackPage() {
  useAuthCallback(); 
  return <AuthCallbackComponent />;
}