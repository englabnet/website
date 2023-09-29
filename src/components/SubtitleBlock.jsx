import React from 'react';
import {
  Mark, Stack, Text, useMantineColorScheme,
} from '@mantine/core';

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
    return { prev: segments[low - 1], current: segments[low], next: segments[low + 1] };
  };

  const prepareText = (segment) => {
    if (!segment) return null;
    return segment.text.map((text, index) => {
      if (index % 2) {
        return <Mark>{text}</Mark>;
      }
      return text;
    });
  };

  const segments = binarySearchByTime(currentTime, subtitles);

  const currentSegmentColor = colorScheme === 'dark' ? 'blue.3' : 'blue.6';
  const closeSegmentColor = colorScheme === 'dark' ? 'blue.8' : 'blue.3';

  return (
    <Stack align="center" style={{ gap: '10px' }} pt="25px" pb="10px" px="50px">
      {segments ? (
        <>
          <Text size="xl" mih={31} ta="center" inline color={closeSegmentColor}>{prepareText(segments.prev)}</Text>
          <Text size="xl" mih={31} ta="center" inline fw={500} color={currentSegmentColor}>{prepareText(segments.current)}</Text>
          <Text size="xl" mih={31} ta="center" inline color={closeSegmentColor}>{prepareText(segments.next)}</Text>
        </>
      ) : null}
    </Stack>
  );
}

export default SubtitleBlock;
