'use client';

import { EmptyPage } from '@/components/shell';
import { Center, Grid } from '@mantine/core';
import { ForgetForm } from '@/features/auth';

export default function ForgetPage() {
  return (
    <EmptyPage title='Forget Password'>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Center h='100vh' w='100%'>
            <ForgetForm />
          </Center>
        </Grid.Col>
      </Grid>
    </EmptyPage>
  );
}
