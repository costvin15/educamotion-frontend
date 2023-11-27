'use client'
import React from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Drawer from '@/app/dashboard/components/Drawer';
import { SessionProvider } from 'next-auth/react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#09090B',
      paper: '#09090B'
    }
  },
});

export default function HomeLayout({ children } : {children: React.ReactNode}) {
  return (
    <SessionProvider>
      <ThemeProvider theme={darkTheme}>
        <Box sx={{display: 'flex'}}>
          <CssBaseline />
          <Drawer />

          { children }
        </Box>
      </ThemeProvider>
    </SessionProvider>
  )
}
