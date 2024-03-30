'use client'
import { useState, useEffect } from 'react';
import { Box, Card, CardMedia, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import SaveIcon from '@mui/icons-material/Save';

import ImageGallery from 'react-image-gallery';
import { Reorder } from 'framer-motion';

import 'react-image-gallery/styles/css/image-gallery.css';

import client from '@/client';

type Slide = {
  objectId: string;
  original: string;
};

type Presentation = {
  presentationId: string;
  title: string;
  totalSlides: number;
  slides: Slide[];
};

async function getPresentationDetails(presentationId: string) : Promise<Presentation> {
  const { data } = await client.get(`/presentation/${presentationId}`);
  return data;
}

async function getThumbnail(presentationId: string, slideId: string) : Promise<Slide> {
  const response = await client.get(`/presentation/thumbnail/${presentationId}/${slideId}`, { responseType: 'arraybuffer' });
  const blob = new Blob([response.data], { type: 'image/png' });
  return {
    objectId: slideId,
    original: URL.createObjectURL(blob),
  };
}

export default function Edit({ params }: { params: { id: string } }) {
  const [presentation, setPresentation] = useState({} as Presentation);
  const [images, setImages] = useState([] as Slide[]);

  useEffect(() => {
    if (params.id) {
      (async () => {
        const presentation = await getPresentationDetails(params.id);
        setPresentation(presentation);
      })();
    }
  }, [params.id]);

  useEffect(() => {
    if (presentation.totalSlides > 0) {
      (async () => {
        const images = await Promise.all(presentation.slides.map(async (slide) => {
          return await getThumbnail(presentation.presentationId, slide.objectId);
        }));
        setImages(images);
      })();
    }
  }, [presentation.slides]);

  return (
    <Box className='flex h-screen flex-col'>
      <Toolbar>
        <Typography>
          {presentation.title}
        </Typography>
        <Box className='flex-grow' />
        <Box>
          <IconButton size='large'>
            <AddIcon />
          </IconButton>

          <IconButton size='large'>
            <SlideshowIcon />
          </IconButton>

          <IconButton size='large'>
            <SaveIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Box className='flex-1 overflow-hidden'>
        <Grid container>
          <Grid item md={10}>
            <ImageGallery
              infinite
              showPlayButton={false}
              showBullets
              showThumbnails={false}
              showFullscreenButton={false}
              items={images}
            />
          </Grid>
          <Grid item md={2} className='h-[calc(100vh-70px)] overflow-y-auto'>
            <Paper className='pr-2 mb-2 h-full'>
              <Reorder.Group
                axis='y'
                layoutScroll
                values={images}
                onReorder={setImages}
                className='list-none p-0'
              >
                {images.map((item) => (
                  <Reorder.Item className='mb-2' key={item.original} value={item}>
                    <Card>
                      <CardMedia
                        referrerPolicy='no-referrer'
                        draggable={false}
                        component='img'
                        image={item.original}
                      />
                    </Card>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
