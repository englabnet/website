import React from 'react';
import {
  ActionIcon, Box, Center, Grid, Input, SegmentedControl,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
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
    <Box miw={700} mx="auto">
      <form onSubmit={form.onSubmit((values) => submitHandler(values))}>
        <Center>
          <Input
            w="100%"
            size="lg"
            placeholder="Search for..."
            radius="xl"
            {...form.getInputProps('phrase')}
            rightSectionWidth={54}
            rightSectionPointerEvents="all"
            rightSection={(
              <ActionIcon
                size={50}
                w={50}
                aria-label="Search"
                variant="transparent"
                type="submit"
                radius="xl"
              >
                <IconSearch style={{ width: '50%', height: '50%' }} />
              </ActionIcon>
            )}
          />
        </Center>
        <Grid justify="center" align="flex-end">
          <Grid.Col span="content">
            <SegmentedControl
              size="sm"
              data={[
                { label: '🌎 All', value: 'ALL' },
                { label: '🇬🇧 UK', value: 'UK' },
                { label: '🇺🇸 US', value: 'US' },
                // { label: '🇦🇺 AUS', value: 'AUS' },
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
