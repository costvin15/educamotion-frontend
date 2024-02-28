'use client'
import { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Grid, Typography, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

import client from '@/client';

type Slide = {
  objectId: string;
};

type Presentation = {
  presentationId: string;
  title: string;
  slides: Slide[];
};

type PresentationThumbnail = {
  contentUrl: string;
  width: number;
  height: number;
};

async function getPresentationDetails(presentationId: string) {
  const { data } = await client.get(`/slides/${presentationId}`);
  return data;
}

async function getAllThumbnails(presentationId: string) {
  const { data } = await client.get(`/slides/thumbnails/${presentationId}`);
  return data;
}

const ContainerBox = styled(Box)(() => ({
  flexGrow: 1,
  paddingTop: 0,
  padding: '24px',
}));

export default function Home({ params }: { params: { id: string } }) {
  const [presentation, setPresentation] = useState({} as Presentation);
  const [thumbnails, setThumbnails] = useState([] as PresentationThumbnail[]);

  useEffect(() => {
    (async () => {
      const presentationDetails = await getPresentationDetails(params.id);
      setPresentation(presentationDetails);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const thumbnails = await getAllThumbnails(params.id);
      setThumbnails(thumbnails);
    })();
  }, []);

  return (
    <ContainerBox component='main'>
      <Grid container>
        <Grid item md={8} p={1}>
          <img width='100%' src={thumbnails[0]?.contentUrl} alt='' />
        </Grid>
        <Grid item md={4} p={1}>
          <Typography variant='h4' fontWeight='bold'>{presentation.title}</Typography>
          <Grid container justifyContent='flex-end'>
            <ButtonGroup variant='contained'>
              <Button><b>Resultados</b></Button>
              <Button><b>Apresentar</b></Button>
              <Button><b>Editar</b></Button>
            </ButtonGroup>           
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        {presentation.slides?.map((slide, index) => {
          return (
            <Grid key={index} item md={4} p={1}>
              <img width='100%' src={thumbnails[index]?.contentUrl} referrerPolicy='no-referrer' />
            </Grid>
          );
        })}
      </Grid>
    </ContainerBox>
  )
};
