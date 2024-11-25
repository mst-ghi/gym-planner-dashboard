import { useChangePassword } from '../hooks';
import { Button, PasswordInput, Stack } from '@mantine/core';

const ChangePasswordForm = ({ done }: { done?: () => void }) => {
  const { loading, form, onSubmit } = useChangePassword({ done });

  return (
    <form onSubmit={onSubmit} autoComplete='off'>
      <Stack gap='md'>
        <PasswordInput
          withAsterisk
          autoComplete='off'
          size='md'
          label='Current Password'
          {...form.getInputProps('current_password')}
        />

        <PasswordInput
          withAsterisk
          autoComplete='off'
          size='md'
          label='New Password'
          {...form.getInputProps('password')}
        />

        <PasswordInput
          withAsterisk
          autoComplete='off'
          size='md'
          label='Repeat New Password'
          {...form.getInputProps('password_repeat')}
        />
      </Stack>

      <Button
        fullWidth
        type='submit'
        size='lg'
        mt='xl'
        loading={loading}
        onClick={() => onSubmit()}
      >
        Submit
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
