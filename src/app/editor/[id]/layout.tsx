'use client'
import React from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { SessionProvider } from 'next-auth/react';
import Drawer from '@/app/creator/components/Drawer';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#09090B',
      paper: '#09090B'
    }
  },
});

export default function EditLayout({ children } : { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider theme={darkTheme}>
        <Box className='flex'>
          <CssBaseline />
          <Drawer />

          <Box className='w-full'>
            { children }
          </Box>
        </Box>
      </ThemeProvider>
    </SessionProvider>
  );
}