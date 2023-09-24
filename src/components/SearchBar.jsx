import React from 'react';
import {
  ActionIcon, Box, Grid, SegmentedControl, TextInput,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import { useForm } from '@mantine/form';
import { createSearchParams, useNavigate } from 'react-router-dom';

function SearchBar({
  phrase, variety = 'ALL', onSearch = () => {}, delay = 0,
}) {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      phrase: phrase || '',
      variety: variety || '',
    },
  });

  const submitHandler = (values) => {
    if (!values.phrase) return;
    onSearch(values);
    setTimeout(() => {
      navigate({
        pathname: '/videos',
        search: createSearchParams(values).toString(),
      });
    }, delay);
  };

  return (
    <Box miw={800} mx="auto">
      <form onSubmit={form.onSubmit((values) => submitHandler(values))}>
        <Grid gutter={6} justify="center" align="flex-end">
          <Grid.Col span="auto">
            <TextInput size="50" placeholder="Search for..." {...form.getInputProps('phrase')} />
          </Grid.Col>
          <Grid.Col span="content">
            <ActionIcon
              variant="gradient"
              size={50}
              aria-label="Search"
              color="primary"
              type="submit"
            >
              <IconSearch style={{ width: '60%', height: '60%' }} />
            </ActionIcon>
          </Grid.Col>
        </Grid>
        <Grid justify="center" align="flex-end">
          <Grid.Col span="content">
            <SegmentedControl
              size="sm"
              data={[
                { label: '🌎 All', value: 'ALL' },
                { label: '🇬🇧 UK', value: 'UK' },
                { label: '🇺🇸 US', value: 'US' },
                { label: '🇦🇺 AUS', value: 'AUS' },
              ]}
              {...form.getInputProps('variety')}
            />
          </Grid.Col>
        </Grid>
      </form>
    </Box>
  );
}

export default SearchBar;
