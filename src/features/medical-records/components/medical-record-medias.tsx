import { useThemeStyle } from '@/hooks';
import { useEffect, useState } from 'react';
import { ImageStates } from '@/components/common';
import { BackgroundImage, Box, Card, Center, Flex, ScrollArea } from '@mantine/core';

interface MedicalRecordMediasProps {
  medias?: string[];
}
const MedicalRecordMedias = ({ medias }: MedicalRecordMediasProps) => {
  const { theme } = useThemeStyle();
  const [selected, setSelected] = useState<string>();

  useEffect(() => {
    if (medias && medias[0]) {
      setSelected(medias[0]);
    }
  }, [medias]);

  return (
    <Box
      w='100%'
      h='100%'
      p='md'
      style={{
        border: `2px dashed ${theme.colors.gray[2]}`,
        borderRadius: theme.radius.lg,
      }}
    >
      {(!medias || !medias[0]) && (
        <Center h='100%'>
          <ImageStates name='emptyBox1' message='Medias not found' />
        </Center>
      )}

      {medias && medias[0] && (
        <Flex direction='column' gap='sm'>
          <Center flex={1}>
            {selected && (
              <Card w='100%' m={0} p='xs' withBorder>
                <BackgroundImage
                  src={selected}
                  h={272}
                  w='100%'
                  style={{ borderRadius: 'var(--mantine-radius-lg)' }}
                />
              </Card>
            )}
          </Center>
          <ScrollArea scrollbars='x'>
            <Flex direction='row' gap='sm' align='center' justify='center' wrap='nowrap' h='100%'>
              {medias.map((media) => {
                return (
                  <Card
                    key={media}
                    m={0}
                    p={6}
                    withBorder
                    onClick={() => setSelected(media)}
                    style={{ cursor: 'pointer' }}
                    bg={selected === media ? 'orange.1' : undefined}
                  >
                    <BackgroundImage
                      src={media}
                      h={64}
                      w={64}
                      style={{ borderRadius: 'var(--mantine-radius-lg)' }}
                    />
                  </Card>
                );
              })}
            </Flex>
          </ScrollArea>
        </Flex>
      )}
    </Box>
  );
};

export default MedicalRecordMedias;
