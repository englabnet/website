import React, { useEffect, useState } from 'react';
import { ActionIcon, Button, Center, Group, Loader, Space, Stack, Text, Title } from '@mantine/core';
import ResponsivePaper from "../../components/ResponsivePaper.jsx";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import NotFoundPage from "../NotFoundPage.jsx";
import { IconPlayerPlayFilled } from '@tabler/icons-react';
import AccentControl from "../../components/spelling/AccentControl.jsx";

function SpellingPreviewPage() {
  const { testId } = useParams();
  const [test, setTest] = useState(null);
  const [accent, setAccent] = useState('UK');
  const [notFound, setNotFound] = useState(false);

  const loadTest = () => axios
    .get('/api/v1/tests/' + testId)
    .then((r) => {
      setTest(r.data);
    }).catch(error => {
      const response = error.response;
      if (response.status === 429) {
        setTest(null);
        // if it's 429 Too many requests, then wait a second and try again
        setTimeout(() => loadTest(), 1000);
      } else if (response.status === 404) {
        setNotFound(true);
      }
    });

  useEffect(() => {
    loadTest();
  }, []);

  if (!test) {
    return <Center h={500}><Loader color="gray" size="xl" /></Center>;
  }

  if (notFound) {
    return <NotFoundPage/>;
  }

  const content = test.words
    .map(word => {
      const filepath = word.pronunciationTracks.find(word => word.variety === accent).filepath;
      return (
        <Group key={word.id} gap="xs">
          <ActionIcon variant="filled" onClick={() => new Audio('/api/v1/' + filepath).play()}>
            <IconPlayerPlayFilled size={18} />
          </ActionIcon>
          <Text key={word.id} size="xl">{word.text}</Text>
        </Group>
      )
    });

  return (
    <ResponsivePaper w="40%">
      <Group justify="space-between">
        <Title order={2}>Spelling Test</Title>
        <AccentControl onChange={value => setAccent(value)} />
      </Group>
      <Space h="md" />
      <Text size='md'>
        Please, revise the words before starting the test:
      </Text>
      <Space h="xs" />
      <Stack gap="xs">
        {content}
      </Stack>
      <Space h="xl" />
      <Group justify="flex-end">
        <Link to={`/spelling/${testId}/test`}>
          <Button >Start</Button>
        </Link>
      </Group>
    </ResponsivePaper>
  );
}

export default SpellingPreviewPage;
