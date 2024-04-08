'use client'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getProviders, signIn, } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import Head from 'next/head';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import { Box, Button, CssBaseline, Grid, Paper, ThemeProvider, Typography, createTheme, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

import EducamotionLogo from '@/images/educamotion-widelogo.png';
import Image from 'next/image';

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

const HighlightedBox = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  backgroundImage: 'url("/static/images/student-computer-learning.jpg")',
  backgroundSize: 'cover',
  borderRadius: '35px',
  marginRight: '10px'
}));

export default function Login({ providers } : InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Head>
        <title>Fazer login em EducaMotion</title>
      </Head>

      <CenteredBox>
        <Paper sx={{width: '70vw', bgcolor: grey['300'], borderRadius: '35px'}}>
          <Grid container paddingRight='10px'>
            <Grid item xs={8} height={'70vh'} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <HighlightedBox>
              </HighlightedBox>
            </Grid>
            <Grid item marginTop='10px' marginBottom='10px' xs={4}>
              <Paper sx={{bgcolor: 'white', height: '100%', borderRadius: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <Image height={35} style={{ marginBottom: '40px'}} src={EducamotionLogo} alt='EducaMotion' />
                <Box padding={'10px'} sx={{textAlign: 'center'}}>

                  {Object.values(providers).map(provider => (
                    <Box paddingBottom={2} key={provider.id}>
                      <LoginButton onClick={() => { signIn(provider.id); }} variant='contained'>Entrar com Google</LoginButton>
                    </Box>
                  ))}
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
    return { redirect: { destination: '/' } };
  }

  const providers = await getProviders();
  return {
    props: { providers: providers ?? [] },
  };
}
