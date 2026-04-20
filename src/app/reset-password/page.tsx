'use client';

import { Suspense } from 'react';
import ResetPasswordPage from '@/component/auth/ResetPasswordPage';
import Loader from "@/component/Spinner"

export default function ResetPassword() {
  return (
    <Suspense fallback={<Loader message='Loading reset password page...' />}>
      <ResetPasswordPage />
    </Suspense>
  );
}
