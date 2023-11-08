import React from 'react';
import { Box, Center, em, Paper } from '@mantine/core';
import { useMediaQuery } from "@mantine/hooks";

export default function ResponsivePaper({ w, p="20px", children }) {
  const isMobile = useMediaQuery(`(max-width: ${em(800)})`);

  if (isMobile) {
    return (
      <Box p={p}>
        {children}
      </Box>
    );
  }

  return (
    <Center m={15}>
      <Paper shadow="md" withBorder w={w} p={p}>
        {children}
      </Paper>
    </Center>
  );
}
