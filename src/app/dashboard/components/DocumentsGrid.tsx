'use client'
import { useState, useEffect } from 'react';
import { Avatar, Box, Card, CardActionArea, CardHeader, CardMedia, Grid, styled } from '@mui/material';
import { red } from '@mui/material/colors';

import client from '@/client';
import { useRouter } from 'next/navigation';

type PresentationsPage = {
  nextPageToken: string;
  files: Presentation[];
};

type Presentation = {
  id: string;
  name: string;
}

type PresentationThumbnail = {
  width: number;
  height: number;
  contentUrl: string;
}	

async function getPresentations() : Promise<PresentationsPage> {
  const {data} = await client.get('/presentation');
  return data;
}

async function getPresentationImage(presentationId: string) : Promise<PresentationThumbnail> {
  const {data} = await client.get(`/presentation/thumbnail/${presentationId}`);
  return data;
}

const ContainerBox = styled(Box)(() => ({
  flexGrow: 1,
  paddingTop: 0,
  padding: '24px',
}));

export default function DocumentsGrid() {
  const router = useRouter();
  const [nextPageToken, setNextPageToken] = useState('' as string);
  const [presentations, setPresentations] = useState([] as Presentation[]);
  const [thumbnails, setThumbnails] = useState({} as {[key: string]: string});

  useEffect(() => {
    (async () => {
      const data = await getPresentations();
      setPresentations(data.files);
      setNextPageToken(data.nextPageToken);
    })();
  }, []);

  useEffect(() => {
    presentations.map(async (presentation) => {
      const thumbnail = await getPresentationImage(presentation.id);
      setThumbnails((prevState) => ({
        ...prevState,
        [presentation.id]: thumbnail.contentUrl
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
                    <CardActionArea onClick={() => handlePresentation(presentation.id)}>
                      <CardHeader
                        avatar={
                          <Avatar sx={{ bgcolor: red[500] }}>
                            {presentation.name.charAt(0)}
                          </Avatar>
                        }
                        title={presentation.name}
                        subheader="September 14, 2016" />
                      <CardMedia
                        component="img"
                        height={194}
                        image={thumbnails[presentation.id]}
                        referrerPolicy='no-referrer'
                        alt={presentation.name} />
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