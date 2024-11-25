'use client';

import { Page } from '@/components/shell';
import { UserGenderDic } from '@/utils/dictionary';
import { useFetchExercises } from '@/features/exercises';
import { BackgroundImage, Box, Flex, SimpleGrid, Text, Title } from '@mantine/core';

export default function ExercisesCardViewPage() {
  const { data, isLoading } = useFetchExercises();

  return (
    <Page title='Exercises Card View' loading={isLoading}>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
        {data?.exercises?.map((exercise) => {
          return (
            <BackgroundImage
              key={`card-view-${exercise.id}`}
              src={exercise.cover_url || '/no-image.jpg'}
              pos='relative'
              radius='lg'
              h={216}
            >
              <Box
                pos='absolute'
                left={0}
                top={0}
                bg='#F6F6F5'
                w='100%'
                h='100%'
                style={{
                  borderRadius: 'var(--mantine-radius-lg)',
                  border: '1px solid gray',
                  opacity: 0.85,
                  zIndex: 0,
                }}
              />

              <Flex direction='column' align='center' justify='center' gap={4} h='100%'>
                <Title fw={500} fz={24} mb={4} style={{ zIndex: 2 }}>
                  {exercise.title}
                </Title>

                <Text fw={500} size='sm' style={{ zIndex: 2 }}>
                  {exercise.title_en}
                </Text>

                <Text fw={500} size='sm' style={{ zIndex: 2 }}>
                  Body-part:‌ {exercise.bodyPart?.title}
                </Text>

                <Text fw={500} size='sm' style={{ zIndex: 2 }}>
                  Equipment:‌ {exercise.equipment?.title}
                </Text>

                <Text fw={500} size='sm' style={{ zIndex: 2 }}>
                  Gender:‌ {exercise.gender ? UserGenderDic[exercise.gender] : '--'}
                </Text>
              </Flex>
            </BackgroundImage>
          );
        })}
      </SimpleGrid>
    </Page>
  );
}
