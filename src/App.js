import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './App.css';
import Layout from './Layout'

const font = { fontFamily: 'Roboto Mono, monospace' }

const theme = createTheme({
  typography: {
    h1: font,
    h2: font,
    h3: font,
    h4: font,
    h5: font,
    h6: font,
  },
});

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ThemeProvider theme={theme}>
          <Layout />
          <ReactQueryDevtools initialIsOpen position='bottom-right' />
        </ThemeProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
