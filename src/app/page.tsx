import { Grid } from '@mui/material';
import * as moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-br');

export default function Home() {
  return (
    <Grid className='m-0 p-0' container>
      <Grid className='h-dvh' item xs={6}>
        Assistir uma apresentação:
      </Grid>
      <Grid className='bg-black h-dvh text-white' item xs={6}>
        Gerenciar suas apresentações:
      </Grid>
    </Grid>
  );
}
