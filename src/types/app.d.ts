import { FormErrors } from '@mantine/form';
import { SetStateAction } from 'react';
import { FileWithPath } from '@mantine/dropzone';

export declare global {
  declare module '*.png' {
    const value: any;
    export = value;
  }

  type TMakeRequestMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

  interface IPaginationMeta {
    has_next_page: boolean;
    has_prev_page: boolean;
    next: number;
    prev: number | null;
    page: number;
    take: number;
    total_docs: number;
    total_pages: number;
  }

  interface IPaginationPageProps {
    page: number;
    setPage: (page: number) => void;
  }

  interface IPaginationTakeProps {
    take: string | null;
    setTake: (take: string | null) => void;
  }

  interface IPaginationSearchProps {
    search: string | undefined;
    setSearch: (search: string | undefined) => void;
  }

  interface ICallRequestResponse {
    message: string;
    errors: any;
    meta?: PaginationMeta;
    data: object;
    success: boolean;
    unprocessable: boolean;
    internalError: boolean;
  }

  interface ITokens {
    access_token: string;
    refresh_token: string;
    expires_at: string;
  }

  type TUserGender = 'male' | 'female' | 'other';
  type TUserKind = 'coach' | 'assistant' | 'athlete';
  type TUserStatus = 'active' | 'suspended';
  type TUserMaritalStatus = 'single' | 'married' | 'separated';

  interface IUser {
    id: string;
    mobile: string;
    email?: string;
    national_code?: string;
    fullname?: string;
    verify_email: boolean;
    kind: TUserKind;
    status: TUserStatus;
    created_at: string;
    updated_at: string;
    profile?: Profile;
    teams?: ITeam[];
  }

  interface Profile {
    id?: string;
    user_id?: string;
    avatar_url?: string;
    gender: TUserGender;
    blood_type?: string;
    marital_status?: TUserMaritalStatus;
    job?: string;
    education?: string;
    address?: string;
    weight?: number;
    height?: number;
    birth_day?: string;
    created_at: string;
    updated_at: string;
  }

  interface IWorkspace {
    id: string;
    key: string;
    title?: string;
    status: 'active' | 'suspended';
    created_at: string;
    updated_at: string;
  }

  interface ITeam {
    id: string;
    workspace_id: string;
    user_id: string;
    role: 'coach' | 'athlete';
    created_at: string;
    workspace?: IWorkspace;
  }

  interface IMedia {
    id: string;
    mimetype: string;
    url: string;
    size: string | number;
  }

  interface IFile {
    value?: FileWithPath;
    media?: IMedia;
    url?: string;
  }

  interface IMedicalRecord {
    id: string;
    user_id: string;
    practice_history: string | null;
    taking_sports_supplements: string | null;
    history_of_bone_fracture: string | null;
    food_allergy: string | null;
    wake_up_time: string | null;
    breakfast_time: string | null;
    lunch_time: string | null;
    dinner_time: string | null;
    sleeping_time: string | null;
    practice_time: string | null;
    note: string | null;
    front_media_url: string | null;
    right_media_url: string | null;
    left_media_url: string | null;
    back_media_url: string | null;
    front_arm_media_url: string | null;
    back_arm_media_url: string | null;
    created_at?: string;
    updated_at?: string;
  }

  interface IEquipment {
    id: string;
    title: string;
    title_en: string;
    description: string;
    media_url: string;
    created_at: string;
    updated_at: string;
    exercises: IExercise[];
  }

  type TBodyPartLevel = 'beginner' | 'intermediate' | 'advanced';

  interface IBodyPart {
    id: string;
    title: string;
    description: string;
    media_url: string;
    level: TBodyPartLevel;
    created_at: string;
    updated_at: string;
    exercises: IExercise[];
  }

  interface IExercise {
    id: string;
    body_part_id: string;
    equipment_id: string | null;
    title: string;
    title_en: string;
    description: string;
    cover_url: string;
    media_url: string;
    gender?: TUserGender;
    created_at: string;
    updated_at: string;
    bodyPart?: Omit<IBodyPart, 'created_at' | 'updated_at' | 'exercises'>;
    equipment?: Omit<IEquipment, 'created_at' | 'updated_at' | 'exercises'>;
  }

  type TPlanPeriodType = 'day' | 'week' | 'month' | 'year';
  type TPlanStatus = 'active' | 'suspended';

  interface IPlan {
    id: string;
    workspace_id: string;
    priority: number;
    title: string;
    price: number;
    discount: number;
    period_type: TPlanPeriodType;
    period_value: value;
    description: string;
    cover_url?: string;
    status: TPlanStatus;
    created_at: string;
    updated_at: string;
    payments?: IPayment[];
    userPlans?: IPayment[];
  }

  type TPaymentResultType = 'ready' | 'success' | 'failed';
  type TPaymentStatus = 'created' | 'paying' | 'paid' | 'failed';

  interface IPayment {
    id: string;
    user_id: string;
    plan_id: string;
    total_price: number;
    discount_price: number;
    meta: IPlan;
    status: TPaymentStatus;
    created_at: string;
    updated_at: string;
    user?: IUser;
    plan?: IPlan;
  }

  type TUserPlanStatus = 'ready' | 'active' | 'canceled' | 'expired' | 'reserved';

  interface IUserPlan {
    id: string;
    workspace_id: string;
    user_id: string;
    plan_id: string;
    payment_id: string;
    plan_snapshot: IPlan;
    status: TUserPlanStatus;
    reservation_at?: string;
    expires_at: string;
    created_at: string;
    updated_at: string;
    user?: IUser;
    plan?: IPlan;
    payment?: IPayment;
  }

  type TPostStatus = 'active' | 'suspended';

  interface IPost {
    id: string;
    owner_id: string;
    cover_url: string;
    title: string;
    content: string;
    tags: string;
    status: TPostStatus;
    created_at: string;
    updated_at: string;
    owner: IUser;
    likes: ILike[];
  }

  interface ILike {
    id: string;
    post_id: string;
    user_id: string;
    user: IUser;
  }

  interface IWorkoutProgramItem {
    id: string;
    program_id: string;
    exercise_id: string;
    day: number;
    priority: number;
    frequency: number;
    times: number;
    is_super: boolean;
    created_at: string;
    updated_at: string;
    exercise: IExercise | any;
  }

  type TWorkoutProgramStatus = 'free' | 'active' | 'suspended';

  interface IWorkoutProgram {
    id: string;
    workspace_id?: string;
    user_plan_id: string | null;
    couch_id?: string;
    user_id: string | null;
    title: string;
    description: string | null;
    voice_url: string | null;
    status: TWorkoutProgramStatus;
    started_at: string | null;
    ended_at: string | null;
    created_at: string;
    updated_at: string;
    user?: IUser;
    items?: IWorkoutProgramItem[];
  }

  interface IFoodProgramItem {
    id: string;
    program_id: string;
    cause: string;
    content: string;
    created_at: string;
    updated_at: string;
  }

  type TFoodProgramStatus = 'free' | 'active' | 'suspended';

  interface IFoodProgram {
    id: string;
    workspace_id?: string;
    user_plan_id: string | null;
    couch_id?: string;
    user_id: string | null;
    title: string;
    description: string | null;
    status: TWorkoutProgramStatus;
    started_at: string | null;
    ended_at: string | null;
    created_at: string;
    updated_at: string;
    user?: IUser;
    items?: IFoodProgramItem[];
  }
}
