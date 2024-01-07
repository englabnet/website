import React from "react";
import { ActionIcon, CopyButton, Group, rem, TextInput, Tooltip } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";

function Clipboard({ link, description }) {
  return (
    <Group gap={0} grow mb={20}>
      <TextInput
        value={link}
        size="lg"
        description={description}
        rightSection={
        <CopyButton value={link} timeout={2000} size="xl">
          {({ copied, copy }) => (
            <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
              <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy} size="xl">
                {copied ? (
                  <IconCheck style={{ width: rem(32) }} />
                ) : (
                  <IconCopy style={{ width: rem(32) }} />
                )}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      }
      />
    </Group>
  );
}

export default Clipboard;
