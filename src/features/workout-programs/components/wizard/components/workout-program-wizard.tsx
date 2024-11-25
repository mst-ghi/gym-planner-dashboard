import { useWorkoutProgramActions } from '../hooks';
import { WorkoutProgramFormProvider } from '../context';
import { Button, Card, Group, Stepper } from '@mantine/core';
import WorkoutProgramWizardUser from './workout-program-wizard-user';
import WorkoutProgramWizardInfo from './workout-program-wizard-info';
import WorkoutProgramWizardDays from './workout-program-wizard-days';
import WorkoutProgramWizardFinal from './workout-program-wizard-final';

interface WorkoutProgramWizardProps {
  user?: IUser;
  userPlanId?: string;
  initWorkoutProgram?: IWorkoutProgram;
}

const WorkoutProgramWizard = ({
  user,
  userPlanId,
  initWorkoutProgram,
}: WorkoutProgramWizardProps) => {
  const { step, form, loading, nextStatus, setStep, nextStep, prevStep, onSubmit } =
    useWorkoutProgramActions({
      user,
      userPlanId,
      initWorkoutProgram,
    });

  return (
    <WorkoutProgramFormProvider form={form}>
      <form onSubmit={onSubmit}>
        <Card p='lg'>
          <Stepper
            active={step}
            onStepClick={setStep}
            styles={{
              steps: { margin: 12 },
            }}
          >
            <Stepper.Step
              label={user ? user.fullname || user.mobile : 'Select user'}
              description={user ? 'Workout program for this user' : 'Select user'}
            >
              <WorkoutProgramWizardUser user={user} />
            </Stepper.Step>

            <Stepper.Step label='Program information' description='Title, description, date...'>
              <WorkoutProgramWizardInfo />
            </Stepper.Step>

            <Stepper.Step label='Program days' description='Program days and exercises'>
              <WorkoutProgramWizardDays />
            </Stepper.Step>

            <Stepper.Completed>
              <WorkoutProgramWizardFinal user={user} />
            </Stepper.Completed>
          </Stepper>

          <Group justify='center' mt='md'>
            <Button
              disabled={step === 0}
              type='button'
              w={200}
              variant='default'
              onClick={prevStep}
            >
              Perv
            </Button>

            {step < 3 && (
              <Button disabled={!nextStatus} type='button' w={200} onClick={nextStep}>
                Next
              </Button>
            )}

            {step === 3 && (
              <Button loading={loading} type={'submit'} w={300}>
                Approve and Submit Program
              </Button>
            )}
          </Group>
        </Card>
      </form>
    </WorkoutProgramFormProvider>
  );
};

export default WorkoutProgramWizard;
