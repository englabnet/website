import React, { useState } from 'react';
import { AppShell, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';

export default function App() {
  const [colorScheme, setColorScheme] = useState(localStorage.getItem('theme') || 'light');
  const toggleColorScheme = () => {
    const theme = colorScheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    setColorScheme(theme);
  };
  return (
    <BrowserRouter>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          theme={{
            colorScheme,
            primaryColor: 'blue',
            primaryShade: 5,
            defaultGradient: { from: 'blue.6', to: 'blue.4' },
            defaultRadius: 'md',
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
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
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
    </BrowserRouter>
  );
}
