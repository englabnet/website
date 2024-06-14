import React, { useEffect, useRef, useState } from 'react';
import {
  AspectRatio, Button, em, Group, Stack, Switch, Text, Tooltip,
} from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import SubtitleBlock from './subtitles/SubtitleBlock.jsx';
import ReactPlayer from "react-player";
import ResponsivePaper from "./responsive/ResponsivePaper.jsx";
import classes from './VideoPlayer.module.css';
import { englishVarietyToIcon } from "../utils/icons.js";
import { useMediaQuery } from "@mantine/hooks";

const youtubeUrl = "https://www.youtube-nocookie.com/watch?v=";

const autoplaySetting = 'autoplay-setting';
const numberFormatter = Intl.NumberFormat('en', { notation: "compact" });

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
  const isMobile = useMediaQuery(`(max-width: ${em(800)})`);

  const player = useRef(null);
  const [url, setUrl] = useState(youtubeUrl + video.youtubeVideoId);
  const [autoplay, setAutoplay] = useState(getAutoplaySettingOrDefault(true));
  const [light, setLight] = useState(false);

  // just a small adjustment to make sure that the phrase will appear in the video
  const startTime = Math.floor(video.subtitles[video.subtitleEntryIndex].startTime);
  const [currentTime, setCurrentTime] = useState(startTime);

  const videoIdRef = useRef(video.youtubeVideoId);
  const indexRef = useRef(index);

  const onReady = () => {
    player.current.seekTo(startTime, 'seconds');
  }

  useEffect(() => {
    const hasVideoIdChanged = videoIdRef.current !== video.youtubeVideoId;
    const hasIndexChanged = indexRef.current !== index;

    // if the video id hasn't changed, we just need to play a different part of the video
    if (hasVideoIdChanged) {
      setUrl(youtubeUrl + video.youtubeVideoId);
    } else if (hasIndexChanged) {
      player.current.seekTo(startTime, 'seconds');
    }

    videoIdRef.current = video.youtubeVideoId;
    indexRef.current = index;

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
        <Text size="xs" p={15} c="dimmed">{`${index + 1} / ${numberFormatter.format(count)}`}</Text>
        <AspectRatio ratio={16 / 9} w='100%'>
          <Group w="100%" justify="center" grow gap={0} wrap="nowrap">
            <ReactPlayer
              ref={player}
              url={url}
              onReady={onReady}
              playing
              light={light}
              controls
              width="100%"
              height="100%"
              config={{
                youtube: {
                  playerVars: {
                    color: 'white',
                    fs: 0,
                    start: 10
                  }
                }
              }}
            />
          </Group>
        </AspectRatio>
        <Group w="100%" miw={350} p={5} justify="space-between" gap="xs">
          <Group gap="xs">
            <Tooltip position="bottom" withArrow openDelay={500} label="Previous video">
              <Button maw="60px" size="xs" onClick={onPrevious} disabled={disablePrevious} variant="default">
                <IconChevronLeft />
              </Button>
            </Tooltip>
            <Text size="xs">
              {isMobile ? englishVarietyToIcon(video.variety) : `${englishVarietyToIcon(video.variety)} ${video.variety} accent`}
            </Text>
          </Group>
          <Group justify="flex-end" gap="xs">
            <Switch
              classNames={{ label: classes.switchLabel }}
              size="xs"
              checked={autoplay}
              label="Autoplay"
              onChange={event => {
                const checked = event.currentTarget.checked;
                setAutoplay(checked);
                localStorage.setItem(autoplaySetting, checked.toString());
              }}
            />
            <Button variant="default" size="xs" onClick={() => {
              player.current.seekTo(startTime, 'seconds');
              const internalPlayer = player.current.getInternalPlayer();
              if (internalPlayer) {
                internalPlayer.playVideo();
              }
            }}>Replay</Button>
            <Tooltip position="bottom" withArrow openDelay={500} label="Next video">
              <Button maw="60px" size="xs" onClick={onNext} disabled={disableNext} variant="default">
                <IconChevronRight />
              </Button>
            </Tooltip>
          </Group>
        </Group>
      </Stack>
      <SubtitleBlock subtitles={video.subtitles} currentTime={currentTime} />
    </ResponsivePaper>
  );
}

export default VideoPlayer;
