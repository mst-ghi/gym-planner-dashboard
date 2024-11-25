'use client';

import { Page } from '@/components/shell';
import { useSearchParams } from 'next/navigation';
import { useFetchUserById } from '@/features/users';
import { useFetchUserWorkoutProgramById, WorkoutProgramWizard } from '@/features/workout-programs';

export default function NewWorkoutProgramPage() {
  const sp = useSearchParams();
  const userId = sp.get('user_id') || undefined;
  const userPlanId = sp.get('user_plan_id') || undefined;
  const workoutProgramId = sp.get('wp_id') || undefined;

  const userQuery = useFetchUserById({ id: userId });
  const wpQuery = useFetchUserWorkoutProgramById({ id: workoutProgramId });

  return (
    <Page
      loading={userQuery.isFetching || wpQuery.isFetching}
      title={
        wpQuery.data?.workout_program
          ? `Workout Program: and ${wpQuery.data?.workout_program.title}`
          : 'New Workout Program'
      }
    >
      <WorkoutProgramWizard
        userPlanId={userPlanId}
        user={userQuery.data?.user}
        initWorkoutProgram={wpQuery.data?.workout_program}
      />
    </Page>
  );
}
