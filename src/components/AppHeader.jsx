import React from 'react';
import {
  Header, Text, Group, useMantineColorScheme, ActionIcon, UnstyledButton, Button, Divider,
} from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';

export default function AppHeader() {
  const navigate = useNavigate();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return (
    <Header p="sm" height="56px">
      <Group position="apart">
        <Group spacing={0}>
          <UnstyledButton onClick={() => navigate('/')}>
            <Text
              size="xl"
              weight={800}
              variant="gradient"
            >
              englab
            </Text>
          </UnstyledButton>
        </Group>
        <Group>
          <Button px={0} variant="transparent" onClick={() => navigate('/feedback')}>Feedback</Button>
          <Button px={0} variant="transparent" onClick={() => navigate('/about')}>About</Button>
          <Divider orientation="vertical" />
          <ActionIcon
            variant="default"
            color="gray"
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <IconSun size={18} color="gray" /> : <IconMoonStars size={18} color="gray" />}
          </ActionIcon>
        </Group>
      </Group>
    </Header>
  );
}
