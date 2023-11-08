import React from 'react';
import { List, Space, Text, Title } from '@mantine/core';
import { Link } from "react-router-dom";
import ResponsivePaper from "../components/ResponsivePaper.jsx";

function AboutPage() {
  return (
    <ResponsivePaper w="80%">
      <Title order={2}>Welcome to englab!</Title>
      <Space h="md" />
      <Text size='md'>
        This small website aims to help English learners all over the world master the language.
        While it currently lacks extensive functionality, I plan to add a lot of new features and helpful exercises in the future.
        If you have any suggestions on how to improve this platform, don&apos;t hesitate to <Link to="/feedback">leave feedback</Link>.
      </Text>
      <Space h="lg" />
      <Title order={3}>Functionality</Title>
      <Space h="xs" />
      <Text>
        For now, I&apos;ve implemented only a video search feature that allows you to find specific words or phrases in YouTube videos.
        It&apos;s quite simple, but useful enough if you want to check pronunciation or find sentence examples.
      </Text>
      <Space h="xs" />
      <Text>
        Here&apos;s a list of things I&apos;m going to add in the future:
      </Text>
      <List>
        <List.Item>More accents</List.Item>
        <List.Item>Advanced search</List.Item>
        <List.Item>Dictation exercises</List.Item>
        <List.Item>Spelling trainer</List.Item>
      </List>
      <Space h="xs" />
      <Text>
        The list above is definitely not complete and will expand in the future
        as I&apos;m very excited about this project and have myriad ideas for further development.
      </Text>
    </ResponsivePaper>
  );
}

export default AboutPage;
