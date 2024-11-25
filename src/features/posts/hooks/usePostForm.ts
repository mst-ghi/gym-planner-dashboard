import { z } from 'zod';
import { useRequest } from '@/hooks';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

interface PostFormStates {
  cover_url: string;
  title: string;
  content: string;
  tags: string[];
  status: TPostStatus;
}

export interface UsePostFormProps {
  post?: IPost;
  done?: () => void;
}

const schema = z.object({
  cover_url: z.string(),
  title: z.string().min(1).max(255),
  content: z.string().min(1).max(5000),
  tags: z.string().array().nonempty(),
  status: z.enum(['active', 'suspended']),
});

const usePostForm = ({ post, done }: UsePostFormProps = {}) => {
  const { calling, callRequest } = useRequest();

  const form = useForm<PostFormStates>({
    initialValues: {
      cover_url: post?.cover_url || '',
      title: post?.title || '',
      content: post?.content || '',
      tags: post?.tags.split('|') || [],
      status: post?.status || 'active',
    },
    validate: zodResolver(schema),
  });

  const onSubmit = async (values: PostFormStates) => {
    const res = await callRequest(
      post ? 'PUT' : 'POST',
      post ? `/api/v1/posts/${post.id}` : `/api/v1/posts`,
      { body: { ...values, tags: values.tags.join('|') } },
    );

    if (res.unprocessable) {
      form.setErrors(res.errors);
    }

    if (res.success && done) {
      showNotification({
        color: 'green',
        title: 'Post Submitting',
        message: 'Submitting Successfully',
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

export default usePostForm;
