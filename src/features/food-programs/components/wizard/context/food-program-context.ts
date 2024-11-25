import { createFormContext } from '@mantine/form';

export interface FoodProgramItemFormValues {
  id?: string;
  unique: string;
  cause?: string;
  content?: string;
}

export interface FoodProgramFormValues {
  user_id?: string | null;
  user_plan_id?: string | null;
  title?: string;
  description?: string | null;
  started_at?: Date | null;
  ended_at?: Date | null;
  items: FoodProgramItemFormValues[];
}

export const [FoodProgramFormProvider, useFoodProgramFormContext, useFoodProgramForm] =
  createFormContext<FoodProgramFormValues>();
