import React, { useEffect, useRef, useState } from 'react';
import {
  ActionIcon, AspectRatio, Group, Stack, Text,
} from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import SubtitleBlock from './subtitles/SubtitleBlock.jsx';
import ReactPlayer from "react-player";
import ResponsivePaper from "./ResponsivePaper.jsx";

function VideoPlayer({
  index, count, video,
  disablePrevious = true, disableNext = false,
  onPrevious = () => {}, onNext = () => {},
}) {
  const player = useRef(null);
  const [url, setUrl] = useState("https://www.youtube.com/watch?v=" + video.videoId);

  // just a small adjustment to make sure that the phrase will appear in the video
  const startTime = Math.floor(video.subtitles[video.index].startTime);
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
    <ResponsivePaper w={800} p={0}>
      <Stack align="center">
        <Text size="xs" pt={15} c="dimmed">{`${index + 1}/${count}`}</Text>
        <AspectRatio ratio={16 / 8} w='100%'>
          <Group w="100%" justify="center" grow gap={0} wrap="nowrap">
            <ActionIcon
              maw="auto"
              variant="light"
              color="gray"
              h="100%"
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
              width="86%"
              height="100%"
            />
            <ActionIcon
              maw="auto"
              variant="light"
              color="gray"
              h="100%"
              radius={0}
              onClick={onNext}
              disabled={disableNext}
            >
              <IconChevronRight style={{ width: '60%', height: '60%' }} />
            </ActionIcon>
          </Group>
        </AspectRatio>
      </Stack>
      <SubtitleBlock subtitles={video.subtitles} currentTime={currentTime} />
    </ResponsivePaper>
  );
}

export default VideoPlayer;
