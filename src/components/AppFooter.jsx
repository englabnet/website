import React from 'react';
import {
  Button, Center, Footer, Stack, Text,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function AppFooter() {
  const navigate = useNavigate();
  return (
    <Footer height="40px">
      <Center>
        <Stack align="center" style={{ gap: '0px' }}>
          <Button h={20} variant="transparent" color="gray.6" size="xs" onClick={() => navigate('/terms')}>Privacy & Terms</Button>
          <Text size="xs" c="dimmed" py={0}>
            Copyright ©
            {' '}
            {new Date().getFullYear()}
            {' '}
            englab
          </Text>
        </Stack>
      </Center>
    </Footer>
  );
}
