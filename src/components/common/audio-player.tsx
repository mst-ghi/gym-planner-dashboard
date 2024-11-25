import { useRef } from 'react';
import { Center } from '@mantine/core';
import { useDidUpdate, useIntersection } from '@mantine/hooks';

export interface AudioPlayerProps {
  media?: IMedia;
  url?: string;
  mimetype?: string;
  height?: number | string;
  width?: number | string;
  alt?: string;
}

export const AudioPlayer = ({ media, url, mimetype, height, width, alt }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { ref, entry } = useIntersection({
    threshold: 0.5,
  });

  const pauseAudio = () => {
    audioRef?.current?.pause();
  };

  const onTouchAudio = () => {
    audioRef?.current?.focus();
  };

  useDidUpdate(() => {
    if (entry && !entry.isIntersecting && audioRef.current) {
      pauseAudio();
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
      <audio
        ref={audioRef}
        title={alt}
        controls
        preload='metadata'
        style={{ width: '100%', maxHeight: height, objectFit: 'contain', borderRadius: 8 }}
        onTouchStart={onTouchAudio}
        onPlay={onTouchAudio}
        onPause={onTouchAudio}
      >
        <source
          src={media?.url || url}
          type={media?.mimetype || mimetype || 'audio/mp3'}
          onTouchStart={onTouchAudio}
        />
        Your browser does not support the audio tag.
      </audio>
    </Center>
  );
};

export default AudioPlayer;
