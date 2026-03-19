"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMainNavBar } from "@/hooks/MainNavContext";

const CheckEmail = () => {
      const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const {isDarkMode} = useMainNavBar();


  return (
       <div className={`min-h-screen flex items-center justify-center px-4 ${isDarkMode ? "bg-zinc-800" : "bg-white"}`}>
      <div className={`max-w-md ${isDarkMode ? "border-2 border-zinc-800" : "border-0"} backdrop-blur-xl w-full transition-colors duration-200 rounded-lg shadow-lg  p-8 text-center`}>
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-chart-2/20 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-chart-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        <h1 className={`  text-2xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          Check Your Email
        </h1>

        <p className={`mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          We&apos;ve sent a confirmation email to{" "}
          {email && <span className="font-semibold">{email}</span>}
          {!email && "your email address"}.
        </p>

        <div className={`${isDarkMode ? "border border-gray-600" : "border border-blue-200"} rounded-lg p-4 mb-6`}>
          <p className="text-sm text-chart-2">
            Click the link in the email to verify your account. The link will
            expire in 24 hours.
          </p>
        </div>

        <div className="space-y-3 text-sm text-gray-600">
          <p>Didn&apos;t receive the email?</p>
          <ul className="list-disc list-inside text-left space-y-1">
            <li>Check your spam/junk folder</li>
            <li>Make sure you entered the correct email</li>
            <li>Wait a few minutes and refresh your inbox</li>
          </ul>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <Link
            href="/"
            className="text-chart-2 hover:chart-2/80 font-medium"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CheckEmail
