import React from 'react';
import {
  Button, Divider, Grid, Group, Paper,
  Select, Space, Textarea, TextInput, Title, Text, Modal
} from '@mantine/core';
import { IconCircleCheck, IconExclamationCircle } from '@tabler/icons-react';
import { useForm } from "@mantine/form";
import axios from "axios";
import { useDisclosure } from "@mantine/hooks";

function FeedbackPage() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      type: 'VIDEO',
      message: '',
    },
    validate: {
      name: (value) => (value !== '' ? null : 'Empty name'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      message: (value) => (value !== '' ? null : 'Empty message'),
    },
  });

  const [successShown, successHandlers] = useDisclosure(false);
  const [errorShown, errorHandlers] = useDisclosure(false);

  const sendFeedback = (values) => {
    console.log(values);
    axios
      .post('http://localhost:8081/api/v1/feedback', values)
      .then(() => {
        successHandlers.open();
        form.reset();
      })
      .catch(() => errorHandlers.open());
  }

  return (
    <Paper shadow="xs" p="30px" w={500} mx="auto" mt={10}>
      <Title order={2}>Leave feedback</Title>
      <Space h="md" />
      <Text size='sm'>
        Glad to see you here!
        If you want to help me improve this website, you can leave your feedback here.
      </Text>
      <Space h="md" />
      <Divider />
      <Space h="lg" />
      <form onSubmit={form.onSubmit(values => sendFeedback(values))}>
        <Grid>
          <Grid.Col span={12}>
            <TextInput
              label="Name"
              placeholder="Your name"
              withAsterisk
              {...form.getInputProps('name')}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              label="Email"
              placeholder="your@email.com"
              withAsterisk
              {...form.getInputProps('email')}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Select
              label="I'd like to"
              allowDeselect={false}
              defaultValue={'suggest a new video'}
              data={[
                { label: '🎥 suggest a new video', value: 'VIDEO' },
                { label: '🐣 suggest a new feature', value: 'FEATURE' },
                { label: '🐞 report a bug', value: 'BUG' },
                { label: '✍️ write something else', value: 'OTHER' },
              ]}
              {...form.getInputProps('type')}
            />
          </Grid.Col>
        </Grid>
        <Space h="md" />
        <Textarea
          placeholder="Enter your message here..."
          label="Message"
          autosize
          withAsterisk
          minRows={6}
          {...form.getInputProps('message')}
        />
        <Space h="md" />
        <Group justify="flex-end">
          <Button type='submit'>Send</Button>
        </Group>
      </form>
      <Modal opened={successShown} onClose={successHandlers.close} centered>
        <Group mb={20}>
          <IconCircleCheck size={50} color="green"/>
          <Text size="md">
            Your feedback has been sent! Thank you!
          </Text>
        </Group>
        <Group justify="flex-end">
          <Button onClick={successHandlers.close}>Close</Button>
        </Group>
      </Modal>
      <Modal opened={errorShown} onClose={errorHandlers.close} centered>
        <Group mb={20}>
          <IconExclamationCircle size={50} color="red"/>
          <Text size="md" maw={300}>
            An unexpected error has occurred! Please, try again later.
          </Text>
        </Group>
        <Group justify="flex-end">
          <Button onClick={errorHandlers.close}>Close</Button>
        </Group>
      </Modal>
    </Paper>
  );
}

export default FeedbackPage;
