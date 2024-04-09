import { Button, Grid, Typography } from '@mui/material';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import Link from 'next/link';

moment.locale('pt-br');

export default function Home() {
  return (
    <Grid className='m-0 p-0' container>
      <Grid className='h-dvh flex items-center justify-center' item xs={6}>
        <div className='flex flex-col items-center'>
          <Typography>Assistir uma apresentação</Typography>
          <Link href='spectate'>
            <Button variant='contained'>
              Entrar como espectador
            </Button>
          </Link>
        </div>
      </Grid>
      <Grid className='h-dvh flex items-center justify-center bg-black text-white' item xs={6}>
        <div className='flex flex-col items-center'>
          <Typography>Gerenciar suas apresentações</Typography>
          <Link href='creator'>
            <Button variant='contained'>
              Entrar como criador
            </Button>
          </Link>
        </div>
      </Grid>
    </Grid>
  );
}
