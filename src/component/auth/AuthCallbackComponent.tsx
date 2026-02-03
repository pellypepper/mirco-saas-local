"use client";

import { Suspense } from "react";

import Loader from "@/component/Spinner";
import { useMainNavBar } from "@/hooks/MainNavContext";

function CallbackContent() {

  const { isDarkMode } = useMainNavBar();

  const bgPrimary = isDarkMode ? "bg-zinc-900" : "bg-zinc-50";

  return (
    <div className={`min-h-screen ${bgPrimary} flex items-center justify-center`}>
      <div className="text-center">
        <Loader message="Completing sign in..." />
        <p className={`mt-4 text-sm ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}>
          Please wait while we authenticate your account
        </p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallbackContent />
    </Suspense>
  );
}