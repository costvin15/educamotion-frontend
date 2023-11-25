'use client'
import { useEffect } from 'react';
import Script from 'next/script';
import { Box, Button, Grid, Paper, TextField, Typography, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

import { useCookies } from 'next-client-cookies';
import { authenticate } from '@/client';
import { useRouter } from 'next/navigation';

const CenteredBox = styled(Box)(() => ({
  position: 'absolute',
  left: '50%', top: '50%',
  WebkitTransform: 'translate(-50%, -50%)',
  transform: 'translate(-50%, -50%)',
}));

const LoginButton = styled(Button)(() => ({
  borderRadius: '25px',
  backgroundColor: 'black',
  width: '100%',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: grey[900]
  }
}));

declare global {
  interface Window {
    handleLogin?: any;
  }
}

export default function Login() {
  const cookies = useCookies();
  const router = useRouter();

  const handleLogin = async (response: any) => {
    console.log('Hello!');

    const authenticationData = await authenticate(response['credential']);

    cookies.set('is_logged', '1');
    cookies.set('access_token', authenticationData.access_token);
    cookies.set('refresh_token', authenticationData.refresh_token);

    console.log(cookies.get());
    router.push('/home');
  };

  useEffect(() => {
    window.handleLogin = handleLogin;
  });

  return (
    <>
      <Script src='https://accounts.google.com/gsi/client' async />
      <CenteredBox>
        <Paper sx={{width: '70vw', bgcolor: grey['300'], borderRadius: '35px'}}>
          <Grid container padding='10px'>
            <Grid item xs={8} height={'70vh'} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Box>
                <Typography>Content</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Paper sx={{bgcolor: 'white', height: '100%', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Box padding={'10px'} sx={{textAlign: 'center'}}>
                  <Typography variant='h5'><strong>Bem vindo!</strong></Typography>
                  <Typography variant='caption' color={grey[800]}><strong>Por favor, insira seus dados</strong></Typography>

                  <Box paddingTop={5}>
                    <TextField label='Email' variant='standard' sx={{width: '100%'}} />
                  </Box>
                  <Box paddingTop={1.5} paddingBottom={3}>
                    <TextField label='Password' variant='standard' sx={{width: '100%'}} />
                  </Box>

                  <Box paddingBottom={2}>
                    <LoginButton variant='contained'>Entrar</LoginButton>
                  </Box>

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
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </CenteredBox>
    </>
  )
}
