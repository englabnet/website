import React, { useEffect, useRef, useState } from 'react';
import {
  ActionIcon, AspectRatio, Button, Group, Stack, Switch, Text,
} from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import SubtitleBlock from './subtitles/SubtitleBlock.jsx';
import ReactPlayer from "react-player";
import ResponsivePaper from "./ResponsivePaper.jsx";
import classes from './VideoPlayer.module.css';
import { formatNumber } from "../utils/NumberFormatter.js";

const autoplaySetting = 'autoplay-setting';

function getAutoplaySettingOrDefault(defaultValue) {
  const autoplay = localStorage.getItem(autoplaySetting);
  if (autoplay == null) {
    return defaultValue;
  }
  return autoplay === 'true';
}

function VideoPlayer({
  index, count, video,
  disablePrevious = true, disableNext = false,
  onPrevious = () => {}, onNext = () => {},
}) {
  const player = useRef(null);
  const [url, setUrl] = useState("https://www.youtube.com/watch?v=" + video.videoId);
  const [autoplay, setAutoplay] = useState(getAutoplaySettingOrDefault(true));
  const [light, setLight] = useState(false);

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
    setCurrentTime(startTime);

    setLight(!autoplay);
    if (!autoplay && light) {
      player.current.showPreview();
    }
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
      <Stack align="center" gap={0}>
        <Text size="xs" p={15} c="dimmed">{`${index + 1} / ${formatNumber(count)}`}</Text>
        <AspectRatio ratio={16 / 8} w='100%'>
          <Group w="100%" justify="center" grow gap={0} wrap="nowrap">
            <ActionIcon
              variant="light"
              color="gray"
              maw="7%"
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
              light={light}
              controls
              width="86%"
              height="100%"
            />
            <ActionIcon
              variant="light"
              color="gray"
              maw="7%"
              h="100%"
              radius={0}
              onClick={onNext}
              disabled={disableNext}
            >
              <IconChevronRight style={{ width: '60%', height: '60%' }} />
            </ActionIcon>
          </Group>
        </AspectRatio>
        <Group w="86%" py={5} justify="flex-end" gap="xs">
          <Switch
            classNames={{ label: classes.switchLabel }}
            checked={autoplay}
            label="Autoplay"
            onChange={event => {
              const checked = event.currentTarget.checked;
              setAutoplay(checked);
              localStorage.setItem(autoplaySetting, checked);
            }}
          />
          <Button variant="default" onClick={() => {
            player.current.seekTo(startTime, 'seconds');
            const internalPlayer = player.current.getInternalPlayer();
            if (internalPlayer) {
              internalPlayer.playVideo();
            }
          }}>Replay</Button>
        </Group>
      </Stack>
      <SubtitleBlock subtitles={video.subtitles} currentTime={currentTime} />
    </ResponsivePaper>
  );
}

export default VideoPlayer;
