'use client';

import { useEffect } from 'react';
import { useApp } from '@/hooks';
import { AuthWrapper } from '@/components/shell';
import { useRouter } from 'next/navigation';

export default function AuthLayout({ children }: { children?: React.ReactElement }) {
  const router = useRouter();
  const { isLoggedIn } = useApp();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/');
    }
  }, [isLoggedIn]);
  return <AuthWrapper>{children}</AuthWrapper>;
}
