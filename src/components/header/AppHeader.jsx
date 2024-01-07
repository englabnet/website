import React from 'react';
import {
  AppShell, Text, Group, useMantineColorScheme, ActionIcon, Divider, em, Burger, Drawer, UnstyledButton,
} from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import classes from './AppHeader.module.css';
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const links = [
  { link: '/', label: 'Search' },
  // { link: '/spelling', label: 'Spelling' },
  { link: '/feedback', label: 'Feedback' },
  { link: '/about', label: 'About' },
];

export default function AppHeader() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const isMobile = useMediaQuery(`(max-width: ${em(800)})`);
  const [menuOpened, menuHandlers] = useDisclosure();

  const items = links.map((link) => (
    <Link
      className={classes.link}
      key={link.label}
      to={link.link}
      onClick={menuHandlers.close}
    >
      {link.label}
    </Link>
  ));

  return (
    <AppShell.Header p="sm" height="56px" className={classes.header}>
      <Drawer.Root opened={menuOpened} onClose={menuHandlers.close} position="right">
        <Drawer.Overlay backgroundOpacity={0.5} blur={4} />
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title style={{ fontSize: "x-large" }}>Menu</Drawer.Title>
            <Drawer.CloseButton />
          </Drawer.Header>
          <Drawer.Body style={{ fontSize: "x-large" }}>
            {items}
            <UnstyledButton
              w="100%"
              className={classes.link}
              onClick={toggleColorScheme}
              style={{ fontSize: "x-large" }}
            >
              Switch theme
            </UnstyledButton>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
      <Group justify="space-between">
        <Link className={classes.logo} to="/">
          <Text
            size="xl"
            fw={900}
            variant="gradient"
          >
            englab
          </Text>
        </Link>
        <Group gap="xs">
          {isMobile ?
            (<Burger opened={menuOpened} onClick={menuHandlers.toggle} aria-label="Toggle navigation" />) :
            (<>
              {items}
              <Divider orientation="vertical" />
              <ActionIcon
                variant="default"
                color="gray"
                onClick={toggleColorScheme}
                title="Toggle color scheme"
              >
                {dark ? <IconSun size={18} color="gray" /> : <IconMoonStars size={18} color="gray" />}
              </ActionIcon>
            </>
          )}
        </Group>
      </Group>
    </AppShell.Header>
  );
}
