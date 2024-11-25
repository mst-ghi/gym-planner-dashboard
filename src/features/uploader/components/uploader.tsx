import { useEffect, useState } from 'react';
import { Box, Flex, Group, Text, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps } from '@mantine/dropzone';
import { showNotification } from '@mantine/notifications';
import UploaderItem from './uploader-item';

interface BaseProps
  extends Omit<DropzoneProps, 'onDrop' | 'multiple' | 'loading' | 'maxSize' | 'accept'> {}

interface UploaderProps extends Partial<BaseProps> {
  label?: string;
  data?: IFile;
  withAsterisk?: boolean;
  height?: string | number;
  accept?: string[] | undefined;
  onUpload?: (media: IMedia) => void;
  onDelete?: (media?: IMedia) => void;
}

const Uploader = ({
  label,
  data,
  withAsterisk,
  onUpload,
  onDelete,
  mih = 120,
  height,
  accept = ['image/*', 'video/*'],
  ...props
}: UploaderProps) => {
  const [file, setFile] = useState<IFile>();

  useEffect(() => {
    if (data) {
      setFile(data);
    }
  }, [data]);

  return (
    <Box w='100%'>
      {label && (
        <Flex direction='row' gap={6}>
          <Text size='sm' fw={500}>
            {label}
          </Text>
          {withAsterisk && <Text c='red'> *</Text>}
        </Flex>
      )}

      {!file?.url && !file?.value && (
        <Dropzone
          onReject={() => showNotification({ color: 'orange', message: 'فایل پشتیبانی نمی شود' })}
          onDrop={(files) => {
            if (files[0]) {
              setFile({ url: undefined, value: files[0] });
            }
          }}
          maxSize={10485760} // 10MB
          accept={accept}
          multiple={false}
          h={height}
          {...props}
        >
          <Group
            justify='center'
            align='center'
            gap='md'
            mih={mih}
            style={{ pointerEvents: 'none' }}
          >
            <Dropzone.Accept>
              <IconUpload
                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto
                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                stroke={1.5}
              />
            </Dropzone.Idle>

            <Flex direction='column' align='center' justify='center' h='100%'>
              <Text size='sm' fw={500} ta='center'>
                Drag and drop the media/file here or click to select
              </Text>
              <Text size='xs' fw={500} c='dimmed' ta='center' mt={7}>
                Each file must not exceed 10 MB
              </Text>
            </Flex>
          </Group>
        </Dropzone>
      )}

      {file && (file.url || file.value) && (
        <UploaderItem
          height={height}
          file={file}
          onUpload={(media) => {
            if (onUpload) {
              onUpload(media);
            }
            setFile({ value: file.value, media, url: media.url });
          }}
          onDelete={(_media) => {
            if (onDelete) {
              onDelete(_media);
            }
            setFile(undefined);
          }}
        />
      )}
    </Box>
  );
};

export default Uploader;
