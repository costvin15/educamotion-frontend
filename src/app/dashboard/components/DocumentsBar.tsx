'use client'
import {useState, useEffect} from 'react';

import { Circle as CircleIcon } from '@mui/icons-material';
import { Box, Button, Grid, Stack, Toolbar, Typography, styled } from '@mui/material';

import client from '@/client';

type Presentation = {
  id: string;
  name: string;
}

type Presentations = {
  nextPageToken: string;
  files: Presentation[];
}

const backgroundColorWhenSelected = '#4A4458';
const backgroundColorWhenUnselected = 'none';

const RoundedButton = styled(Button)(({variant}) => ({
  color: 'white',
  paddingTop: 10,
  paddingLeft: 24,
  paddingBottom: 10,
  borderRadius: 100,
  textTransform: 'none',
  justifyContent: 'left',
  marginBottom: '5px',
  backgroundColor: (variant == 'contained' ? backgroundColorWhenSelected : backgroundColorWhenUnselected)
}));

async function fetchRecentAvailablePresentations() : Promise<Presentations> {
  const { data } = await client.get('/presentation');
  return data;
}

export default function DocumentsBar() {
  const [presentations, setPresentations] = useState([] as Presentation[]);

  useEffect(() => {
    (async () => {
      const presentations = await fetchRecentAvailablePresentations();
      setPresentations(presentations.files.slice(0, 9));
    })();
  }, []);

  return (
    <Grid container direction='column'>
      <Grid item>
        <Toolbar>
          <Typography variant='h5'>
            Início
          </Typography>
        </Toolbar>
      </Grid>

      <Grid item>
        <Box className='flex-grow'>
          <Grid container>
            <Grid item md={12}>
              <Typography className='flex-grow pl-6 pt-5 pb-5' variant='body2'>Apresentações recentemente editadas</Typography>
              <Stack>
                {presentations.map((presentation) => (
                  <Button
                    className='text-white normal-case ml-6 mr-6 pt-3 pl-6 pb-3 rounded-3xl justify-start mb-1'
                    key={presentation.id}
                    startIcon={<CircleIcon className='w-3 h-3' />}
                  >
                    <Typography className='text-ellipsis w-9/12 whitespace-nowrap overflow-hidden text-start'>{presentation.name}</Typography>
                  </Button>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
