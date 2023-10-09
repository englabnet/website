import React from 'react';
import {
  AppShell, Stack, Text,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './AppFooter.module.css';

export default function AppFooter() {
  return (
    <AppShell.Footer style={{ position: 'static' }}>
      <Stack align="center" justify="space-around" gap="xs" style={{ margin: 6 }}>
        <Link variant="transparent" className={classes.link} to='/terms'>Privacy & Terms</Link>
        <Text size="xs" c="dimmed">
          Copyright ©
          {' '}
          {new Date().getFullYear()}
          {' '}
          englab
        </Text>
      </Stack>
    </AppShell.Footer>
  );
}
