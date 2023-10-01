import React from 'react';
import {
  Mark, Stack, Text, useMantineColorScheme,
} from '@mantine/core';
import styled from 'styled-components';

const StyledText = styled(Text)`
  white-space: nowrap;
  max-width: 720px;
  overflow: hidden;
  display: inline-flex;
  gap: 4px;
`;

const TopText = styled(StyledText)`
  justify-content: flex-end;
  gap: 4px;

  ${(props) => props.isLong && `
    mask-image: linear-gradient(to right, transparent, white 20px);
  `}
`;

const BottomText = styled(Text)`
  justify-content: flex-start;
  gap: 4px;

  ${(props) => props.isLong && `
    mask-image: linear-gradient(to left, transparent, white 20px);
  `}
`;

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

  const isLong = (text) => text && text.join().length > 80;

  const text = binarySearchByTime(currentTime, subtitles);

  const currentSegmentColor = colorScheme === 'dark' ? 'blue.3' : 'blue.6';
  const closeSegmentColor = colorScheme === 'dark' ? 'blue.8' : 'blue.3';

  return (
    <Stack align="center" justify="center" style={{ gap: '5px' }} pt="20px" pb="10px" px="20px" mih={150}>
      {text ? (
        <>
          <TopText
            size="lg"
            ta="center"
            lineClamp={1}
            color={closeSegmentColor}
            isLong={isLong(text.prev)}
          >
            {prepareText(text.prev)}
          </TopText>
          <Text
            size="lg"
            ta="center"
            fw={500}
            color={currentSegmentColor}
          >
            {prepareText(text.current)}
          </Text>
          <BottomText
            size="lg"
            ta="center"
            lineClamp={1}
            color={closeSegmentColor}
            isLong={isLong(text.next)}
          >
            {prepareText(text.next)}
          </BottomText>
        </>
      ) : null}
    </Stack>
  );
}

export default SubtitleBlock;
