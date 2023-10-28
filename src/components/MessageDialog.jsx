import React from "react";
import { Button, Group, Modal, Text } from "@mantine/core";
import { IconExclamationCircle, IconCircleCheck } from "@tabler/icons-react";

export default function MessageDialog({ type, message, opened, onClose }) {
  let icon = null;
  if (type === "error") {
    icon = <IconExclamationCircle size={50} color="red"/>
  } else if (type === "success") {
    icon = <IconCircleCheck size={50} color="green"/>
  }

  return(
    <Modal opened={opened} onClose={onClose} centered>
      <Group mb={20}>
        {icon}
        <Text size="md" maw={300}>
          {message}
        </Text>
      </Group>
      <Group justify="flex-end">
        <Button onClick={onClose}>Close</Button>
      </Group>
    </Modal>
  )
}
