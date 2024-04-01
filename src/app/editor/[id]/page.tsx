'use client'
import { useState, useEffect } from 'react';
import { Box, Card, CardMedia, Grid, IconButton, Paper, Skeleton, Snackbar, Toolbar, Typography } from '@mui/material';

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
  const [slides, setSlides] = useState([] as Slide[]);
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (params.id) {
      (async () => {
        console.log('Fetching presentation')
        const presentation = await getPresentationDetails(params.id);
        setPresentation(presentation);
      })();
    }
  }, []);

  useEffect(() => {
    if (presentation.totalSlides > 0) {
      (async () => {
        var progress = 0;
        const images = await Promise.all(presentation.slides.map(async (slide) => {
          const result = await getThumbnail(presentation.presentationId, slide.objectId);
          progress += 1;
          setProgress(progress / presentation.totalSlides * 100);
          return result;
        }));
        setSlides(images);
        setLoading(false);
      })();
    }
  }, [presentation]);

  const savePresentation = async (presentation: Presentation, slides: Slide[]) => {
    await client.put(`/presentation/update/${presentation.presentationId}`, {
      slides: slides.map((slide) => slide.objectId),
    });
    setSavedSuccessfully(true);
  }

  return (
    <Box className='flex h-screen flex-col'>
      <Snackbar
        open={savedSuccessfully}
        autoHideDuration={5000}
        message='Apresentação salva com sucesso'
        onClose={() => setSavedSuccessfully(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} />
      <Toolbar>
        {loading && (
          <Skeleton variant='text' className='w-96' />
        )}

        {!loading && (
          <Typography>{presentation.title}</Typography>
        )}
        <Box className='flex-grow' />
        <Box>
          <IconButton size='large'>
            <AddIcon />
          </IconButton>

          <IconButton size='large'>
            <SlideshowIcon />
          </IconButton>

          <IconButton size='large' onClick={() => savePresentation(presentation, slides)}>
            <SaveIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Box className='flex-1 overflow-hidden'>
        <Grid container>
          <Grid item md={10}>
            {loading && (
              <Skeleton
                className='h-full mx-5'
                variant='rectangular' />
            )}

            {!loading && (
              <ImageGallery
                infinite
                showPlayButton={false}
                showBullets
                showThumbnails={false}
                showFullscreenButton={false}
                items={slides}
              />
            )}
          </Grid>

          {loading && (
            <Grid item md={2} className='h-[calc(100vh-70px)]'>
              <Paper className='pr-2 mb-2 h-full'>
                {Array.from({ length: 10 }).map((_, index) => (
                  <Skeleton key={index} variant='rounded' className='h-36 mb-2' />
                ))}
              </Paper>
            </Grid>
          )}

          {!loading && (
            <Grid item md={2} className='h-[calc(100vh-70px)] overflow-y-auto'>
              <Paper className='pr-2 mb-2 h-full'>
                <Reorder.Group
                  axis='y'
                  layoutScroll
                  values={slides}
                  onReorder={setSlides}
                  className='list-none p-0'
                >
                  {slides.map((item) => (
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
          )}
        </Grid>
      </Box>
    </Box>
  );
}
