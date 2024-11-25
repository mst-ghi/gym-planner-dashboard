'use client';

import { Page } from '@/components/shell';
import { SimpleGrid } from '@mantine/core';
import { useParams } from 'next/navigation';
import { UserPlansHistory } from '@/features/plans';
import { UserCard, useFetchUserById } from '@/features/users';
import { MedicalRecordCard } from '@/features/medical-records';
import { WorkoutProgramsTable } from '@/features/workout-programs';
import { FoodProgramsTable } from '@/features/food-programs/components';

export default function UserPage() {
  const params = useParams<{ id: string }>();
  const { data, isFetching } = useFetchUserById({ id: params.id });

  return (
    <Page title={data?.user ? data.user.fullname : 'User'} loading={isFetching}>
      <UserCard user={data?.user} />
      <MedicalRecordCard userId={data?.user.id} />
      <UserPlansHistory userId={data?.user.id} />
      <SimpleGrid cols={{ base: 1, sm: 1, lg: 2 }}>
        <WorkoutProgramsTable userId={data?.user.id} />
        <FoodProgramsTable userId={data?.user.id} />
      </SimpleGrid>
    </Page>
  );
}
