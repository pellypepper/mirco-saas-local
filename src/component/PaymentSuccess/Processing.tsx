"use client";

import { useRouter } from "next/navigation";

const Processing = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-orange-500 text-xl mb-4">Booking is being processed...</p>
          <p className="text-gray-600 mb-4">Your payment was successful, but the booking is still being set up. Please check your dashboard in a moment.</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-chart-2 hover:bg-chart-3 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
  )
}

export default Processing
