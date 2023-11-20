'use client'
import React from 'react';
import { Box, Button, CssBaseline, Grid, IconButton, Stack, ThemeProvider, Toolbar, Typography, createTheme, styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import InboxIcon from '@mui/icons-material/Inbox';
import CircleIcon from '@mui/icons-material/Circle';
import Drawer from '@/app/home/components/Drawer';

const drawerWidth = 80;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#09090B',
      paper: '#09090B'
    }
  },
});

const RoundedButton = styled(Button)(({theme, ...props}) => ({
  color: 'white',
  backgroundColor: (props.variant == 'contained' ? '#4A4458' : ''),
  borderRadius: 100,
  paddingLeft: 24,
  paddingTop: 10,
  paddingBottom: 10,
  textTransform: 'none',
  justifyContent: 'left',
  marginBottom: '5px'
}));

export default function Home() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{display: 'flex'}}>
        <CssBaseline />
        <Drawer />

        <Grid container>
          <Grid item md={3}>
            <Grid item md={12}>
              <Toolbar>
                <Typography variant='h5'>
                  Início
                </Typography>
              </Toolbar>
            </Grid>
            <Grid item md={12}>
              <Box component='main' sx={{flexGrow: 1, bgcolor: 'background.default', p: 3, pt: 0}}>
                <Grid>
                  <Grid item md={12}>
                    <Stack>
                      <Typography variant='body2' paddingTop='20px' paddingBottom='20px'>Apresentações</Typography>
                      <RoundedButton startIcon={<CircleIcon style={{width: '12px', height: '12px'}} />} variant='contained'>
                        <Typography fontSize='14px'>Apresentação 1</Typography>
                      </RoundedButton>
                      <RoundedButton startIcon={<CircleIcon style={{width: '12px', height: '12px'}} />}>
                        <Typography fontSize='14px'>Apresentação 2</Typography>
                      </RoundedButton>
                      <RoundedButton startIcon={<CircleIcon style={{width: '12px', height: '12px'}} />}>
                        <Typography fontSize='14px'>Apresentação 3</Typography>
                      </RoundedButton>
                      <RoundedButton startIcon={<CircleIcon style={{width: '12px', height: '12px'}} />}>
                        <Typography fontSize='14px'>Apresentação 4</Typography>
                      </RoundedButton>
                      <RoundedButton startIcon={<CircleIcon style={{width: '12px', height: '12px'}} />}>
                        <Typography fontSize='14px'>Apresentação 5</Typography>
                      </RoundedButton>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}
