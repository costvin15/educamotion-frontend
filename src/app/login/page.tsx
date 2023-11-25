'use client'
import { Box, Grid, Paper, Stack, Typography, styled } from '@mui/material';
import axios from 'axios';
import { cookies } from 'next/headers';
import Script from 'next/script';
import { useEffect } from 'react';

declare global {
  interface Window {
    handleLogin?: any;
  }
}

type AuthenticationResponse = {
  data: {
    access_token: string;
    refresh_token: string;
  }
}

const handleLogin = async (response: any) => {
  const result : AuthenticationResponse = await axios.post('http://localhost:8080/api/v1/auth/social', {
    credential: response['credential']
  });
}

export default function Login() {
  useEffect(() => {
    window.handleLogin = handleLogin;
  }, []);

  return (
    <>
      <Script src='https://accounts.google.com/gsi/client' async />
      <Box sx={{position: 'absolute', left: '50%', top: '50%', '-webkit-transform': 'translate(-50%, -50%)', transform: 'translate(-50%, -50%)'}}>
        <Paper sx={{width: '70vw', bgcolor: 'white'}}>
          <Grid container>
            <Grid item xs={8}>
              <Typography>Content</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>Content</Typography>
              <div id='g_id_onload'
                data-client_id='698436229095-u3a72pu9kkva44u20947smbfokac4evd.apps.googleusercontent.com'
                data-context='signin'
                data-ux_mode='popup'
                data-callback='handleLogin'
                data-auto_prompt='false'>
              </div>

              <div className='g_id_signin'
                data-type='standard'
                data-shape='pill'
                data-theme='filled_blue'
                data-text='signin_with'
                data-size='large'
                data-logo_alignment='left'>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  )
}
