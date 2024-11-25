import { useRef } from 'react';
import { Center } from '@mantine/core';
import { useDidUpdate, useIntersection } from '@mantine/hooks';

export interface VideoPlayerProps {
  media?: IMedia;
  url?: string;
  mimetype?: string;
  height?: number | string;
  width?: number | string;
  alt?: string;
}

export const VideoPlayer = ({ media, url, mimetype, height, width, alt }: VideoPlayerProps) => {
  const vidRef = useRef<HTMLVideoElement>(null);
  const { ref, entry } = useIntersection({
    threshold: 0.5,
  });

  const pauseVideo = () => {
    vidRef?.current?.pause();
  };

  const onTouchVideo = () => {
    vidRef?.current?.focus();
  };

  useDidUpdate(() => {
    if (entry && !entry.isIntersecting && vidRef.current) {
      pauseVideo();
    }
  }, [entry]);

  if (!media && !url) {
    return null;
  }

  return (
    <Center
      h={height}
      w={width}
      ref={ref}
      style={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <video
        ref={vidRef}
        title={alt}
        controls
        controlsList='nodownload'
        poster={media?.url || url}
        preload='metadata'
        style={{ width: '100%', maxHeight: height, objectFit: 'contain', borderRadius: 8 }}
        onTouchStart={onTouchVideo}
        onPlay={onTouchVideo}
        onPause={onTouchVideo}
      >
        <source
          src={media?.url || url}
          type={media?.mimetype || mimetype || 'video/mp4'}
          onTouchStart={onTouchVideo}
        />
        Your browser does not support the video tag.
      </video>
    </Center>
  );
};

export default VideoPlayer;
