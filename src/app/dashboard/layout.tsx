'use client'
import React from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Drawer from '@/app/dashboard/components/Drawer';

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
    <ThemeProvider theme={darkTheme}>
      <Box sx={{display: 'flex'}}>
        <CssBaseline />
        <Drawer />

        { children }
      </Box>
    </ThemeProvider>
  )
}
