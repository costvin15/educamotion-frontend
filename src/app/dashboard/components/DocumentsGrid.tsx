'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, Box, Card, CardActionArea, CardHeader, CardMedia, CircularProgress, Grid, Skeleton, styled } from '@mui/material';
import { red } from '@mui/material/colors';
import { motion, AnimatePresence } from 'framer-motion';

import client from '@/client';

type Presentations = {
  total: number;
  presentations: Presentation[];
};

type Presentation = {
  presentationId: string;
  title: string;
}

type Thumbnail = {
  thumbnail: string;
  loaded: boolean;
}

async function getPresentations() : Promise<Presentations> {
  const {data} = await client.get('/presentation/imported');
  return data;
}

async function getPresentationImage(presentationId: string) : Promise<string> {
  const response = await client.get(`/presentation/thumbnail/${presentationId}`, { responseType: 'arraybuffer' });
  const blob = new Blob([response.data], { type: 'image/png' });
  return URL.createObjectURL(blob);
}

const ContainerBox = styled(Box)(() => ({
  flexGrow: 1,
  paddingTop: 0,
  padding: '24px',
}));

export default function DocumentsGrid() {
  const router = useRouter();

  const [presentations, setPresentations] = useState([] as Presentation[]);
  const [thumbnails, setThumbnails] = useState({} as {[key: string]: string});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { presentations } = await getPresentations();
        setPresentations(presentations);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    presentations.map(async presentation => {
      const thumbnail = await getPresentationImage(presentation.presentationId);
      setThumbnails((prevState) => ({
        ...prevState,
        [presentation.presentationId]: thumbnail
      }));
    });
  }, [presentations]);

  const handlePresentation = (presentationId: string) => {
    router.push(`/slide-details/${presentationId}`);
  }

  return (
    <Grid container direction='column'>
      <AnimatePresence>
        {loading && !error && (
          <Box className='h-dvh flex items-center justify-center'>
            <motion.div
              initial={{ x: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 1 }}
            >
              {/* Melhor utilizar Skeleton */}
              <CircularProgress />
            </motion.div>
          </Box>
        )}
        {error && !loading && (
          <Box className='h-dvh flex items-center justify-center'>
            <motion.div
              initial={{ x: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <p>Something went wrong. Please try again later.</p>
            </motion.div>
          </Box>
        )}
        {!loading && !error && (
          <Box component='main' className='flex-grow pt-0, p-3'>
            <motion.div
              initial={{ x: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <Grid item>
                <Grid container>
                  {presentations.map((presentation, index) => {
                    const thumbnail = thumbnails[presentation.presentationId];

                    return (
                      <Grid key={index} item md={4} p={1}>
                        <Card>
                          <CardActionArea onClick={() => handlePresentation(presentation.presentationId)}>
                            <CardHeader
                              avatar={
                                <Avatar sx={{ bgcolor: red[500] }}>
                                  {presentation.title.charAt(0)}
                                </Avatar>
                              }
                              title={presentation.title}
                              subheader="September 14, 2016" />

                            {thumbnail && (
                              <CardMedia
                                component="img"
                                height={194}
                                src={thumbnail}
                                referrerPolicy='no-referrer'
                                alt={presentation.title} />
                            ) || (
                              <Skeleton
                                variant='rounded'
                                height={194} />
                            )}
                          </CardActionArea>
                        </Card>
                      </Grid>
                    )
                  })}
                </Grid>
              </Grid>
            </motion.div>
          </Box>
        )}
      </AnimatePresence>
    </Grid>
  );
}