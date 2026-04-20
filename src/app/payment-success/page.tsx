'use client';

import { Suspense } from 'react';
import PaymentSuccessPage from '@/component/PaymentSuccess/PaymentSuccessPage';
import Loader from "@/component/Spinner"

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<Loader message='Loading payment confirmation...' />}>
      <PaymentSuccessPage />
    </Suspense>
  );
}
