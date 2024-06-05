import React, { useEffect, useRef, useState } from 'react';
import {
  ActionIcon,
  Button,
  Center,
  Group,
  Loader,
  Space, Text,
  TextInput,
} from '@mantine/core';
import { useParams } from "react-router-dom";
import axios from "axios";
import { IconPlayerPlayFilled } from '@tabler/icons-react';
import { useForm } from "@mantine/form";

function SpellingTest({ accent, step = 0, onNext = () => {}, onFinish = () => {} }) {
  const { testId } = useParams();
  const [stepData, setStepData] = useState();
  const [notFound, setNotFound] = useState(false);
  const [audio, setAudio] = useState({ 'UK': null, 'US': null });

  const [correct, setCorrect] = useState(null);
  const attempts = useRef(0);
  const result = useRef({});

  const form = useForm({
    initialValues: {
      answer: '',
    }
  });

  const loadStep = () => axios
    .get('/api/v1/tests/' + testId + '/' + step)
    .then((r) => {
      setStepData(r.data);

      form.reset();
      attempts.current = 0;
      setCorrect(null);

      const tracks = r.data.pronunciationTracks;
      const ukAudio = new Audio('/api/v1/' + tracks.find(word => word.variety === 'UK').filepath);
      const usAudio = new Audio('/api/v1/' + tracks.find(word => word.variety === 'US').filepath);
      setAudio({ 'UK': ukAudio, 'US': usAudio });

    }).catch(error => {
      if (error.response.status === 404) {
        setNotFound(true);
      }
    });

  const checkAnswer = (answer) => axios
    .get('/api/v1/tests/' + testId + '/' + step + '/check', {
      params: {
        answer: answer
      }
    }).then(r => {
      setCorrect(r.data);
      if (!r.data) {
        attempts.current++;
      }
    });

  const nextStep = () => {
    let status = "skipped";
    if (correct) {
      status = attempts.current === 0 ? "correct" : "mistake";
    }
    result.current[stepData.wordId] = status;

    if (step === stepData.total - 1) {
      onFinish(result.current);
    } else {
      onNext();
    }
  };

  const handleSubmit = (values) => {
    if (correct) {
      nextStep();
    } else {
      checkAnswer(values.answer);
    }
  };

  const handleSkip = () => {
    nextStep();
  }

  useEffect(() => {
    loadStep();
  }, [step]);

  useEffect(() => {
    if (audio[accent] != null) {
      audio[accent].play();
    }
  }, [audio]);

  if (!stepData) {
    return <Center><Loader color="gray" size="xl" /></Center>;
  }

  if (notFound) {
    return <Center><Text>The step has not been found</Text></Center>;
  }

  return (
    <>
      <Center>
        <Text size="xs" c="dimmed">{step + 1} / {stepData.total}</Text>
      </Center>
      <Space h="md" />
      <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
        <Center>
          <Group gap='xs'>
            <ActionIcon
              variant="filled"
              size="xl"
              radius="md"
              onClick={() => audio[accent].play()}
            >
              <IconPlayerPlayFilled />
            </ActionIcon>
            <TextInput
              size="lg"
              w={200}
              readOnly={correct}
              {...form.getInputProps('answer')}
              error={correct === false}
              autocomplete="off"
            />
          </Group>
        </Center>
        <Space h="md" />
        <Center h={20}>
          <Text c="green.8" fw={700}>{ correct ? "Well done!" : "" }</Text>
        </Center>
        <Space h="xl" />
        <Group justify="space-between">
          <Button disabled={correct} onClick={handleSkip} variant="outline">Skip</Button>
          {correct ? <Button type='submit'>Next</Button> : <Button type='submit'>Check</Button>}
        </Group>
      </form>
    </>
  );
}

export default SpellingTest;
