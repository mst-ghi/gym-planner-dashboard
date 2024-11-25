import Link from 'next/link';
import { useForget } from '../hooks';
import { IconMail } from '@tabler/icons-react';
import { Box, Button, Flex, TextInput, Title } from '@mantine/core';

const ForgetForm = () => {
  const { loading, form, onSubmit } = useForget();

  return (
    <Box w={360} mih={410}>
      <Flex direction='column' gap='sm' mb='lg'>
        <Title order={2}>Gym Planner System</Title>
      </Flex>

      <form onSubmit={onSubmit}>
        <TextInput
          label='Email'
          type='email'
          autoComplete='c-e'
          rightSection={<IconMail />}
          {...form.getInputProps('email')}
        />

        <Button fullWidth type='submit' size='sm' mt='xl' loading={loading} disabled>
          Send Recovery Link
        </Button>
      </form>

      <Flex direction='column' w='100%' mt='sm'>
        <Button variant='subtle' component={Link} href='/auth/login'>
          Back
        </Button>
      </Flex>
    </Box>
  );
};

export default ForgetForm;
