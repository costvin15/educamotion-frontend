'use client'
import { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Grid, Typography, styled } from '@mui/material';
import ImageGallery from 'react-image-gallery';

import 'react-image-gallery/styles/css/image-gallery.css';

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
  original: string;
  width: number;
  height: number;
};

const ContainerBox = styled(Box)(() => ({
  flexGrow: 1,
  paddingTop: 0,
  padding: '24px',
}));

async function getPresentationDetails(presentationId: string) {
  const { data } = await client.get(`/presentation/${presentationId}`);
  return data;
}

async function getAllThumbnails(presentationId: string) {
  const { data } = await client.get(`/presentation/thumbnails/${presentationId}`);
  return data;
}

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
      const thumbnails : PresentationThumbnail[] = await getAllThumbnails(params.id);
      thumbnails.map((thumbnail) => {
        thumbnail.original = thumbnail.contentUrl;
      });
      setThumbnails(thumbnails);
    })();
  }, []);

  return (
    <ContainerBox component='main'>
      <Grid container>
        <Grid item md={8} p={1}>
          <ImageGallery
            infinite
            showBullets
            showPlayButton={false}
            showThumbnails={false}
            showFullscreenButton={false}
            items={thumbnails} />
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
    </ContainerBox>
  )
};
