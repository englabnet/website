import React, { useEffect, useRef, useState } from 'react';
import {
  ActionIcon, Group, Paper, Stack, Text,
} from '@mantine/core';

import YouTube from 'react-youtube';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';
import SubtitleBlock from './SubtitleBlock';

function VideoPlayer({ count, video }) {
  if (!video) return null;
  console.log('render!');
  const player = useRef(null);
  const intervalId = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  const { startTime } = video.timeFrame;
  useEffect(() => {
    console.log('mount');
    console.log('set startTime!');
    if (intervalId.current) {
      console.log('clearInterval!');
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
    setCurrentTime(startTime);
    return () => {
      console.log('unmount');
      if (intervalId.current) {
        console.log('clearInterval!');
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
    };
  }, [startTime, intervalId]);

  const onPlayerStateChange = (event) => {
    // Call a function every 100ms to update the time
    if (!intervalId.current || player.current !== event.target) {
      player.current = event.target;
      console.log('setInterval!');
      intervalId.current = setInterval(() => {
        const state = event.target.getPlayerState();
        if (state === 1 || state === 2) {
          console.log(event.target.getCurrentTime());
          setCurrentTime(event.target.getCurrentTime());
        }
      }, 100);
    }
  };

  return (
    <Paper shadow="xs" py="15px" w={800} mx="auto">
      <Stack align="center">
        <Text size="xs" c="dimmed">{`1/${count}`}</Text>
        <Group w="100%" style={{ gap: 0 }}>
          <ActionIcon miw="50px" variant="light" color="gray" mih="393.75px" radius={0} disabled>
            <IconChevronLeft style={{ width: '60%', height: '60%' }} />
          </ActionIcon>
          <YouTube
            videoId={video.videoId}
            style={{ height: 393.75 }}
            opts={{
              width: 700,
              height: 393.75,
              playerVars: {
                start: Math.floor(video.timeFrame.startTime),
                autoplay: 1,
              },
            }}
            onStateChange={onPlayerStateChange}
          />
          <ActionIcon miw="50px" variant="light" color="gray" mih="393.75px" radius={0}>
            <IconChevronRight style={{ width: '60%', height: '60%' }} />
          </ActionIcon>
        </Group>
      </Stack>
      <SubtitleBlock subtitles={video.subtitles} currentTime={currentTime} />
    </Paper>
  );
}

export default VideoPlayer;
