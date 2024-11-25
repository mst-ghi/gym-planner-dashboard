'use client';

import Link from 'next/link';
import { useThemeStyle } from '@/hooks';
import { usePathname } from 'next/navigation';
import { Logo, UserActions } from '@/components/common';
import { ActionIcon, Box, Flex, ScrollArea, Text } from '@mantine/core';
import {
  IconApple,
  IconBarbell,
  IconBrandPlanetscale,
  IconCoin,
  IconContract,
  IconDashboard,
  IconGymnastics,
  IconStretching,
  IconUsersGroup,
  IconVocabulary,
} from '@tabler/icons-react';

import classes from './dashboard-navbar.module.css';

const NavbarLinks = [
  { key: 'dashboard', link: '/dashboard', label: 'Dashboard', icon: IconDashboard },
  { key: 'users', link: '/dashboard/users', label: 'Users', icon: IconUsersGroup },
  { key: 'posts', link: '/dashboard/posts', label: 'Posts', icon: IconContract },
  { key: 'exercises', link: '/dashboard/exercises', label: 'Exercises', icon: IconGymnastics },
  { key: 'body-parts', link: '/dashboard/body-parts', label: 'Body-parts', icon: IconStretching },
  {
    key: 'workout-programs',
    link: '/dashboard/workout-programs',
    label: 'Workout-programs',
    icon: IconVocabulary,
  },
  {
    key: 'food-programs',
    link: '/dashboard/food-programs',
    label: 'Food-programs',
    icon: IconApple,
  },
  { key: 'plans', link: '/dashboard/plans', label: 'Plans', icon: IconBrandPlanetscale },
  {
    key: 'user-plans',
    link: '/dashboard/user-plans',
    label: 'User-plans',
    icon: IconCoin,
  },

  {
    key: 'equipments',
    link: '/dashboard/equipments',
    label: 'Equipments',
    icon: IconBarbell,
  },
];

const DashboardNavbar = () => {
  const pathname = usePathname();
  const { isDesktop } = useThemeStyle();

  const links = NavbarLinks.map((item, idx) => {
    const active =
      item.link === '/dashboard' ? pathname === item.link : pathname.includes(item.link);

    return (
      <Link key={item.key + '-' + idx} href={item.link}>
        <Box
          className={classes.link}
          data-active={active || undefined}
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}
        >
          <ActionIcon radius='md' color={active ? 'grape' : 'gray'}>
            <item.icon size={24} />
          </ActionIcon>

          <Text fw={600} fz={14}>
            {item.label}
          </Text>
        </Box>
      </Link>
    );
  });

  return (
    <Box className={classes.navbar}>
      <Flex direction='row' align='center'>
        <Logo />
        <Text fw={800} fz={24} ml='xs'>
          Gym Planner
        </Text>
      </Flex>

      <ScrollArea type='always' scrollbarSize={8} p={0} className={classes.navbarMainScroll}>
        <Box className={classes.navbarMain}>{links}</Box>
      </ScrollArea>

      <Box className={classes.footer}>{isDesktop && <UserActions />}</Box>
    </Box>
  );
};

export default DashboardNavbar;
