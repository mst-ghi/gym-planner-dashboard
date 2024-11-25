import Link from 'next/link';
import { useHover } from '@mantine/hooks';
import { useFetchDashboardCountsReport } from '../hooks';
import { ForwardRefExoticComponent, RefAttributes, useMemo } from 'react';
import { Card, Center, Flex, Loader, Grid, Text, Title } from '@mantine/core';
import {
  Icon as TablerIcon,
  IconProps,
  IconUsersGroup,
  IconContract,
  IconGymnastics,
  IconStretching,
  IconBarbell,
  IconBrandPlanetscale,
  IconCoin,
  IconVocabulary,
} from '@tabler/icons-react';

const CardCount = ({
  count,
  label,
  link,
  Icon,
}: {
  count?: number | string;
  label: string;
  link?: string;
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<TablerIcon>>;
}) => {
  const { ref, hovered } = useHover();

  const linkProps: any = useMemo(() => {
    if (!link) return {};
    return {
      component: Link,
      href: link,
    };
  }, [link]);

  return (
    <Card
      ref={ref}
      withBorder={false}
      shadow={hovered ? 'md' : undefined}
      {...linkProps}
      style={{ transition: 'box-shadow 0.3s' }}
    >
      <Flex direction='row' align='center' gap='lg'>
        <Icon size={46} color='var(--mantine-color-gray-6)' />
        <Flex direction='column' gap='md' align='center' justify='center' flex={1}>
          <Title order={2} c='dark.3'>
            {count || 0}
          </Title>
          <Text fw={500} fz={14} c='gray'>
            {label}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};

const DashboardCardsCount = () => {
  const { data, isLoading } = useFetchDashboardCountsReport();

  if (isLoading) {
    return (
      <Center h={200}>
        <Loader />
      </Center>
    );
  }

  return (
    <Grid>
      <Grid.Col span={3}>
        <CardCount
          count={data?.reports.users_count}
          label='Users'
          Icon={IconUsersGroup}
          link='/dashboard/users'
        />
      </Grid.Col>
      <Grid.Col span={3}>
        <CardCount
          count={data?.reports.user_plans_count}
          label='Purchased Plans'
          Icon={IconCoin}
          link='/dashboard/user-plans'
        />
      </Grid.Col>
      <Grid.Col span={3}>
        <CardCount
          count={data?.reports.ready_user_plans_count}
          label='Ready for Program'
          Icon={IconBrandPlanetscale}
          link='/dashboard/user-plans'
        />
      </Grid.Col>
      <Grid.Col span={3}>
        <CardCount
          count={data?.reports.workout_programs_count}
          label='Workout Programs'
          Icon={IconVocabulary}
          link='/dashboard/workout-programs'
        />
      </Grid.Col>
      <Grid.Col span={3}>
        <CardCount
          count={data?.reports.posts_count}
          label='Posts'
          Icon={IconContract}
          link='/dashboard/posts'
        />
      </Grid.Col>
      <Grid.Col span={3}>
        <CardCount
          count={data?.reports.body_parts_count}
          label='Body Parts'
          Icon={IconStretching}
          link='/dashboard/body-parts'
        />
      </Grid.Col>
      <Grid.Col span={3}>
        <CardCount
          count={data?.reports.equipments_count}
          label='Equipments and Machines'
          Icon={IconBarbell}
          link='/dashboard/equipments'
        />
      </Grid.Col>
      <Grid.Col span={3}>
        <CardCount
          count={data?.reports.exercises_count}
          label='Registered Exercises'
          Icon={IconGymnastics}
          link='/dashboard/exercises'
        />
      </Grid.Col>
    </Grid>
  );
};

export default DashboardCardsCount;
