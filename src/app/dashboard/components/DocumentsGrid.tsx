'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Avatar, Box, Card, CardActionArea, CardHeader, CardMedia, CircularProgress, Grid, Skeleton, Toolbar, Typography, styled } from '@mui/material';
import { red } from '@mui/material/colors';

import { motion, AnimatePresence } from 'framer-motion';
import moment from 'moment';

import client from '@/client';
import DocumentsGridSkeleton from '@/app/dashboard/components/DocumentsGridSkeleton';

type Presentations = {
  total: number;
  presentations: Presentation[];
};

type Presentation = {
  presentationId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

function formatDate(date: Date) {
  moment.locale('pt-br');
  return moment(date).format('DD [de] MMMM [de] YYYY');
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
        console.log(presentations[0].createdAt);
        setPresentations(presentations);
      } catch (error) {
        console.error(error);
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
    <Box className='h-dvh overflow-y-hidden'>
      <Grid container direction='column'>
        <Grid item>
          <Toolbar>
            <Typography variant='h5'>
              Apresentações importadas
            </Typography>
          </Toolbar>
        </Grid>
        <AnimatePresence>
          {loading && !error && (
            <DocumentsGridSkeleton />
          )}
          {error && !loading && (
            <Box className='h-dvh flex items-center justify-center'>
              <motion.div
                initial={{ x: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p>Algo deu errado ao carregar as apresentações.</p>
              </motion.div>
            </Box>
          )}
          {!loading && !error && (
            <Box component='main' className='h-[calc(100vh-64px)] overflow-y-scroll pt-0 p-3'>
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
                                subheader={formatDate(presentation.updatedAt)} />

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
    </Box>
  );
}