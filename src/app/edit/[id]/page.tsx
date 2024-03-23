'use client'
import { useState, useEffect } from 'react';
import { Box, Grid, Toolbar, Typography, styled } from "@mui/material";
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

export default function Edit({ params }: { params: { id: string } }) {
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
        <Grid item>
          <Toolbar>
            <Typography variant='h5'>
              Editando {presentation.title}
            </Typography>
          </Toolbar>
        </Grid>

        <Grid item width={'100%'}>
          <ImageGallery
            infinite
            showPlayButton={false}
            showBullets
            showThumbnails={false}
            showFullscreenButton={false}
            items={thumbnails} />
        </Grid>
      </Grid>
    </ContainerBox>
  );
}
