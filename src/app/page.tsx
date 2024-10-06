'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Box, Button, Grid, TextField, Typography } from '@mui/material';

import client from '@/client';

import * as moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt-br');

type Session = {
  sessionId: string;
};

async function submitAdmittance(presentationCode: string) : Promise<Session> {
  const { data } = await client.post('/session/admittance/submit', {
    sessionCode: presentationCode
  });
  return data;
}

export default function Home() {
  const router = useRouter();
  const [presentationCode, setPresentationCode] = useState<string>('');

  async function performAdmittance() {
    if (presentationCode === '') {
      return;
    }

    const session = await submitAdmittance(presentationCode);

    router.push(`/theather/${session.sessionId}`);
  }

  return (
    <Grid className='m-0 p-0' container>
      <Grid className='h-dvh flex items-center justify-center' item xs={6}>
        <div className='flex flex-col items-center'>
          <Typography>Assistir uma apresentação</Typography>
          <Box
            component='form'
            onSubmit={event => {
              performAdmittance();
              event.preventDefault();
            }}>
            <TextField placeholder='Código da apresentação'
              onChange={event => setPresentationCode(event.target.value)} />
          </Box>
        </div>
      </Grid>
      <Grid className='h-dvh flex items-center justify-center bg-black text-white' item xs={6}>
        <div className='flex flex-col items-center'>
          <Typography>Gerenciar suas apresentações</Typography>
          <Link href='dashboard'>
            <Button variant='contained'>
              Entrar como criador
            </Button>
          </Link>
        </div>
      </Grid>
    </Grid>
  );
}
