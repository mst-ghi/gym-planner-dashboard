'use client';

import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-datatable/styles.css';
import '../styles/globals.css';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  Center,
  ColorSchemeScript,
  DirectionProvider,
  MantineProvider,
  ScrollAreaAutosize,
  Title,
} from '@mantine/core';

import { useApp } from '@/hooks';
import { DefaultTheme, setCookie } from '@/utils';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { user, workspace, fetchUser } = useApp();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);

      if (!user) {
        router.replace('/auth/login');
      }
    }, 2500);

    return () => clearTimeout(timeout);
  }, [user]);

  useEffect(() => {
    if (workspace) {
      setCookie('work-key', workspace.key);
    }
  }, [workspace]);

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeScript defaultColorScheme='light' />
      <DirectionProvider initialDirection='ltr'>
        <MantineProvider defaultColorScheme='light' theme={DefaultTheme}>
          <Notifications limit={7} autoClose={5000} containerWidth={320} position='bottom-right' />
          <ModalsProvider
            labels={{ confirm: 'Yes', cancel: 'No, close' }}
            modalProps={{
              centered: true,
              overlayProps: {
                opacity: 0.55,
                blur: 3,
              },
              scrollAreaComponent: ScrollAreaAutosize,
            }}
          >
            {loading && (
              <Center h='100vh' w='100vw' pos='absolute' bg='white' style={{ zIndex: 999 }}>
                <Title>Gym Planner</Title>
              </Center>
            )}

            {!loading && children}
          </ModalsProvider>
        </MantineProvider>
      </DirectionProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
