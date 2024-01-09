import React, { useEffect, useState } from "react";
import { Button, Center, Group, Loader, Stack, Table, Text } from "@mantine/core";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function SpellingResult({ result = [] }) {
  const { testId } = useParams();
  const [test, setTest] = useState(null);

  const loadTest = () => axios
    .get('/api/v1/tests/' + testId)
    .then((r) => {
      setTest(r.data);
    });

  useEffect(() => {
    loadTest();
  }, []);

  if (!test) {
    return <Center h={500}><Loader color="gray" size="xl" /></Center>;
  }

  const rows = test.words.map(word => {
    let status = '❌';
    switch (result[word.id]) {
      case 'correct':
        status = '✅';
        break;
      case 'mistake':
        status = '⚠️';
        break;
    }
    return (
      <Table.Tr key={word.id}>
        <Table.Td><Text size="xl">{status} {word.text}</Text></Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Stack>
      <Table>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Group justify="flex-end">
        <Link to={`/spelling/${testId}`}>
          <Button>Try again</Button>
        </Link>
      </Group>
    </Stack>
  );
}

export default SpellingResult;
