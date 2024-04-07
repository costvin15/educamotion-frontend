type Activity = {
  presentationId: string;
  activityId: string;
  activityType: string;
  objectId: string;
};

export default function PollActivity(
  {activity}: {activity: Activity}
) {
  return (
    <div className='h-[calc(100vh-70px)]'>
      <h1>Activity Poll</h1>
      <p>Activity ID: {activity.activityId}</p>
      <p>Presentation ID: {activity.presentationId}</p>
    </div>
  );
}
