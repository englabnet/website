import React from 'react';
import { Space, Text, Title } from '@mantine/core';
import ResponsivePaper from "../../components/ResponsivePaper.jsx";

function AboutPage() {
  return (
    <ResponsivePaper w="60%">
      <Title order={2}>Spelling Trainer</Title>
      <Space h="md" />
      <Text size='md'>
        Here, you can practise your spelling by creating a new test with the words you often make mistakes in.
        Your test will be given a unique link, so you can come back to it later or share it with other people.
      </Text>
    </ResponsivePaper>
  );
}

export default AboutPage;
