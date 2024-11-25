'use client';

import { useApp } from '@/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const { user } = useApp();

  useEffect(() => {
    if (!user) {
      router.replace('/auth/login');
    } else {
      router.replace('/dashboard');
    }
  }, [user]);

  return null;
}
