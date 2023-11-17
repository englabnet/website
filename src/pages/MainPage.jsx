import React, { useState } from 'react';
import { Center, CloseButton, Group, Paper, Space, Text } from '@mantine/core';

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import SearchBar from '../components/SearchBar';

const searchAnimation = keyframes`
  from {margin-top: 32vh}
  to {margin-top: 15px}
`;

const AnimatedCenter = styled(Center)`
  animation-name: ${searchAnimation};
  animation-duration: 500ms;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
`;

const welcomeMessageHiddenParam = 'welcome-message-hidden';

function isWelcomeMessageHidden() {
  const welcomeMessageHidden = localStorage.getItem(welcomeMessageHiddenParam);
  if (welcomeMessageHidden == null) {
    return false;
  }
  return welcomeMessageHidden === 'true';
}

function MainPage() {
  const [playAnimation, setPlayAnimation] = useState(false);
  const [searchValues, setSearchValues] = useState();
  const [welcomeMessageHidden, setWelcomeMessageHidden] = useState(isWelcomeMessageHidden());

  const searchHandler = (values) => {
    setSearchValues(values);
    setPlayAnimation(true);
  };

  const searchBar = (
    <SearchBar submitDelay={500} onSearch={(values) => searchHandler(values)} {...searchValues} />
  );

  const welcomeMessage = (
    <Center>
      <Paper withBorder radius="md" p="10px" mx="15px" mt="5vh" w="550px" style={{ backgroundColor: 'var(--mantine-color-background)' }}>
        <Group justify="space-between">
          <Space w="22px" />
          <Text c="dimmed" size="md">Welcome!</Text>
          <CloseButton c="dimmed" size="md" onClick={() => {
            localStorage.setItem(welcomeMessageHiddenParam, 'true');
            setWelcomeMessageHidden(true);
          }} />
        </Group>
        <Center p="10px">
          <Text c="dimmed" size="md">
            This website was designed to help you improve your English skills.
            Here, you can search for specific English words or phrases in YouTube videos.
            This tool is perfect for improving pronunciation and exploring language nuances.
            I hope you find it useful!
          </Text>
        </Center>
      </Paper>
    </Center>
  );

  return (
    <div style={{ height: '50dvh' }}>
      {playAnimation ? (
        <AnimatedCenter style={{ marginTop: '15px' }}>
          {searchBar}
        </AnimatedCenter>
      ) : (
        <>
          <Center style={{ marginTop: '32vh' }}>
            {searchBar}
          </Center>
          {!welcomeMessageHidden && welcomeMessage}
        </>
      )}
    </div>
  );
}

export default MainPage;
