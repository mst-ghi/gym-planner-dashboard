'use client';

import { Page } from '@/components/shell';
import { DashboardCardsCount } from '@/features/reports';

export default function DashboardPage() {
  return (
    <Page title='Dashboard'>
      <DashboardCardsCount />
    </Page>
  );
}
