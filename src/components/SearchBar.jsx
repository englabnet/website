import React from 'react';
import {
  ActionIcon, Box, Center, Grid, Input, SegmentedControl,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { createSearchParams, useNavigate } from 'react-router-dom';

const varietySetting = 'variety-setting';

function getVarietySettingOrDefault(defaultValue) {
  const variety = localStorage.getItem(varietySetting);
  if (variety == null) {
    return defaultValue;
  }
  return variety;
}

function SearchBar({ phrase, variety = 'ALL', onSearch: onSubmit = () => {}, submitDelay = 0 }) {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      phrase: phrase || '',
      variety: getVarietySettingOrDefault(variety),
    },
  });

  const submitHandler = (values) => {
    if (!values.phrase) return;
    onSubmit(values);
    setTimeout(() => {
      navigate({
        pathname: '/videos',
        search: createSearchParams(values).toString(),
      });
    }, submitDelay);
  };

  return (
    <Box w={600} mx="auto">
      <form onSubmit={form.onSubmit((values) => submitHandler(values))}>
        <Center>
          <Input
            w="95%"
            size="lg"
            variant="filled"
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
        <Grid justify="center" align="flex-end" mt={10}>
          <Grid.Col span="content">
            <SegmentedControl
              size="xs"
              radius="xl"
              data={[
                { label: '🌎 All', value: 'ALL' },
                { label: '🇬🇧 UK', value: 'UK' },
                { label: '🇺🇸 US', value: 'US' },
                // { label: '🇦🇺 AUS', value: 'AUS' },
              ]}
              {...form.getInputProps('variety')}
              onChange={(value) => {
                localStorage.setItem(varietySetting, value);
                return form.getInputProps('variety').onChange(value);
              }}
            />
          </Grid.Col>
        </Grid>
      </form>
    </Box>
  );
}

export default SearchBar;
