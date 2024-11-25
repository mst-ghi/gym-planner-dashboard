import { z } from 'zod';
import { useRequest } from '@/hooks';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

interface PlanFormStates {
  priority: number;
  price: number;
  discount: number;
  title: string;
  period_type: TPlanPeriodType;
  period_value: number;
  description: string;
  cover_url?: string;
  status: TPlanStatus;
}

export interface UsePlanFormProps {
  plan?: IPlan;
  done?: () => void;
}

const schema = z.object({
  priority: z.number().min(0).max(10000),
  title: z.string().min(1).max(150),
  price: z.number(),
  discount: z.number().min(0).max(100),
  period_type: z.enum(['day', 'week', 'month', 'year']),
  period_value: z.number(),
  description: z.string().min(1).max(255),
  status: z.enum(['active', 'suspended']),
});

const usePlanForm = ({ plan, done }: UsePlanFormProps = {}) => {
  const { calling, callRequest } = useRequest();

  const form = useForm<PlanFormStates>({
    initialValues: {
      priority: plan?.priority || 0,
      price: plan?.price || 0,
      discount: plan?.discount || 0,
      title: plan?.title || '',
      period_type: plan?.period_type || 'month',
      period_value: plan?.period_value || 1,
      description: plan?.description || '',
      cover_url: plan?.cover_url || '',
      status: plan?.status || 'active',
    },
    validate: zodResolver(schema),
  });

  const onSubmit = async (values: PlanFormStates) => {
    const res = await callRequest(
      plan ? 'PUT' : 'POST',
      plan ? `/api/v1/plans/${plan.id}` : `/api/v1/plans`,
      { body: values },
    );

    if (res.unprocessable) {
      form.setErrors(res.errors);
    }

    if (res.success && done) {
      showNotification({
        color: 'green',
        title: 'Plan Registration',
        message: 'Registration Successful',
      });

      done();
    }
  };

  return {
    form,
    loading: calling,
    onSubmit: form.onSubmit(onSubmit),
  };
};

export default usePlanForm;
