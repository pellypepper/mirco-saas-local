'use client';

import { Suspense } from 'react';
import ChangeEmailSuccess from '@/component/auth/changeEmailSuccess';
import Loader from "@/component/Spinner"

export default function ProfilePage() {
  return (
    <Suspense fallback={<Loader message='Loading profile page...' />}>
      <ChangeEmailSuccess />
    </Suspense>
  );
}
