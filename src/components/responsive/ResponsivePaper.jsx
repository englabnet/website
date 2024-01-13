import React from 'react';
import { Center, em, Paper } from '@mantine/core';
import { useMediaQuery } from "@mantine/hooks";

export default function ResponsivePaper({ w, p = "20px", children }) {
  const isMobile = useMediaQuery(`(max-width: ${em(800)})`);

  return (
    <Center m={ isMobile ? 0 : 15 }>
      <Paper shadow={ isMobile ? 0 : "md" }
             withBorder={!isMobile}
             radius={ isMobile ? 0 : "md" }
             w={ isMobile ? '100%' : w }
             p={p}
      >
        {children}
      </Paper>
    </Center>
  );
}
