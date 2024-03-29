'use client'
import { useState, useEffect } from 'react';
import { Avatar, Box, Card, CardActionArea, CardHeader, CardMedia, Grid, styled } from '@mui/material';
import { red } from '@mui/material/colors';

import client from '@/client';
import { useRouter } from 'next/navigation';

type Presentations = {
  total: number;
  presentations: Presentation[];
};

type Presentation = {
  presentationId: string;
  title: string;
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

  useEffect(() => {
    (async () => {
      const { presentations } = await getPresentations();
      setPresentations(presentations);
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
      <ContainerBox component='main'>
        <Grid item>
          <Grid container>
            {presentations.map((presentation, index) => {
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
                      <CardMedia
                        component="img"
                        height={194}
                        src={thumbnails[presentation.presentationId]}
                        referrerPolicy='no-referrer'
                        alt={presentation.title} />
                    </CardActionArea>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
      </ContainerBox>
    </Grid>
  );
}