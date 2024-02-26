'use client'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getProviders, signIn, } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import { Box, Button, CssBaseline, Grid, Paper, TextField, ThemeProvider, Typography, createTheme, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#09090B',
      paper: '#09090B'
    },
    text: {
      primary: '#000'
    },
  },
});

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

export default function Login({ providers } : InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
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
                  {Object.values(providers).map(provider => (
                    <Box paddingBottom={2} key={provider.id}>
                      <LoginButton onClick={() => { console.log('Hi!'); signIn(provider.id); }} variant='contained'>Entrar com {provider.name}</LoginButton>
                    </Box>
                  ))}
                  {/* <Typography variant='h5'><strong>Bem vindo!</strong></Typography>
                  <Typography variant='caption' color={grey[800]}><strong>Por favor, insira seus dados</strong></Typography>

                  <Box paddingTop={5}>
                    <TextField label='Email' variant='standard' sx={{width: '100%'}} />
                  </Box>
                  <Box paddingTop={1.5} paddingBottom={3}>
                    <TextField label='Password' variant='standard' sx={{width: '100%'}} />
                  </Box>

                  <Box paddingBottom={2}>
                    <LoginButton variant='contained'>Entrar</LoginButton>
                  </Box> */}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </CenteredBox>
    </ThemeProvider>
  )
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: '/dashboard' } };
  }

  const providers = await getProviders();
  return {
    props: { providers: providers ?? [] },
  };
}
