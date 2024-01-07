import React, { useState } from 'react';
import { Button, Center, CloseButton, Group, Space, Stack, Table, Text, Title } from '@mantine/core';
import ResponsivePaper from "../../components/ResponsivePaper.jsx";
import WordSelector from "../../components/spelling/WordSelector.jsx";

function AboutPage() {
  const [words, setWords] = useState([]);

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
      <Group justify="flex-end">
        <Button disabled={words.length === 0}>Create Test</Button>
      </Group>
    </ResponsivePaper>
  );
}

export default AboutPage;
