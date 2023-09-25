import React from 'react';
import { Stack, Text, useMantineColorScheme } from '@mantine/core';

function SubtitleBlock({ subtitles, currentTime }) {
  const { colorScheme } = useMantineColorScheme();
  const binarySearchByTime = (time, segments) => {
    let low = 0;
    let high = segments.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const segment = segments[mid];

      if (segment.startTime <= time && time <= segment.endTime) {
        return { prev: segments[mid - 1], current: segment, next: segments[mid + 1] };
      }
      if (segment.startTime > time) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    // We found nothing, so let's pick the closest segment.
    const segment = segments[high];
    return { prev: segments[high - 1], current: segment, next: segments[high + 1] };
  };

  const segment = binarySearchByTime(currentTime, subtitles);

  const currentSegmentColor = colorScheme === 'dark' ? 'blue.3' : 'blue.6';
  const closeSegmentColor = colorScheme === 'dark' ? 'blue.8' : 'blue.3';

  return (
    <Stack align="center" style={{ gap: '10px' }} pt="25px" pb="10px">
      {segment ? (
        <>
          <Text size="xl" mih={31} color={closeSegmentColor}>{segment.prev ? segment.prev.text : null}</Text>
          <Text size="xl" mih={31} fw={500} color={currentSegmentColor}>{segment.current.text}</Text>
          <Text size="xl" mih={31} color={closeSegmentColor}>{segment.next ? segment.next.text : null}</Text>
        </>
      ) : null}
    </Stack>
  );
}

export default SubtitleBlock;
