import { useUploader } from '../hooks';
import { useThemeStyle } from '@/hooks';
import { useEffect, useMemo } from 'react';
import { IconTrash } from '@tabler/icons-react';
import { AudioPlayer, VideoPlayer } from '@/components/common';
import { isAudioLink, isImageLink, isVideoLink } from '@/utils';
import { Box, Button, Center, Image, ImageProps, Loader, Text } from '@mantine/core';

interface UploaderItemProps extends ImageProps {
  file?: IFile;
  height?: string | number;
  onUpload?: (media: IMedia) => void;
  onDelete?: (media?: IMedia) => void;
}

const UploaderItem = ({ file, onUpload, onDelete, height, ...props }: UploaderItemProps) => {
  const { theme } = useThemeStyle();
  const { state, url, uploadMedia, deleteMedia } = useUploader({ file, onUpload, onDelete });

  const { isImage, isVideo, isAudio } = useMemo(() => {
    return {
      isImage: isImageLink(file?.url),
      isVideo: isVideoLink(file?.url),
      isAudio: isAudioLink(file?.url),
    };
  }, [file]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (state.status === 'idle') {
        uploadMedia();
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Box
      p='xs'
      pos='relative'
      h={typeof height === 'number' ? height + 24 : height}
      style={{
        borderRadius: 'var(--mantine-radius-lg)',
        border: `2px dashed ${theme.colors.gray[2]}`,
      }}
    >
      {isImage && (
        <Image
          src={file?.url || url}
          alt='file'
          fit='cover'
          style={{ borderRadius: 'var(--mantine-radius-lg)' }}
          height={height}
          {...props}
        />
      )}

      {isVideo && <VideoPlayer height={height} url={file?.url} />}

      {isAudio && <AudioPlayer height={height} url={file?.url} />}

      {file?.url && (
        <Button
          pos='absolute'
          top={16}
          right={16}
          size='xs'
          color='red'
          variant='filled'
          leftSection={<IconTrash size={18} />}
          style={{
            zIndex: 5,
          }}
          onClick={deleteMedia}
        >
          Delete
        </Button>
      )}

      {state.status === 'uploading' && (
        <Center
          pos='absolute'
          top={24}
          right={24}
          bottom={24}
          left={24}
          bg='dark'
          style={{
            opacity: 0.8,
            borderRadius: 'var(--mantine-radius-lg)',
          }}
        >
          <Text fz={24} fw={900} c='orange' ml='xs'>
            Uploading
          </Text>
          <Loader size='xs' />
        </Center>
      )}
    </Box>
  );
};

export default UploaderItem;
