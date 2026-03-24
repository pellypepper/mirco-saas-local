'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMainNavBar } from '@/hooks/MainNavContext';
import { useRouter } from 'next/navigation';

const ChangeEmailSuccess = () => {
  const searchParams = useSearchParams();
  const message = searchParams.get('message');
  const error = searchParams.get('error');
  const [visible, setVisible] = useState(false);
  const { isDarkMode } = useMainNavBar();
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`   min-h-screen flex items-center justify-center relative overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div
        className={`w-full max-w-md  border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} rounded-2xl p-10 shadow-md transition-all duration-500 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-lg flex items-center justify-center mb-7 ${
            message ? 'bg-chart-2/10' : error ? 'bg-red-100' : 'bg-gray-100'
          }`}
        >
          {message ? (
            <svg
              className="w-6 h-6 stroke-[#0077b6]"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          ) : error ? (
            <svg
              className="w-6 h-6 stroke-red-600"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 stroke-gray-400"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          )}
        </div>

        {/* Heading */}
        <p
          className={`"text-xs uppercase font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-500'} mb-1"`}
        >
          Account Settings
        </p>
        <h1
          className={`    text-2xl font-bold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}
        >
          {message ? 'Email updated' : error ? 'Update failed' : 'Your Profile'}
        </h1>
        <p className="text-sm text-gray-500 mb-5">
          {message
            ? 'Your email address has been changed successfully. Use it to sign in going forward.'
            : error
              ? 'Something went wrong while updating your email. Please try again.'
              : 'Manage your account information below.'}
        </p>

        {/* Banner */}
        {message && (
          <div className="flex items-start gap-2 mb-4 p-3 rounded bg-chart-2/10 border border-chart-2/20 text-chart-2">
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{decodeURIComponent(message)}</span>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 mb-4 p-3 rounded bg-red-100 border border-red-200 text-red-700">
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span>{decodeURIComponent(error)}</span>
          </div>
        )}

        {/* Info rows */}
        <div className="space-y-2">
          <div className="flex justify-between items-center border-t border-gray-200 pt-2">
            <span className="text-xs uppercase font-medium text-gray-500">Status</span>
            <span className="inline-flex items-center gap-1 bg-chart-2/10 text-chart-2 rounded-full px-2 py-0.5 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-chart-2" />
              Active
            </span>
          </div>
          <div className="flex justify-between items-center border-t border-gray-200 pt-2">
            <span className="text-xs uppercase font-medium text-gray-500">Last updated</span>
            <span
              className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} font-normal`}
            >
              {new Date().toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
          <div className="flex justify-between items-center border-t border-gray-200 pt-2">
            <span className="text-xs uppercase font-medium text-gray-500">Change</span>
            <span
              className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} font-normal`}
            >
              Email address
            </span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => router.push('/dashboard')}
          className="w-full mt-6 px-4 py-3 rounded-lg bg-chart-2 text-white text-sm font-medium hover:bg-chart-2/80transition"
        >
          Back to account
        </button>

        <p className="text-xs text-gray-500 text-center mt-3">
          Didn't make this change?{' '}
          <a className="text-chart-4 font-medium hover:underline" href="/support">
            Contact support →
          </a>
        </p>
      </div>
    </div>
  );
};

export default ChangeEmailSuccess;
