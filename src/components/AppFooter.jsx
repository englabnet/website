import React from 'react';
import { Center, Footer, Text } from '@mantine/core';

export default function AppFooter() {
  return (
    <Footer height="42px" p="sm">
      <Center>
        <Text size="xs" c="dimmed">
          Copyright ©
          {' '}
          {new Date().getFullYear()}
          {' '}
          englab
        </Text>
      </Center>
    </Footer>
  );
}
