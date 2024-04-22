import { useState, useEffect } from 'react';
import { Button, Card, CardContent, FormControlLabel, FormGroup, Radio, RadioGroup, Typography } from '@mui/material';

import client from '@/client';

type Activity = {
  presentationId: string;
  activityId: string;
  activityType: string;
  objectId: string;
};

type Choice = {
  id: string;
  pollId: string;
  description: string;
};

type Poll = {
  id: string;
  presentationId: string;
  question: string;
  choices: Choice[];
};

async function getPollActivity(activityId: string) : Promise<Poll> {
  const { data } = await client.get(`/activity/poll/${activityId}`);
  return data;
}

export default function PollActivity({activity}: {activity: Activity}) {
  const [poll, setPoll] = useState<Poll>();

  useEffect(() => {
    (async () => {
      const poll = await getPollActivity(activity.activityId);
      setPoll(poll);
    })();
  }, []);

  return (
    <div className='flex justify-center items-center h-[calc(100vh-70px)]'>
      <Card className='bg-white text-black text-left w-2/3'>
        <CardContent className='!py-2'>
          <div>
            <Typography>{poll?.question}</Typography>

            <FormGroup className='my-2'>
              <RadioGroup>
                {poll?.choices.map((choice) => (
                  <FormControlLabel key={choice.id} control={<Radio />} label={choice.description} />
                ))}
              </RadioGroup>
            </FormGroup>

            <div className='flex justify-between items-center'>
              <Typography variant='caption' className='text-gray-500'>
                Total de votos: 12 votos
              </Typography>

              <Button className='normal-case font-semibold' variant='contained'>
                Votar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
