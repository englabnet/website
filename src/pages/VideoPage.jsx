import React, { useEffect, useState } from 'react';
import {
  Center, Paper, Stack,
} from '@mantine/core';

import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import SearchBar from '../components/SearchBar';
import SubtitleBlock from '../components/SubtitleBlock';

function VideoPage() {
  const [searchParams] = useSearchParams();
  const [searchValues, setSearchValues] = useState(searchParams);
  const [videos, setVideos] = useState([]);
  const [timeUpdater, setTimeUpdater] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);

  const loadVideo = () => {
    axios.get('http://localhost:8080/api/v1/searcher/search', {
      params: searchValues,
    }).then((r) => {
      const data = r.data.videos;
      if (data[0]) {
        setCurrentTime(data[0].timeFrame.startTime);
      }
      setVideos(data);
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
    // comment if (target.getPlayerState() === 1) {
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
  if (videos.length > 0) {
    videoResults = (
      <Paper shadow="xs" p="xl" w={800} mx="auto">
        <Center>
          <YouTube
            videoId={videos[0].videoId}
            opts={{
              width: 720,
              height: 405,
              playerVars: {
                start: Math.floor(videos[0].timeFrame.startTime),
                autoplay: 1,
              },
            }}
            onPlay={onPlayerStateChange}
          />
        </Center>
        <SubtitleBlock subtitles={videos[0].subtitles} currentTime={currentTime} />
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
