'use client'
import { useState, useEffect } from 'react';
import { Box, Card, CardMedia, Grid, IconButton, Paper, Skeleton, Snackbar, Toolbar, Typography } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import SaveIcon from '@mui/icons-material/Save';

import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import { Reorder } from 'framer-motion';

import 'react-image-gallery/styles/css/image-gallery.css';

import client from '@/client';
import staticsImages from '@/images';
import { RenderActivity } from '@/app/activity';

import LoadingModal from '@/app/editor/[id]/modals/LoadingModal';
import AddActivityModal from '@/app/editor/[id]/modals/AddActivity';

type Slide = {
  objectId: string;
  original: string;
  renderItem?(item: ReactImageGalleryItem): React.ReactNode;
};

type Presentation = {
  presentationId: string;
  title: string;
  totalSlides: number;
  slides: Slide[];
};

type Activity = {
  presentationId: string;
  activityId: string;
  activityType: string;
  objectId: string;
};

type Activities = {
  total: number;
  activities: Activity[];
};

async function getPresentationDetails(presentationId: string) : Promise<Presentation> {
  const { data } = await client.get(`/presentation/${presentationId}`);
  return data;
}

async function getActivities(presentationId: string) : Promise<Activities> {
  const { data } = await client.get(`/activity/${presentationId}`);
  return data;
}

async function getThumbnail(presentationId: string, slideId: string) : Promise<Slide> {
  const response = await client.get(`/presentation/thumbnail/${presentationId}/${slideId}`, { responseType: 'arraybuffer' });
  const blob = new Blob([response.data], { type: 'image/png' });
  return {
    objectId: slideId,
    original: URL.createObjectURL(blob)
  };
}

export default function Edit({ params }: { params: { id: string } }) {
  const [presentation, setPresentation] = useState({} as Presentation);
  const [activities, setActivities] = useState([] as Activity[]);
  const [slides, setSlides] = useState([] as Slide[]);
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [newActivityModalOpen, setNewActivityModalOpen] = useState(false);

  useEffect(() => {
    if (params.id) {
      (async () => {
        const presentation = await getPresentationDetails(params.id);
        setPresentation(presentation);
      })();
    }
  }, []);

  useEffect(() => {
    if (params.id) {
      (async () => {
        const activities = await getActivities(params.id);
        setActivities(activities.activities);
      })();
    }
  }, []);

  useEffect(() => {
    if (presentation.totalSlides > 0) {
      (async () => {
        var progress = 0;
        const images = await Promise.all(presentation.slides.map(async (slide) => {
          const activity = activities.find((activity) => activity.objectId === slide.objectId);
          if (activity !== undefined) {
            return {
              objectId: slide.objectId,
              original: staticsImages.POLL_THUMBNAIL,
              renderItem: () => RenderActivity(activity)
            };
          }

          const thumbnail = await getThumbnail(presentation.presentationId, slide.objectId);
          progress++;
          setProgress(progress / presentation.totalSlides * 100);
          return thumbnail;
        }));
        setSlides(images);
        setLoading(false);
      })();
    }
  }, [presentation, activities]);

  function checkIfSlideIsActivity(slide: Slide) {
    return activities.some((activity) => activity.objectId === slide.objectId);
  }

  function findThumbnail(slide: Slide) {
    if (checkIfSlideIsActivity(slide)) {
      return staticsImages.POLL_THUMBNAIL;
    }

    return slide.original;
  }

  const savePresentation = async (presentation: Presentation, slides: Slide[]) => {
    await client.put(`/presentation/update/${presentation.presentationId}`, {
      slides: slides.map((slide) => slide.objectId),
    });
    setSavedSuccessfully(true);
  }

  return (
    <Box className='flex h-screen flex-col'>
      <LoadingModal percentage={progress} open={loading} />
      <AddActivityModal presentation={presentation} open={newActivityModalOpen} onClose={() => setNewActivityModalOpen(false)} />
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
          <IconButton size='large' disabled={loading} onClick={() => setNewActivityModalOpen(true)}>
            <AddIcon />
          </IconButton>

          <IconButton size='large' disabled={loading}>
            <SlideshowIcon />
          </IconButton>

          <IconButton size='large' disabled={loading} onClick={() => savePresentation(presentation, slides)}>
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
                    <Reorder.Item className='mb-2' key={item.objectId} value={item}>
                      <Card>
                        <CardMedia
                          referrerPolicy='no-referrer'
                          draggable={false}
                          component='img'
                          image={findThumbnail(item)}
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
