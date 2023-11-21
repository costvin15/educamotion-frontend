'use client'
import React from 'react';
import { Box, Button, CssBaseline, Grid, ThemeProvider, createTheme, styled } from '@mui/material';
import Drawer from '@/app/home/components/Drawer';
import DocumentsBar from './components/DocumentsBar';
import DocumentsGrid from './components/DocumentsGrid';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#09090B',
      paper: '#09090B'
    }
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{display: 'flex'}}>
        <CssBaseline />
        <Drawer />

        <Grid container>
          <Grid item md={3}>
            <DocumentsBar />
          </Grid>
          <Grid item md={9}>
            <DocumentsGrid />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}
