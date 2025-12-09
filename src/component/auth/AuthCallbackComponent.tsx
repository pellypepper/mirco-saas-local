"use client";
import Loader from "@/component/Spinner";

export default function AuthCallbackComponent() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loader message="Processing authentication..." />
    </div>
  );
}