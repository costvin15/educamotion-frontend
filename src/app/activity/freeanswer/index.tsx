import { useState, useEffect } from 'react';
import { Card, CardContent, OutlinedInput, ThemeProvider, Typography, createTheme } from "@mui/material";

import client from '@/client';

type Activity = {
  presentationId: string;
  activityId: string;
  activityType: string;
  objectId: string;
};

type FreeAnswer = {
  id: string;
  presentationId: string;
  question: string;
  maxWords: number;
};

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

async function getFreeAnswerActivity(activityId: string): Promise<FreeAnswer> {
  const { data } = await client.get(`/activity/freeanswer/${activityId}`);
  return data;
}

export default function FreeAnswer({ activity }: { activity: Activity }) {
  const [freeAnswer, setFreeAnswer] = useState<FreeAnswer>();

  useEffect(() => {
    (async () => {
      const freeAnswer = await getFreeAnswerActivity(activity.activityId);
      setFreeAnswer(freeAnswer);
    })();
  }, []);

  return (
    <ThemeProvider theme={lightTheme}>
      <div className='flex justify-center items-center h-[calc(100vh-70px)]'>
        <Card className='bg-white text-black text-left w-2/3'>
          <CardContent className='!py-2'>
            <div>
              <Typography>{freeAnswer?.question}</Typography>
              <OutlinedInput fullWidth />
            </div>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}
