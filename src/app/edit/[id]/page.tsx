'use client'
import { useState, useEffect } from 'react';
import { Box, Card, CardMedia, Grid, Paper, styled } from "@mui/material";
import ImageGallery from 'react-image-gallery';
import { Reorder } from 'framer-motion';

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
    <ContainerBox component='main' className='h-dvh flex overflow-hidden'>
      <Grid container>
        <Grid item md={10}>
          <ImageGallery
            infinite
            showPlayButton={false}
            showBullets
            showThumbnails={false}
            showFullscreenButton={false}
            items={thumbnails} />
        </Grid>

        <Grid item md={2} className='h-full overflow-auto'>
          <Paper className='p-2 h-full'>
            <Reorder.Group
              axis='y'
              layoutScroll
              values={thumbnails}
              onReorder={setThumbnails}
            >
              {thumbnails.map((item) => (
                <Reorder.Item className='mb-2' key={item.contentUrl} value={item}>
                  <Card>
                    <CardMedia
                      draggable={false}
                      component='img'
                      image={item.contentUrl}
                    />
                  </Card>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </Paper>
        </Grid>
      </Grid>
    </ContainerBox>
  );
}
