import { createFormContext } from '@mantine/form';

export interface WorkoutProgramItemFormValues {
  id?: string;
  exercise: IExercise;
  unique: string;
  exercise_id?: string;
  day?: number;
  priority?: number;
  frequency?: number;
  times?: number;
  is_super?: boolean;
}

export interface WorkoutProgramFormValues {
  gender?: string | null;
  user_id?: string | null;
  user_plan_id?: string | null;
  title?: string;
  description?: string | null;
  voice_url?: string | null;
  started_at?: Date | null;
  ended_at?: Date | null;
  days: number;
  items: Record<number | string, WorkoutProgramItemFormValues[]>;
}

export const [WorkoutProgramFormProvider, useWorkoutProgramFormContext, useWorkoutProgramForm] =
  createFormContext<WorkoutProgramFormValues>();
