import React from 'react';
import { Box, em, Paper } from '@mantine/core';
import { useMediaQuery } from "@mantine/hooks";

export default function ResponsivePaper({ width, children }) {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  if (isMobile) {
    return (
      <Box p="20px" mx="auto">
        {children}
      </Box>
    );
  }

  return (
    <Paper shadow="md" withBorder p="30px" w={width} mx="auto" mt={15}>
      {children}
    </Paper>
  );
}
