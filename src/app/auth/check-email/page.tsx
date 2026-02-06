
"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function CheckEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-blue-600"
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

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Check Your Email
        </h1>

        <p className="text-gray-600 mb-6">
          We've sent a confirmation email to{" "}
          {email && <span className="font-semibold">{email}</span>}
          {!email && "your email address"}.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            Click the link in the email to verify your account. The link will
            expire in 24 hours.
          </p>
        </div>

        <div className="space-y-3 text-sm text-gray-600">
          <p>Didn't receive the email?</p>
          <ul className="list-disc list-inside text-left space-y-1">
            <li>Check your spam/junk folder</li>
            <li>Make sure you entered the correct email</li>
            <li>Wait a few minutes and refresh your inbox</li>
          </ul>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}