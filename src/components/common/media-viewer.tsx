import Image from 'next/image';
import { useMemo } from 'react';
import { isVideoLink } from '@/utils';
import VideoPlayer from './video-player';

interface MediaViewerProps {
  url?: string;
  height?: number;
  width?: number;
  videoProps?: object;
}

const MediaViewer = ({ url, height = 64, width = 64 }: MediaViewerProps) => {
  const { isVideo } = useMemo(() => {
    return {
      isVideo: isVideoLink(url),
    };
  }, [url]);

  if (isVideo) {
    return <VideoPlayer url={url} height={height} width={width} />;
  }

  return (
    <Image
      src={url || '/no-image.jpg'}
      alt='file'
      style={{ borderRadius: 'var(--mantine-radius-lg)', height, width }}
      height={height}
      width={width}
    />
  );
};

export default MediaViewer;
