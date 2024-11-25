import { useFoodProgramActions } from '../hooks';
import { FoodProgramFormProvider } from '../context';
import { Button, Card, Group, Stepper } from '@mantine/core';
import FoodProgramWizardUser from './food-program-wizard-user';
import FoodProgramWizardInfo from './food-program-wizard-info';
import FoodProgramWizardItems from './food-program-wizard-items';
import FoodProgramWizardFinal from './food-program-wizard-final';

interface FoodProgramWizardProps {
  user?: IUser;
  userPlanId?: string;
  initFoodProgram?: IFoodProgram;
}

const FoodProgramWizard = ({ user, userPlanId, initFoodProgram }: FoodProgramWizardProps) => {
  const { step, form, loading, nextStatus, setStep, nextStep, prevStep, onSubmit } =
    useFoodProgramActions({
      user,
      userPlanId,
      initFoodProgram,
    });

  return (
    <FoodProgramFormProvider form={form}>
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
              description={user ? 'Meal plan for this user' : 'Select user'}
            >
              <FoodProgramWizardUser user={user} />
            </Stepper.Step>

            <Stepper.Step label='Program info' description='Title, description, date...'>
              <FoodProgramWizardInfo />
            </Stepper.Step>

            <Stepper.Step label='Program items' description='Food program items'>
              <FoodProgramWizardItems />
            </Stepper.Step>
            <Stepper.Completed>
              <FoodProgramWizardFinal user={user} />
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
                Approve and register Program
              </Button>
            )}
          </Group>
        </Card>
      </form>
    </FoodProgramFormProvider>
  );
};

export default FoodProgramWizard;
