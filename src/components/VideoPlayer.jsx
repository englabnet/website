import React, { useEffect, useRef, useState } from 'react';
import {
  ActionIcon, Group, Paper, Stack, Text,
} from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import SubtitleBlock from './SubtitleBlock';
import ReactPlayer from "react-player";

function VideoPlayer({
  index, count, video,
  disablePrevious = true, disableNext = false,
  onPrevious = () => {}, onNext = () => {},
}) {
  const player = useRef(null);
  const [url, setUrl] = useState("https://www.youtube.com/watch?v=" + video.videoId);
  const { startTime } = video.subtitles[video.index];
  const [currentTime, setCurrentTime] = useState(startTime);

  const videoIdRef = useRef(video.videoId);
  const startTimeRef = useRef(startTime);

  const onReady = () => {
    player.current.seekTo(startTime, 'seconds');
  }

  useEffect(() => {
    const hasVideoIdChanged = videoIdRef.current !== video.videoId;
    const hasStartTimeChanged = startTimeRef.current !== startTime;

    if (hasVideoIdChanged) {
      setUrl("https://www.youtube.com/watch?v=" + video.videoId);
    } else if (hasStartTimeChanged) {
      player.current.seekTo(startTime, 'seconds');
    }

    videoIdRef.current = video.videoId;
    startTimeRef.current = startTime;
  }, [startTime, video])

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = player.current.getCurrentTime();
      if (currentTime) {
        setCurrentTime(currentTime);
      }
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, [url]);

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
            url={url}
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
