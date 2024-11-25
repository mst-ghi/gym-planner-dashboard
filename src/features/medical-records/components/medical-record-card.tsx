import { Button, Card, Center, Flex, Grid, Loader, Title } from '@mantine/core';
import { useFetchMedialRecord } from '../hooks';
import MedicalRecordForm from './medical-record-form';
import MedicalRecordMedias from './medical-record-medias';
import { useMemo } from 'react';

interface MedicalRecordCardProps {
  id?: string;
  userId?: string;
}

const MedicalRecordCard = ({ id, userId }: MedicalRecordCardProps) => {
  const { data, isFetching, refetch } = useFetchMedialRecord({ id, userId });

  const medias = useMemo(() => {
    const result: string[] = [];

    if (data && data.medical_record) {
      if (data.medical_record.front_media_url) {
        result.push(data.medical_record.front_media_url);
      }
      if (data.medical_record.right_media_url) {
        result.push(data.medical_record.right_media_url);
      }
      if (data.medical_record.left_media_url) {
        result.push(data.medical_record.left_media_url);
      }
      if (data.medical_record.back_media_url) {
        result.push(data.medical_record.back_media_url);
      }
      if (data.medical_record.front_arm_media_url) {
        result.push(data.medical_record.front_arm_media_url);
      }
      if (data.medical_record.back_arm_media_url) {
        result.push(data.medical_record.back_arm_media_url);
      }
    }

    return result;
  }, [data]);

  if (!id && !userId) {
    return null;
  }

  return (
    <Card mih={500}>
      <Card.Section p='sm'>
        <Flex direction='row' align='center' justify='space-between'>
          <Title order={4}>Medical Record</Title>
          <Button size='sm'>View and Download</Button>
        </Flex>
      </Card.Section>

      {isFetching && (
        <Center w='100%' h='100%'>
          <Loader />
        </Center>
      )}

      {!isFetching && (
        <Grid>
          <Grid.Col span={8}>
            <MedicalRecordForm
              userId={userId}
              medicalRecord={data?.medical_record}
              done={() => refetch()}
            />
          </Grid.Col>

          <Grid.Col span={4} p='md'>
            <MedicalRecordMedias medias={medias} />
          </Grid.Col>
        </Grid>
      )}
    </Card>
  );
};

export default MedicalRecordCard;
