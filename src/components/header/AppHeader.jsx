import React from 'react';
import {
  AppShell, Text, Group, useMantineColorScheme, ActionIcon, Divider,
} from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import classes from './AppHeader.module.css';

const links = [
  { link: '/feedback', label: 'Feedback' },
  { link: '/about', label: 'About' },
];

export default function AppHeader() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const items = links.map((link) => (
    <Link
      className={classes.link}
      key={link.label}
      to={link.link}
    >
      {link.label}
    </Link>
  ));

  return (
    <AppShell.Header p="sm" height="56px">
      <Group justify="space-between">
        <Link className={classes.logo} to="/">
          <Text
            size="xl"
            fw={900}
            variant="gradient"
          >
            englab
          </Text>
        </Link>
        <Group gap="xs">
          {items}
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
    </AppShell.Header>
  );
}
