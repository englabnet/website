import React from 'react';
import {
  Button, Divider, Grid, Group, Paper,
  Select, Space, Textarea, TextInput, Title, Text,
} from '@mantine/core';
import { useForm } from "@mantine/form";
import axios from "axios";
import MessageDialog from "../components/MessageDialog.jsx";
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
  const [rateLimitError, rateLimitErrorHandlers] = useDisclosure(false);
  const [unexpectedErrorShown, unexpectedErrorHandlers] = useDisclosure(false);

  const sendFeedback = (values) => {
    axios
      .post('http://localhost:8080/feedback', values)
      .then(() => {
        successHandlers.open();
        form.reset();
      }).catch(error => {
        if (error.response.status === 429) {
          rateLimitErrorHandlers.open();
        } else {
          unexpectedErrorHandlers.open();
        }
      });
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
                { label: '🎥  suggest a new video', value: 'VIDEO' },
                { label: '🐣  suggest a new feature', value: 'FEATURE' },
                { label: '🐞  report a bug', value: 'BUG' },
                { label: '✍️  write something else', value: 'OTHER' },
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
      <MessageDialog
        type='success'
        message='Your feedback has been sent! Thank you!'
        opened={successShown}
        onClose={successHandlers.close}
      />
      <MessageDialog
        type='error'
        message="You've exceeded the rate limit. Please wait a few minutes and try again."
        opened={rateLimitError}
        onClose={rateLimitErrorHandlers.close}
      />
      <MessageDialog
        type='error'
        message='An unexpected error has occurred! Please try again later.'
        opened={unexpectedErrorShown}
        onClose={unexpectedErrorHandlers.close}
      />
    </Paper>
  );
}

export default FeedbackPage;
