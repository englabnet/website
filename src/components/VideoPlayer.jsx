import React, { useEffect, useRef, useState } from 'react';
import {
  ActionIcon, Group, Paper, Stack, Text,
} from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';
import SubtitleBlock from './SubtitleBlock';
import ReactPlayer from "react-player";

function VideoPlayer({
  index, count, video,
  disablePrevious = true, disableNext = false,
  onPrevious = () => {}, onNext = () => {},
}) {
  const player = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  const onReady = () => {
    const { startTime } = video.subtitles[video.index];
    player.current.seekTo(startTime, 'seconds');
    setCurrentTime(startTime);
  }

  useEffect(() => {
    onReady();
    const interval = setInterval(() => {
      const currentTime = player.current.getCurrentTime();
      setCurrentTime(currentTime);
    }, 100);

    return () => {
      console.log("unmount");
      clearInterval(interval);
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
          <ReactPlayer
            ref={player}
            url={"https://www.youtube.com/watch?v=" + video.videoId}
            onReady={onReady}
            playing
            controls
            width={700}
            height={393.75}
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
