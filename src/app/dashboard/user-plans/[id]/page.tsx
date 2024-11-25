'use client';

import { Page } from '@/components/shell';
import { useParams } from 'next/navigation';
import { UserCard } from '@/features/users';
import { ImageStates } from '@/components/common';
import { Center, SimpleGrid, Stack } from '@mantine/core';
import { FoodProgramsTable } from '@/features/food-programs';
import { WorkoutProgramsTable } from '@/features/workout-programs';
import { useFetchUserPlanById, UserPlanCard } from '@/features/plans';

export default function UserPlanPage() {
  const params = useParams<{ id: string }>();
  const { data, isFetching } = useFetchUserPlanById({ id: params.id });

  return (
    <Page title='Purchased Plans' loading={isFetching}>
      {!data?.user_plan && (
        <Center>
          <ImageStates name='emptyBox1' />
        </Center>
      )}

      {data && data.user_plan && (
        <Stack gap='md'>
          <UserCard user={data.user_plan.user} />
          <UserPlanCard userPlan={data.user_plan} />
          <SimpleGrid cols={{ base: 1, sm: 1, lg: 2 }}>
            <WorkoutProgramsTable userPlanId={data.user_plan.id} userId={data.user_plan.user_id} />
            <FoodProgramsTable userPlanId={data.user_plan.id} userId={data.user_plan.user_id} />
          </SimpleGrid>
        </Stack>
      )}
    </Page>
  );
}
