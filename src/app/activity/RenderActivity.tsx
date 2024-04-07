import PollActivity from '@/app/activity/poll';

type Activity = {
  presentationId: string;
  activityId: string;
  activityType: string;
  objectId: string;
};

const types : {[key: string]: ({ activity }: { activity: Activity }) => React.ReactNode} = {
  'poll': ({ activity }) => PollActivity({ activity }),
};

export default function RenderActivity(activity: Activity) {
  const ActivityComponent = types[activity.activityType];
  return <ActivityComponent activity={activity} />;
}
