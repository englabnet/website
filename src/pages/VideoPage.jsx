import React, { useEffect, useState } from 'react';
import {
  Center, Text, Paper, Stack,
} from '@mantine/core';

import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import SearchBar from '../components/SearchBar';

function VideoPage() {
  const [searchParams] = useSearchParams();
  const [searchValues, setSearchValues] = useState(searchParams);
  const [videos, setVideos] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);

  const loadVideo = () => {
    axios.get('http://localhost:8080/api/v1/searcher/search', {
      params: searchValues,
    }).then((r) => {
      setVideos(r.data);
      if (r.data) {
        setCurrentTime(r.data[0].timeFrame.startTime);
      }
    });
  };

  useEffect(() => {
    loadVideo();
  }, [searchValues]);

  const updateCurrentTime = (target) => {
    setCurrentTime(target.getCurrentTime());
  };

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      // Call a function every second to update the time
      setInterval(() => updateCurrentTime(event.target), 100);
    }
  };

  let videoResults = null;
  if (videos && videos.length > 0) {
    videoResults = (
      <Paper shadow="xs" p="xl" w={800} mx="auto">
        <Center>
          <YouTube
            videoId={videos[0].videoId}
            opts={{
              width: 720,
              height: 405,
              playerVars: {
                start: videos[0].timeFrame.startTime,
                autoplay: 1,
              },
            }}
            onStateChange={onPlayerStateChange}
          />
        </Center>
        <Text>{Math.floor(currentTime)}</Text>
        <Text>{videos[0].sentence}</Text>
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
