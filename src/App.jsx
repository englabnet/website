import React from 'react';
import '@mantine/core/styles.css';
import { AppShell, MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import AppHeader from './components/header/AppHeader.jsx';

import styled from '@emotion/styled';
import AppFooter from "./components/footer/AppFooter.jsx";

const StyledMain = styled(AppShell.Main)`
  background-color: var(--mantine-color-background);
`;

const resolver = (theme) => ({
  light: {
    '--mantine-color-background': '#ffffff',
  },
  dark: {
    '--mantine-color-background': theme.colors.dark[8],
  },
});

export default function App() {
  return (
    <BrowserRouter>
      <MantineProvider
        theme={{
          fontFamily: 'Roboto, sans-serif',
          headings: {
            fontFamily: 'Gabarito, Roboto, sans-serif'
          },
          shadows: {
            xs: '1px 1px 3px rgba(0, 0, 0, .10)',
          },
          primaryColor: 'blue',
          defaultGradient: { from: 'blue.6', to: 'blue.4' },
          defaultRadius: 'md',
        }}
        cssVariablesResolver={resolver}
      >
        <AppShell header={{ height: 60 }} footer={{ height: 60 }}>
          <AppHeader />
          <StyledMain>
            <Router />
          </StyledMain>
          <AppFooter />
        </AppShell>
      </MantineProvider>
    </BrowserRouter>
  );
}
