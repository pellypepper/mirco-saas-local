"use client";

import { CheckCircle, Calendar, Clock, MapPin, ArrowRight, Download, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";

const SuccessDisplay = ({  confetti,
    receiptRef,
  bookingId,
  serviceName,
  providerName,
  formattedDate,
  bookingTime,
  location,
  confirmationEmail,
  amount,
  downloadReceipt,
  addToCalendar,
  shareBooking,
  showShareMenu,
  setShowShareMenu} : {
    confetti: boolean;
    bookingId: string;
  receiptRef: React.RefObject<HTMLDivElement | null>; 
    serviceName: string;
    providerName: string;
    formattedDate: string;
    bookingTime: string;
    location: string;
    confirmationEmail: string;
    amount: string;
    downloadReceipt: () => void;
    addToCalendar: () => void;
    shareBooking: (platform: string) => void;
    showShareMenu: boolean;
    setShowShareMenu: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {

    const router = useRouter();
  return (
       <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 relative overflow-hidden">
      {/* Rest of the component remains the same... */}
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-75"></div>
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-150"></div>
      </div>

      {/* Confetti Effect */}
      {confetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                backgroundColor: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'][Math.floor(Math.random() * 4)],
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Success Icon with Animation */}
        <div className="text-center mb-8 animate-scale-in">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-chart-2/80 to-chart-3/80 rounded-full shadow-2xl mb-6 animate-bounce-slow">
            <CheckCircle className="w-14 h-14 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-chart-2 to-chart-3">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your booking has been confirmed. {confirmationEmail && (
              <>We've sent the details to{' '}
              <span className="font-semibold text-emerald-600">{confirmationEmail}</span></>
            )}
          </p>
        </div>

        {/* Booking Details Card */}
        <div ref={receiptRef} className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8 transform hover:scale-[1.02] transition-all duration-300">
          <div className="bg-gradient-to-r from-chart-2/80 to-chart-3/80 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-50 text-sm font-medium mb-1">Booking Reference</p>
                <p className="text-white text-2xl font-bold">{bookingId}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl">
                <p className="text-white text-3xl font-bold">{amount}</p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-6">
            {/* Service */}
            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-chart-2 to-chart-3 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 mb-1">Service</p>
                <p className="text-lg font-semibold text-gray-900">{serviceName}</p>
                <p className="text-sm text-gray-600 mt-1">with {providerName}</p>
              </div>
            </div>

            {/* Date & Time */}
            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 mb-1">Date & Time</p>
                <p className="text-lg font-semibold text-gray-900">{formattedDate}</p>
                <p className="text-sm text-gray-600 mt-1">{bookingTime}</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 mb-1">Location</p>
                <p className="text-lg font-semibold text-gray-900">{location}</p>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-chart-2 hover:text-chart-3 font-medium mt-2 hover:underline inline-block"
                >
                  Open in Maps →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <button 
            onClick={downloadReceipt}
            className="flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
          >
            <Download className="w-5 h-5" />
            <span>Download Receipt</span>
          </button>
          
          <button 
            onClick={addToCalendar}
            className="flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
          >
            <Calendar className="w-5 h-5" />
            <span>Add to Calendar</span>
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="w-full flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
            
            {/* Share Menu */}
            {showShareMenu && (
              <div className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-10 min-w-[200px]">
                {navigator.share && (
                  <button
                    onClick={() => shareBooking('native')}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700 font-medium"
                  >
                    📱 Share...
                  </button>
                )}
                <button
                  onClick={() => shareBooking('whatsapp')}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700 font-medium"
                >
                  💬 WhatsApp
                </button>
                <button
                  onClick={() => shareBooking('twitter')}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700 font-medium"
                >
                  🐦 Twitter
                </button>
                <button
                  onClick={() => shareBooking('facebook')}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700 font-medium"
                >
                  📘 Facebook
                </button>
                <button
                  onClick={() => shareBooking('email')}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700 font-medium"
                >
                  ✉️ Email
                </button>
                <button
                  onClick={() => shareBooking('copy')}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700 font-medium border-t border-gray-100"
                >
                  🔗 Copy Link
                </button>
              </div>
            )}
          </div>
        </div>

        {/* What's Next Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 mb-8 border border-blue-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What happens next?</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-chart-2 text-white rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <p className="text-gray-700 pt-1">
                You'll receive a confirmation email with all the booking details
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-chart-2 text-white rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <p className="text-gray-700 pt-1">
                We'll send you a reminder 24 hours before your appointment
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-chart-2 text-white rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <p className="text-gray-700 pt-1">
                You can manage or reschedule your booking from your dashboard
              </p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => router.push('/dashboard/customerBooking')}
            className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-chart-2 to-chart-3 hover:from-chart-2 hover:to-chart-3 text-white font-bold py-5 px-8 rounded-xl shadow-2xl hover:shadow-chartd-500/50 transition-all duration-300 transform hover:scale-105"
          >
            <span>View My Bookings</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => router.push('/dashboard/providers')}
            className="flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 text-gray-900 font-semibold py-5 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-gray-300"
          >
            <span>Book Another Service</span>
          </button>
        </div>

        {/* Support Section */}
        <div className="text-center mt-12 p-6 bg-white/50 backdrop-blur-sm rounded-2xl">
          <p className="text-gray-600">
            Need help? Contact us at{' '}
            <a href="mailto:support@example.com" className="text-chart-2 hover:text-chart-3 font-semibold hover:underline">
              Booking@ppeliance.co.uk
            </a>
          </p>
        </div>
      </div>

      {/* Click outside to close share menu */}
      {showShareMenu && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowShareMenu(false)}
        />
      )}

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes scale-in {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .delay-75 {
          animation-delay: 0.75s;
        }
        .delay-150 {
          animation-delay: 1.5s;
        }
      `}</style>
    </div>
  )
}

export default SuccessDisplay
