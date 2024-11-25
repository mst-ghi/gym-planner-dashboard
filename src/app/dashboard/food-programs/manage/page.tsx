'use client';

import { Page } from '@/components/shell';
import { useSearchParams } from 'next/navigation';
import { useFetchUserById } from '@/features/users';
import { FoodProgramWizard, useFetchUserFoodProgramById } from '@/features/food-programs';

export default function NewFoodProgramPage() {
  const sp = useSearchParams();
  const userId = sp.get('user_id') || undefined;
  const userPlanId = sp.get('user_plan_id') || undefined;
  const foodProgramId = sp.get('fp_id') || undefined;

  const userQuery = useFetchUserById({ id: userId });
  const fpQuery = useFetchUserFoodProgramById({ id: foodProgramId });

  return (
    <Page
      loading={userQuery.isFetching || fpQuery.isFetching}
      title={
        fpQuery.data?.food_program
          ? `Diet program: ${fpQuery.data?.food_program.title}`
          : 'New Diet Program'
      }
    >
      <FoodProgramWizard
        userPlanId={userPlanId}
        user={userQuery.data?.user}
        initFoodProgram={fpQuery.data?.food_program}
      />
    </Page>
  );
}
