import { useState, useEffect } from 'react';
import { Backdrop, Button, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Skeleton, styled } from '@mui/material';

import { useRouter } from 'next/navigation';

import client from '@/client';

type Presentation = {
  presentationId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

type Slide = {
  objectId: string;
}

type SlidesInformation = {
  totalSlides: number;
  slides: Slide[];
}

const BackdropForModal = styled(Backdrop)(({theme}) => ({
  zIndex: theme.zIndex.modal,
}));

async function getSlidesInformation(presentationId: string) : Promise<SlidesInformation> {
  const {data} = await client.get(`/presentation/${presentationId}`);
  return data;
}

async function getSlideImage(presentationId: string, slideId: string) : Promise<string> {
  const response = await client.get(`/presentation/thumbnail/${presentationId}/${slideId}`, { responseType: 'arraybuffer' });
  const blob = new Blob([response.data], { type: 'image/png' });
  return URL.createObjectURL(blob);
}

export default function PresentationDetails({presentation, open, onClose} : {presentation: Presentation, open: boolean, onClose: () => void}) {
  const [loading, setLoading] = useState(true);
  const [slideInformation, setSlideInformation] = useState({} as SlidesInformation);
  const [slides, setSlides] = useState([] as string[]);

  const router = useRouter();

  const redirectToEditor = () => {
    router.push(`/editor/${presentation.presentationId}`);
  }

  useEffect(() => {
    setLoading(true);
    if (presentation.presentationId) {
      (async () => {
        const slidesInformation = await getSlidesInformation(presentation.presentationId);
        setSlideInformation(slidesInformation);
      })();
    }
  }, [presentation]);

  useEffect(() => {
    if (slideInformation.totalSlides > 0) {
      (async () => {
        const slides = await Promise.all(slideInformation.slides.slice(0, 5).map(async (slide) => {
          return await getSlideImage(presentation.presentationId, slide.objectId);
        }));
        setSlides(slides);
        setLoading(false);
      })();
    }
  }, [slideInformation]);

  return (
    <>
      <BackdropForModal open={open} onClick={onClose} />
      <Dialog maxWidth='md' fullWidth={true} open={open} onClose={onClose}>
        <DialogTitle>{presentation.title}</DialogTitle>
        <DialogContent>
          {loading && (
            <Grid container>
              <Grid item md={6} p={1}>
                <Skeleton variant='rounded' className='w-full h-full' height='194px' />
              </Grid>
              <Grid item md={6} container>
                <Grid item md={6} p={1}>
                  <Skeleton variant='rounded' className='w-full h-full' />
                </Grid>
                <Grid item md={6} p={1}>
                  <Skeleton variant='rounded' className='w-full h-full' />
                </Grid>
                <Grid item md={6} p={1}>
                  <Skeleton variant='rounded' className='w-full h-full' />
                </Grid>
                <Grid item md={6} p={1}>
                  <Skeleton variant='rounded' className='w-full h-full' />
                </Grid>
              </Grid>
            </Grid>
          )}

          {!loading && slides.length > 0 && (
            <Grid container>
              <Grid item md={6} p={1}>
                <CardMedia
                  component="img"
                  src={slides[0]}
                  referrerPolicy='no-referrer'
                  className='w-full h-full'
                  alt={presentation.title} />
              </Grid>
              <Grid item md={6} container>
                {slides.slice(1).map((slide, index) => (
                  <Grid key={index} item md={6} p={1}>
                    <CardMedia
                      className='w-full h-full'
                      component="img"
                      height={100}
                      src={slide}
                      referrerPolicy='no-referrer'
                      alt={presentation.title} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button className='normal-case'>
            Resultados
          </Button>

          <Button className='normal-case' autoFocus onClick={redirectToEditor}>
            Abrir editor
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
