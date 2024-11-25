'use client';

import { useEffect } from 'react';
import { useApp } from '@/hooks';
import { useRouter } from 'next/navigation';
import { DashboardWrapper } from '@/components/shell';

export default function DashboardLayout({ children }: { children?: React.ReactElement }) {
  const router = useRouter();
  const { isLoggedIn } = useApp();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/auth/login');
    }
  }, [isLoggedIn]);

  return <DashboardWrapper>{children}</DashboardWrapper>;
}
