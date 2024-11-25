'use client';

import { EmptyPage } from '@/components/shell';
import { Center, Grid } from '@mantine/core';
import { LoginForm } from '@/features/auth';

export default function LoginPage() {
  return (
    <EmptyPage title='Login'>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Center h='100vh' w='100%'>
            <LoginForm />
          </Center>
        </Grid.Col>
      </Grid>
    </EmptyPage>
  );
}
