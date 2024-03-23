'use client'
import { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Grid, Toolbar, Typography, styled } from '@mui/material';

import 'react-image-gallery/styles/css/image-gallery.css';

import client from '@/client';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const handleEditButton = () => {
    router.push(`/edit/${params.id}`);
  };

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
          <img width='100%' src={thumbnails[0]?.contentUrl} alt='' />
        </Grid>
        <Grid item md={4} p={1}>
          <Typography variant='h4' fontWeight='bold'>{presentation.title}</Typography>
          <Grid container justifyContent='flex-end'>
            <ButtonGroup variant='contained'>
              <Button><b>Resultados</b></Button>
              <Button><b>Apresentar</b></Button>
              <Button onClick={handleEditButton}><b>Editar</b></Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item md={12}>
          <Toolbar>
            <Typography variant='h5'>
              Páginas da apresentação
            </Typography>
          </Toolbar>
        </Grid>
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
