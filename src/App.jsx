import React, { useState } from 'react';
import { AppShell, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import Router from './Router';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';

export default function App() {
  const [colorScheme, setColorScheme] = useState('light');
  const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        theme={{
          colorScheme,
          primaryColor: 'blue',
          defaultRadius: 'sm',
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <AppShell
          fixed={false}
          header={(<AppHeader />)}
          footer={(<AppFooter />)}
          styles={(theme) => ({
            main: {
              backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[1],
            },
            root: {
              height: '100%',
              display: 'flex',
              flexFlow: 'column',
            },
            body: {
              flexGrow: 1,
            },
          })}
        >
          <Router />
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
