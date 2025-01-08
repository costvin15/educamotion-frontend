import { forwardRef, useEffect, useState } from 'react';

import client from '@/client';
import { Viewer } from '@/app/control-panel/[id]/types/Viewer';
import { Clock, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
import { AvatarImage } from '@radix-ui/react-avatar';

interface ViewerCardProps {
  id: string;
  timestamp: number;
  isUser?: boolean;
};

async function fetchUserInformation(id: string) : Promise<Viewer> {
  const { data } = await client.get(`/classroom/user/${id}`);
  return data;
}

function getTimeMessage(timestamp: number) {
  const now = new Date();
  const timeDiff = Math.abs(now.getTime() - timestamp);
  const minutesDiff = Math.floor(timeDiff / (1000 * 60));
  if (minutesDiff === 0) {
    return 'Entrou a poucos segundos atrás';
  }
  return `Entrou ${minutesDiff} minutos atrás`;
}

export const ViewerCard = forwardRef<HTMLDivElement, ViewerCardProps>(
  ({ id, timestamp, isUser = false }, ref) => {
    const [viewer, setViewer] = useState<Viewer | null>(null);

    useEffect(() => {
      fetchUserInformation(id)
        .then(setViewer);
    }, [id]);

    if (!viewer) {
      return null;
    }

    return (
      <div
        ref={ref}
        className='flex items-center justify-between p-3 bg-muted rounded-lg'
      >
        <div className='flex items-center gap-3'>
          <div className='h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center'>
            <Avatar>
              <AvatarImage src={viewer.profilePicture} />
              <AvatarFallback>
                <User className='w-4 h-4 text-primary' />
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <p className='font-medium'>{viewer.name} {isUser && '(Você)'}</p>
            <p className='text-sm text-muted-foreground flex items-center gap-1'>
              <Clock className='w-3 h-3' />
              {getTimeMessage(timestamp)}
            </p>
          </div>
        </div>
      </div>
    );
  }
);
