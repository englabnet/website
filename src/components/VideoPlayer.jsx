import React, { useEffect, useRef, useState } from 'react';
import {
  ActionIcon, Group, Paper, Stack, Text,
} from '@mantine/core';

import YouTube from 'react-youtube';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';
import SubtitleBlock from './SubtitleBlock';

function VideoPlayer({
  index, count, video,
  disablePrevious = true, disableNext = false,
  onPrevious = () => {}, onNext = () => {},
}) {
  if (!video) return null;

  const player = useRef(null);
  const intervalId = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  const { startTime } = video.subtitles[video.index];

  useEffect(() => {
    const p = player.current.internalPlayer;
    setCurrentTime(startTime);
    p.loadVideoById(video.videoId, startTime);
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
    intervalId.current = setInterval(() => {
      p.getPlayerState().then((state) => {
        if (state === 1 || state === 2) { // play or pause
          p.getCurrentTime().then((time) => setCurrentTime(time));
        }
      });
    }, 100);
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [video]);

  return (
    <Paper shadow="xs" py="15px" w={800} mx="auto">
      <Stack align="center">
        <Text size="xs" c="dimmed">{`${index + 1}/${count}`}</Text>
        <Group w="100%" style={{ gap: 0 }}>
          <ActionIcon
            miw="50px"
            variant="light"
            color="gray"
            mih="393.75px"
            radius={0}
            onClick={onPrevious}
            disabled={disablePrevious}
          >
            <IconChevronLeft style={{ width: '60%', height: '60%' }} />
          </ActionIcon>
          <YouTube
            ref={player}
            style={{ width: 700, height: 393.75 }}
            opts={{ width: 700, height: 393.75 }}
          />
          <ActionIcon
            miw="50px"
            variant="light"
            color="gray"
            mih="393.75px"
            radius={0}
            onClick={onNext}
            disabled={disableNext}
          >
            <IconChevronRight style={{ width: '60%', height: '60%' }} />
          </ActionIcon>
        </Group>
      </Stack>
      <SubtitleBlock subtitles={video.subtitles} currentTime={currentTime} />
    </Paper>
  );
}

export default VideoPlayer;
