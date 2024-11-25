'use client';

import { Envs } from '@/utils';
import { motion } from 'framer-motion';
import { useThemeStyle } from '@/hooks';
import { useRouter } from 'next/navigation';
import { ToggleSchemaColor } from '../common';
import { useDocumentTitle } from '@mantine/hooks';
import { IconChevronLeft } from '@tabler/icons-react';
import { ActionIcon, Flex, LoadingOverlay, ScrollArea, Title } from '@mantine/core';

export interface PageProps {
  children?: React.ReactNode;
  rightSection?: React.ReactNode;
  title?: string;
  loading?: boolean;
}

const Page = ({ title, loading, rightSection, children }: PageProps) => {
  useDocumentTitle(title ? `${title} - ${Envs.app.name}` : Envs.app.name);

  const router = useRouter();
  const { isDesktop, isLightTheme } = useThemeStyle();

  return (
    <Flex direction='column' gap={6} h='100%' mb={isDesktop ? 'sm' : 0}>
      <Flex
        p='sm'
        direction='row'
        align='center'
        justify='space-between'
        bg={isLightTheme ? 'gray.2' : 'dark.8'}
        h={64}
        gap='sm'
        style={{
          borderRadius: 'var(--mantine-radius-lg)',
        }}
      >
        <Flex direction='row' align='center' gap='md' flex={1}>
          <ActionIcon size='lg' onClick={() => router.back()}>
            <IconChevronLeft stroke={2.5} />
          </ActionIcon>
          {title && (
            <Title order={4} fw={600}>
              {title}
            </Title>
          )}
        </Flex>

        {rightSection}

        <ToggleSchemaColor isMinify />
      </Flex>

      <ScrollArea
        type='always'
        scrollbarSize={10}
        bg={isLightTheme ? 'gray.2' : 'dark.8'}
        py='sm'
        px={0}
        style={{
          height: 'calc(95vh)',
          borderRadius: 'var(--mantine-radius-lg)',
          position: 'relative',
        }}
      >
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {!loading && (
            <Flex direction='column' gap='lg' flex={1} py='xs' px='lg' h='100%'>
              {children}
            </Flex>
          )}
          {loading && <LoadingOverlay />}
        </motion.main>
      </ScrollArea>
    </Flex>
  );
};

export default Page;
