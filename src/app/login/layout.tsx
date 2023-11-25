'use client'
import React from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#09090B',
      paper: '#09090B'
    },
    text: {
      primary: '#000'
    }
  },
});

export default function HomeLayout({ children } : {children: React.ReactNode}) {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box>
        <CssBaseline />
        { children }
      </Box>
    </ThemeProvider>
  )
}
