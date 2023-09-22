import React from 'react';
import {
  ActionIcon,
  Box, Grid, SegmentedControl, TextInput, useMantineTheme,
} from '@mantine/core';

import { useForm } from '@mantine/form';

import { IconSearch } from '@tabler/icons';

function MainPage() {
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: {
      phrase: '',
    },
  });

  return (
    <Box maw={800} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Grid gutter={6} justify="center" align="flex-end">
          <Grid.Col span="auto">
            <TextInput size="50" placeholder="Search for..." />
          </Grid.Col>
          <Grid.Col span="content">
            <ActionIcon
              variant="gradient"
              size={50}
              aria-label="Search"
              color="primary"
              gradient={{ from: theme.colors.blue[6], to: theme.colors.blue[4] }}
            >
              <IconSearch style={{ width: '60%', height: '60%' }} />
            </ActionIcon>
          </Grid.Col>
        </Grid>
        <Grid justify="center" align="flex-end">
          <Grid.Col span="content">
            <SegmentedControl size="sm" data={['🌎 All', '🇬🇧 UK', '🇺🇸 US', '🇦🇺 AUS']} />
          </Grid.Col>
        </Grid>
      </form>
    </Box>
  );
}

export default MainPage;
