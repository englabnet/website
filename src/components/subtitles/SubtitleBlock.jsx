import React, { memo } from 'react';
import {
  Mark, Stack, Text, useMantineColorScheme,
} from '@mantine/core';
import FadingText from "./FadingText.jsx";

function SubtitleBlock({ subtitles, currentTime }) {
  const { colorScheme } = useMantineColorScheme();

  const getText = (segment) => {
    if (!segment) return null;
    return segment.text;
  };

  const binarySearchByTime = (time, segments) => {
    let low = 0;
    let high = segments.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const segment = segments[mid];

      if (segment.startTime <= time && time <= segment.endTime) {
        return {
          prev: getText(segments[mid - 1]),
          current: getText(segment),
          next: getText(segments[mid + 1]),
        };
      }
      if (segment.startTime > time) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    // We found nothing, so let's pick the closest segment.
    return {
      prev: getText(segments[low - 1]),
      current: getText(segments[low]),
      next: getText(segments[low + 1]),
    };
  };

  const prepareText = (text) => {
    if (!text) return null;
    return text.map((t, i) => {
      if (i % 2) {
        // eslint-disable-next-line react/no-array-index-key
        return <Mark key={i}>{t}</Mark>;
      }
      return t;
    });
  };

  const text = binarySearchByTime(currentTime, subtitles);

  const currentSegmentColor = colorScheme === 'dark' ? 'blue.3' : 'blue.6';
  const closeSegmentColor = colorScheme === 'dark' ? 'blue.8' : 'blue.3';

  return (
    <Stack align="center" gap="5px" justify="flex-start" mb="10px" mt="5px" mx="20px" mih={130}>
      {text ? (
        <>
          <FadingText c={closeSegmentColor}>
            {prepareText(text.prev)}
          </FadingText>
          <Text
            size="lg"
            ta="center"
            mih={30}
            fw={500}
            c={currentSegmentColor}
          >
            {prepareText(text.current)}
          </Text>
          <FadingText truncateEnd c={closeSegmentColor}>
            {prepareText(text.next)}
          </FadingText>
        </>
      ) : null}
    </Stack>
  );
}

function areEqual(prevProps, nextProps) {
  // Return true if props are equal, otherwise return false
  return prevProps.currentTime === nextProps.currentTime;
}

export default memo(SubtitleBlock, areEqual);
