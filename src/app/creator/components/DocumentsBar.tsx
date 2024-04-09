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

const SectionTitle = styled(Typography)(() => ({
  flexGrow: 1,
  paddingTop: '20px',
  paddingBottom: '20px'
}));

const DotIcon = styled(CircleIcon)(() => ({
  width: '12px',
  height: '12px'
}));

const ContainerBox = styled(Box)(() => ({
  flexGrow: 1,
  padding: '24px',
  paddingTop: 0,
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
        <ContainerBox component='main'>
          <Grid container>
            <Grid item md={12}>
              <SectionTitle variant='body2'>Apresentações recentemente editadas</SectionTitle>
              <Stack>
                {presentations.map((presentation) => (
                  <RoundedButton key={presentation.id} startIcon={<DotIcon />}>
                    <Typography className='text-ellipsis w-9/12 whitespace-nowrap overflow-hidden text-start'>{presentation.name}</Typography>
                  </RoundedButton>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </ContainerBox>
      </Grid>
    </Grid>
  );
}
