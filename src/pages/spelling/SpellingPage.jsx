import React, { useCallback, useState } from 'react';
import {
  Button,
  Center,
  CloseButton,
  Divider,
  Group,
  Modal,
  Space,
  Stack,
  Table,
  Text,
  Title
} from '@mantine/core';
import ResponsivePaper from "../../components/ResponsivePaper.jsx";
import WordSelector from "../../components/spelling/WordSelector.jsx";
import RecaptchaTerms from "../../components/recaptcha/RecaptchaTerms.jsx";
import axios from "axios";
import Clipboard from "../../components/Clipboard.jsx";
import { Link } from "react-router-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

function AboutPage() {
  const [words, setWords] = useState([]);
  const [testId, setTestId] = useState(null);

  const [loading, setLoading] = useState(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleReCaptchaVerify = useCallback(async () => {
    return await executeRecaptcha('generateTest');
  }, [executeRecaptcha]);

  const generateTest = () => {
    setLoading(true);
    handleReCaptchaVerify().then(token => {
      const config = {
        headers: {
          recaptcha: token
        }
      };
      axios
        .post('/api/v1/tests', words.map(word => word.id), config)
        .then((r) => {
          setTestId(r.data);
          setLoading(false);
        });
    });
  };

  const rows = words.map(word =>
    <Table.Tr key={word.id}>
      <Table.Td>
        <Group justify="space-between" key={word.id}>
          <Text size="lg">{word.text}</Text>
          <CloseButton onClick={() => setWords(words.filter(w => w.id !== word.id))} />
        </Group>
      </Table.Td>
    </Table.Tr>
  );

  return (
    <ResponsivePaper w="50%">
      <Title order={2}>Spelling Practice</Title>
      <Space h="md" />
      <Text size='md'>
        Here, you can practise your spelling by creating a new test with the words you often make mistakes in.
        Your test will be given a unique link, so you can come back to it later or share it with other people.
      </Text>
      <Space h="md" />
      <Center>
        <Stack w="100%">
          <WordSelector
            onSubmit={value => {
              if (!words.find(w => w.id === value.id)) {
                setWords([value, ...words]);
              }
            }}
            disabled={words.length >= 50}
          />
          {rows.length > 0 ? (
            <Table>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>) : (
              <Center h={50}>
                <Text c='dimmed'>No data</Text>
              </Center>
            )}
        </Stack>
      </Center>
      <Space h="md" />
      <Divider h="md" />
      <RecaptchaTerms />
      <Space h="md" />
      <Group justify="flex-end">
        <Button disabled={words.length === 0} onClick={generateTest} loading={loading}>Create Test</Button>
      </Group>
      <Modal opened={testId != null} centered title={"Your test has been generated!"} onClose={() => setTestId(null)}>
        <Clipboard link={`https://englab.net/spelling/${testId}`} description={"Here's the link:"}/>
        <Group justify="flex-end">
          <Link target="_blank" to={`/spelling/${testId}`}>
            <Button>Open Test</Button>
          </Link>
        </Group>
      </Modal>
    </ResponsivePaper>
  );
}

export default AboutPage;
