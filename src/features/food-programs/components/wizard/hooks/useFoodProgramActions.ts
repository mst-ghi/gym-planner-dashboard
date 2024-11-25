import dayjs from 'dayjs';
import { uuid } from '@/utils';
import { useRequest, useUpdateUrl } from '@/hooks';
import { useEffect, useMemo, useState } from 'react';
import { showNotification } from '@mantine/notifications';
import { useFoodProgramForm, FoodProgramFormValues } from '../context';

const useFoodProgramActions = ({
  user,
  userPlanId,
  initFoodProgram,
}: {
  user?: IUser;
  userPlanId?: string;
  initFoodProgram?: IFoodProgram;
}) => {
  const { updateAllQueries } = useUpdateUrl();
  const { callRequest, calling } = useRequest();

  const [foodProgram, setFoodProgram] = useState<IFoodProgram | undefined>(initFoodProgram);

  const [step, setStep] = useState(0);
  const nextStep = () => setStep((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setStep((current) => (current > 0 ? current - 1 : current));

  const form = useFoodProgramForm({
    initialValues: {
      user_id: user?.id || '',
      user_plan_id: userPlanId || '',
      title: '',
      description: '',
      started_at: dayjs().toDate(),
      ended_at: dayjs().add(1, 'month').toDate(),
      items: [],
    },
  });

  const nextStatus = useMemo(() => {
    let flag = true;

    if (step === 0 && !form.values.user_id) {
      flag = false;
    }
    if (
      step === 1 &&
      (!form.values.title ||
        !form.values.description ||
        !form.values.started_at ||
        !form.values.ended_at)
    ) {
      flag = false;
    }
    if (step === 2) {
      if (!form.values.items[0]) {
        flag = false;
      } else {
        for (let index = 0; index < form.values.items.length; index++) {
          const item = form.values.items[index];
          if (!item.cause || !item.content) {
            flag = false;
          }
        }
      }
    }

    return flag;
  }, [form.values]);

  const transformToApi = (values: FoodProgramFormValues) => {
    return {
      user_id: values.user_id,
      user_plan_id: values.user_plan_id,
      title: values.title,
      description: values.description,
      started_at: dayjs(values.started_at).toISOString(),
      ended_at: dayjs(values.ended_at).toISOString(),
      status: 'active',
      items: values.items,
    };
  };

  const transformFromApi = (fp: IFoodProgram): FoodProgramFormValues => {
    return {
      user_id: fp.user_id,
      user_plan_id: fp.user_plan_id,
      title: fp.title,
      description: fp.description,
      started_at: dayjs(fp.started_at).toDate(),
      ended_at: dayjs(fp.ended_at).toDate(),
      items: fp.items!.map((el) => ({
        id: el.id,
        unique: uuid(),
        cause: el.cause,
        content: el.content,
      })),
    };
  };

  const onSubmit = async (values: FoodProgramFormValues) => {
    const body = transformToApi(values);
    const res = await callRequest<{ food_program: IFoodProgram }>(
      foodProgram?.id ? `PUT` : 'POST',
      foodProgram?.id ? `/api/v1/food-programs/${foodProgram.id}` : '/api/v1/food-programs',
      { body },
    );

    if (res.unprocessable) {
      form.setErrors(res.errors);
      showNotification({
        color: 'red',
        title: 'Diet Plan',
        message: 'The data submitted is invalid',
      });
    }

    if (res.success) {
      showNotification({
        color: 'green',
        title: 'Diet Plan',
        message: 'Diet Plan successfully registered',
      });

      setFoodProgram(res.food_program);

      updateAllQueries({
        user_id: res.food_program.user_id,
        user_plan_id: res.food_program.user_plan_id,
        fp_id: res.food_program.id,
      });
    }
  };

  useEffect(() => {
    if (foodProgram) {
      form.setValues(transformFromApi(foodProgram));
    }
  }, [foodProgram]);

  return {
    step,
    form,
    nextStatus,
    loading: calling,
    setStep,
    nextStep,
    prevStep,
    onSubmit: form.onSubmit(onSubmit),
  };
};

export default useFoodProgramActions;
