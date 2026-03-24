'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMainNavBar } from '@/hooks/MainNavContext';

const CheckEmail = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const { isDarkMode } = useMainNavBar();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const bgPage = isDarkMode ? 'bg-zinc-900' : 'bg-gray-50';
  const cardBg = isDarkMode
    ? 'bg-zinc-800 border-zinc-700 text-zinc-100'
    : 'bg-white border-gray-200 text-gray-900';
  const subText = isDarkMode ? 'text-zinc-300' : 'text-gray-600';
  const noticeBg = isDarkMode
    ? 'bg-chart-2/10 border-chart-2/40 text-gray-300'
    : 'bg-chart-2/10 border-chart-2/20 text-chart-2/70';

  return (
    <div
      className={`${bgPage} min-h-screen grid place-items-center p-4 transition-colors duration-300`}
    >
      <div
        className={`w-full max-w-md rounded-2xl p-10 border shadow-md transform transition-all duration-500 ${cardBg} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
      >
        {/* Icon */}
        <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-7 bg-chart-2/10 border border-chart-2/30">
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
        </div>

        {/* Heading */}
        <p className="text-xs uppercase font-medium text-chart-2/70 mb-1">Verification required</p>
        <h1 className="text-2xl font-serif mb-2">Check your inbox</h1>
        <p className={`text-sm mb-5 ${subText}`}>
          We sent a confirmation link to{' '}
          {email ? (
            <span className="inline-block bg-chart-2/10 border border-chart-2/30 text-chart-2/70 rounded px-2 py-0.5 font-medium">
              {email}
            </span>
          ) : (
            'your email address'
          )}
          .
        </p>

        {/* Notice */}
        <div className={`flex items-start gap-2 p-3 rounded border ${noticeBg} mb-5`}>
          <svg
            className="w-4 h-4 flex-shrink-0 stroke-current"
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
          <span>
            Click the link in the email to verify your account. The link expires in{' '}
            <strong>24 hours</strong>.
          </span>
        </div>

        {/* Steps */}
        <p className={`text-xs font-medium uppercase mb-2 ${subText}`}>Didn't receive it?</p>
        <div
          className={`border rounded-lg mb-5 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
        >
          {[
            'Check your spam or junk folder',
            'Confirm you used the correct email',
            'Wait a few minutes then refresh',
          ].map((text, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 p-3 border-t first:border-t-0 rounded-t-none ${isDarkMode ? 'bg-zinc-700 text-gray-300 border-gray-700' : 'bg-gray-50 text-gray-600 border-gray-200'}`}
            >
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-100 border border-blue-300 text-chart-2/70 text-xs font-semibold">
                {i + 1}
              </span>
              {text}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center flex-wrap gap-2">
          <span className={`text-xs ${subText}`}>Wrong address?</span>
          <Link
            href="/"
            className="text-chart-2/60 font-medium text-sm hover:underline flex items-center gap-1"
          >
            ← Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckEmail;
