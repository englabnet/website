import React from 'react';
import {
  Header, Text, Group, useMantineTheme, useMantineColorScheme, ActionIcon,
} from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons';

export default function AppHeader() {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return (
    <Header p="sm" height={60}>
      <Group position="apart">
        <Group spacing={0}>
          <Text
            size="xl"
            weight={800}
            variant="gradient"
            gradient={{ from: theme.colors.blue[6], to: theme.colors.blue[4] }}
          >
            englab
          </Text>
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
