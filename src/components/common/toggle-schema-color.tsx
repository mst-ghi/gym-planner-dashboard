'use client';

import { IconSun, IconMoon, IconMoonStars } from '@tabler/icons-react';
import {
  ActionIcon,
  Box,
  Center,
  SegmentedControl,
  useMantineColorScheme,
  SegmentedControlProps,
} from '@mantine/core';

type ToggleSchemaColorProps = Partial<SegmentedControlProps> & {
  isMinify?: boolean;
};
const ToggleSchemaColor = ({
  isMinify = false,
  radius = 'md',
  fullWidth = true,
  size = 'xs',
}: ToggleSchemaColorProps) => {
  const { colorScheme, setColorScheme, toggleColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  if (isMinify) {
    return (
      <ActionIcon
        onClick={() => toggleColorScheme()}
        title='Toggle color scheme'
        radius={radius}
        size='lg'
      >
        {colorScheme === 'dark' ? <IconMoonStars size={22} /> : <IconSun size={22} />}
      </ActionIcon>
    );
  }

  return (
    <SegmentedControl
      bg={colorScheme === 'dark' ? 'dark.8' : 'gray.2'}
      radius={radius}
      fullWidth={fullWidth}
      size={size}
      value={colorScheme}
      onChange={(value: any) => setColorScheme(value)}
      data={[
        {
          value: 'light',
          label: (
            <Center>
              <IconSun size={20} stroke={1.5} />
              <Box mr={4}>Light</Box>
            </Center>
          ),
        },
        {
          value: 'dark',
          label: (
            <Center>
              <IconMoon size={18} stroke={1.5} />
              <Box mr={4}>Dark</Box>
            </Center>
          ),
        },
      ]}
    />
  );
};

export default ToggleSchemaColor;
