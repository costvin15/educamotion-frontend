import client from '@/client';
import { useEffect, useState } from 'react';

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
  const response = await client.get(`/poll/${activityId}`);
  return response.data;
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
    <div className='h-[calc(100vh-70px)]'>
      <h1>Activity Poll</h1>
      <p>Activity ID: {activity.activityId}</p>
      <p>Activity Name: {poll?.question}</p>
      <p>Presentation ID: {activity.presentationId}</p>
      {poll?.choices.map(choice => (
        <p>{choice.description}</p>
      ))}
    </div>
  );
}
