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
  const [searchValues, setSearchValues] = useState({
    phrase: searchParams.get('phrase'),
    variety: searchParams.get('variety'),
  });
  const [response, setResponse] = useState(null);
  const [page, setPage] = useState(0);
  const [index, setIndex] = useState(0);

  const loadVideos = (from = 0) => axios
    .get('/api/v1/search', {
      params: {
        phrase: searchValues.phrase,
        variety: searchValues.variety !== "ALL" ? searchValues.variety : null,
        from,
      },
    }).then(r => {
      setResponse(r.data);
    });

  useEffect(() => {
    loadVideos(0)
      .then(() => {
        setPage(0);
        setIndex(0);
      });
  }, [searchValues]);

  let content = <Center h={500}><Loader color="gray" size="xl" /></Center>;
  if (response) {
    const realIndex = page * 10 + index;
    content = response.videos.length > 0
      ? (
        <VideoPlayer
          index={realIndex}
          count={response.count}
          video={response.videos[index]}
          disablePrevious={realIndex === 0}
          disableNext={realIndex + 1 === response.count}
          onPrevious={() => {
            if (index - 1 === -1 && page !== 0) {
              loadVideos(realIndex - 10)
                .then(() => {
                  setPage(page - 1);
                  setIndex(9);
                });
            } else {
              setIndex(index - 1);
            }
          }}
          onNext={() => {
            if (index + 1 === response.videos.length) {
              loadVideos(realIndex + 1)
                .then(() => {
                  setPage(page + 1);
                  setIndex(0);
                });
            } else {
              setIndex(index + 1);
            }
          }}
        />
      )
      : <Center mih={500}><Text size="xl" c="dimmed">No result 😢</Text></Center>;
  }

  return (
    <>
      <Center mt={15}>
        <SearchBar
          phrase={searchParams.get('phrase')}
          variety={searchParams.get('variety')}
          onSearch={(values) => {
            setSearchValues(values);
          }}
        />
      </Center>
      <Stack>
        {content}
      </Stack>
    </>
  );
}

export default VideoPage;
