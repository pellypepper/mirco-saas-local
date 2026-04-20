'use client';

import { Suspense } from 'react';
import CheckEmail from '@/component/auth/CheckEmail';
import Loader from "@/component/Spinner"

export default function CheckEmailPage() {
  return (
    <Suspense fallback={<Loader />}>
      <CheckEmail />
    </Suspense>
  );
}
