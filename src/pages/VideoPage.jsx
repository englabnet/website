import React, { useEffect, useState } from 'react';
import {
  ActionIcon,
  Center, Group, Paper, Stack, Text,
} from '@mantine/core';

import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';
import SearchBar from '../components/SearchBar';
import SubtitleBlock from '../components/SubtitleBlock';

function VideoPage() {
  const [searchParams] = useSearchParams();
  const [searchValues, setSearchValues] = useState(searchParams);
  const [response, setResponse] = useState(null);
  const [timeUpdater, setTimeUpdater] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);

  const loadVideo = () => {
    axios.get('http://localhost:8080/api/v1/searcher/search', {
      params: searchValues,
    }).then((r) => {
      if (r.data.videos[0]) {
        setCurrentTime(r.data.videos[0].timeFrame.startTime);
      }
      setResponse(r.data);
    });
  };

  useEffect(() => {
    if (timeUpdater) {
      clearInterval(timeUpdater);
      setTimeUpdater(null);
    }
    loadVideo();
  }, [searchValues]);

  const updateCurrentTime = (target) => {
    setCurrentTime(target.getCurrentTime());
  };

  const onPlayerStateChange = (event) => {
    // Call a function every 100ms to update the time
    if (!timeUpdater) {
      const id = setInterval(() => updateCurrentTime(event.target), 100);
      setTimeUpdater(id);
    }
  };

  let videoResults = null;
  if (response && response.videos.length > 0) {
    videoResults = (
      <Paper shadow="xs" py="15px" w={800} mx="auto">
        <Stack align="center">
          <Text size="xs" c="dimmed">{`1/${response.count}`}</Text>
          <Group w="100%" style={{ gap: 0 }}>
            <ActionIcon miw="50px" variant="light" color="gray" mih="393.75px" radius={0} disabled>
              <IconChevronLeft style={{ width: '60%', height: '60%' }} />
            </ActionIcon>
            <YouTube
              videoId={response.videos[0].videoId}
              style={{ height: 393.75 }}
              opts={{
                width: 700,
                height: 393.75,
                playerVars: {
                  start: Math.floor(response.videos[0].timeFrame.startTime),
                  autoplay: 1,
                },
              }}
              onPlay={onPlayerStateChange}
            />
            <ActionIcon miw="50px" variant="light" color="gray" mih="393.75px" radius={0}>
              <IconChevronRight style={{ width: '60%', height: '60%' }} />
            </ActionIcon>
          </Group>
        </Stack>
        <SubtitleBlock subtitles={response.videos[0].subtitles} currentTime={currentTime} />
      </Paper>
    );
  }

  return (
    <>
      <Center>
        <SearchBar
          phrase={searchParams.get('phrase')}
          variety={searchParams.get('variety')}
          onSearch={(values) => {
            setSearchValues(values);
          }}
        />
      </Center>
      <Stack mt={10}>
        {videoResults}
      </Stack>
    </>
  );
}

export default VideoPage;
