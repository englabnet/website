import React, { useEffect, useState } from 'react';
import {
  Center, Loader, Stack, Text,
} from '@mantine/core';

import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import VideoPlayer from '../components/VideoPlayer';

function VideoPage() {
  const [searchParams] = useSearchParams();
  const [searchValues, setSearchValues] = useState(searchParams);
  const [response, setResponse] = useState(null);

  const loadVideo = () => {
    axios.get('http://localhost:8080/api/v1/searcher/search', {
      params: searchValues,
    }).then((r) => {
      setResponse(r.data);
    });
  };

  useEffect(() => {
    loadVideo();
  }, [searchValues]);

  let content = <Center h={500}><Loader color="gray" size="xl" /></Center>;

  if (response) {
    content = response.videos.length > 0
      ? <VideoPlayer count={response.count} video={response.videos[0]} />
      : <Center mih={500}><Text size="xl" c="dimmed">No result 😢</Text></Center>;
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
        {content}
      </Stack>
    </>
  );
}

export default VideoPage;
