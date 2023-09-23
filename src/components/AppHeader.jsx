import React from 'react';
import {
  Header, Text, Group, useMantineTheme, useMantineColorScheme, ActionIcon, UnstyledButton,
} from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';

export default function AppHeader() {
  const navigate = useNavigate();
  const theme = useMantineTheme();
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
              gradient={{ from: theme.colors.blue[6], to: theme.colors.blue[4] }}
            >
              englab
            </Text>
          </UnstyledButton>
        </Group>
        <ActionIcon
          variant="default"
          color="gray"
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
        >
          {dark ? <IconSun size={18} color="gray" /> : <IconMoonStars size={18} color="gray" />}
        </ActionIcon>
      </Group>
    </Header>
  );
}
