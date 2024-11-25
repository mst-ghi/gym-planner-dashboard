import Link from 'next/link';
import { useLogin } from '../hooks';
import { IconUserCircle } from '@tabler/icons-react';
import { Box, Button, Flex, PasswordInput, Text, TextInput, Title } from '@mantine/core';

const LoginForm = () => {
  const { loading, form, onSubmit } = useLogin();

  return (
    <Box w={360} mih={410}>
      <Flex direction='column' gap='sm' mb='lg'>
        <Title order={2}>Gym Planner System</Title>
      </Flex>

      <form onSubmit={onSubmit} autoComplete='off'>
        <TextInput
          label='Email / Mobile'
          autoComplete='off'
          rightSection={<IconUserCircle />}
          {...form.getInputProps('email_or_mobile')}
        />

        <PasswordInput
          mt='sm'
          autoComplete='off'
          styles={{
            label: {
              width: '100%',
            },
          }}
          label={
            <Flex w='100%' direction='row' align='center' justify='space-between' pr='md'>
              <Text size='sm'>Password</Text>
              <Link href='/auth/forget'>
                <Text size='sm' c='orange'>
                  Forgot Password
                </Text>
              </Link>
            </Flex>
          }
          {...form.getInputProps('password')}
        />

        <Button fullWidth type='submit' size='sm' mt='xl' loading={loading}>
          Continue
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
