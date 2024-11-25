import { Center, Stack } from '@mantine/core';
import { ImageStates } from '@/components/common';
import { useWorkoutProgramFormContext } from '../context';
import WorkoutProgramWizardDay from './workout-program-wizard-day';

const WorkoutProgramWizardDays = () => {
  const form = useWorkoutProgramFormContext();

  if (form.values.days <= 0) {
    return (
      <Center>
        <ImageStates name='oops' />
      </Center>
    );
  }

  return (
    <Stack>
      {[...Array.from(Array(form.values.days).keys())].map((day, idx) => {
        return <WorkoutProgramWizardDay key={`wizard-day-${day}-${idx}`} day={day + 1} />;
      })}
    </Stack>
  );
};

export default WorkoutProgramWizardDays;
