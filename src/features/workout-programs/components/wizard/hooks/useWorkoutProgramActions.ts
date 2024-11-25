import dayjs from 'dayjs';
import { useRequest, useUpdateUrl } from '@/hooks';
import { useEffect, useMemo, useState } from 'react';
import {
  useWorkoutProgramForm,
  WorkoutProgramFormValues,
  WorkoutProgramItemFormValues,
} from '../context';
import { showNotification } from '@mantine/notifications';
import { uuid } from '@/utils';

const useWorkoutProgramActions = ({
  user,
  userPlanId,
  initWorkoutProgram,
}: {
  user?: IUser;
  userPlanId?: string;
  initWorkoutProgram?: IWorkoutProgram;
}) => {
  const { updateAllQueries } = useUpdateUrl();
  const { callRequest, calling } = useRequest();

  const [workoutProgram, setWorkoutProgram] = useState<IWorkoutProgram | undefined>(
    initWorkoutProgram,
  );

  const [step, setStep] = useState(0);
  const nextStep = () => setStep((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setStep((current) => (current > 0 ? current - 1 : current));

  const form = useWorkoutProgramForm({
    initialValues: {
      gender: user?.profile?.gender || '',
      user_id: user?.id || '',
      user_plan_id: userPlanId || '',
      title: '',
      description: '',
      voice_url: '',
      started_at: dayjs().toDate(),
      ended_at: dayjs().add(1, 'month').toDate(),
      days: 3,
      items: {},
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
      const days = [...Array.from(Array(form.values.days).keys())];
      for (let index = 0; index < days.length; index++) {
        if (!flag) {
          break;
        }
        const day = days[index];
        const items = form.values.items[day + 1];
        if (!items || !items[0]) {
          flag = false;
        }
      }
    }

    return flag;
  }, [form.values]);

  const transformToApi = (values: WorkoutProgramFormValues) => {
    let items: {
      id: string | undefined;
      exercise_id: string | undefined;
      day: number | undefined;
      priority: number | undefined;
      frequency: number | undefined;
      times: number | undefined;
      is_super: boolean | undefined;
    }[] = [];

    for (let index = 0; index < values.days; index++) {
      const dayItems = values.items[index + 1].map((item) => ({
        id: item.id || '',
        exercise_id: item.exercise_id,
        day: item.day,
        priority: item.priority,
        frequency: item.frequency,
        times: item.times,
        is_super: item.is_super,
      }));
      items = [...items, ...dayItems];
    }

    return {
      user_id: values.user_id,
      user_plan_id: values.user_plan_id,
      title: values.title,
      description: values.description,
      voice_url: values.voice_url,
      started_at: dayjs(values.started_at).toISOString(),
      ended_at: dayjs(values.ended_at).toISOString(),
      status: 'active',
      items,
    };
  };

  const transformFromApi = (wp: IWorkoutProgram): WorkoutProgramFormValues => {
    let days = 0;

    if (wp.items) {
      for (let i = 1; i < wp.items.length; i++) {
        if (wp.items[i].day > days) {
          days = wp.items[i].day;
        }
      }
    }

    let items: Record<number | string, WorkoutProgramItemFormValues[]> = {};

    for (let index = 0; index < days; index++) {
      const day = [...Array.from(Array(days).keys())][index] + 1;
      items[day] = wp
        .items!.filter((el) => el.day === day)
        .map((el) => ({
          id: el.id,
          exercise: el.exercise,
          unique: uuid(),
          exercise_id: el.exercise_id,
          day: el.day,
          priority: el.priority,
          frequency: el.frequency,
          times: el.times,
          is_super: el.is_super,
        }));
    }

    return {
      days,
      user_id: wp.user_id,
      user_plan_id: wp.user_plan_id,
      title: wp.title,
      description: wp.description,
      voice_url: wp.voice_url,
      started_at: dayjs(wp.started_at).toDate(),
      ended_at: dayjs(wp.ended_at).toDate(),
      items,
    };
  };

  const onSubmit = async (values: WorkoutProgramFormValues) => {
    const body = transformToApi(values);
    const res = await callRequest<{ workout_program: IWorkoutProgram }>(
      workoutProgram?.id ? `PUT` : 'POST',
      workoutProgram?.id
        ? `/api/v1/workout-programs/${workoutProgram.id}`
        : '/api/v1/workout-programs',
      { body },
    );

    if (res.unprocessable) {
      form.setErrors(res.errors);
      showNotification({
        color: 'red',
        title: 'Workout Program',
        message: 'The data submitted is invalid',
      });
    }

    if (res.success) {
      showNotification({
        color: 'green',
        title: 'Workout Program',
        message: 'Workout Program Successfully Registered',
      });

      setWorkoutProgram(res.workout_program);

      updateAllQueries({
        user_id: res.workout_program.user_id,
        user_plan_id: res.workout_program.user_plan_id,
        wp_id: res.workout_program.id,
      });
    }
  };

  useEffect(() => {
    if (workoutProgram) {
      form.setValues(transformFromApi(workoutProgram));
    }
  }, [workoutProgram]);

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

export default useWorkoutProgramActions;
