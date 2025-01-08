'use client';
import { useAbly, usePresence, usePresenceListener } from 'ably/react';

import { Card } from '@/components/ui/Card';
import { ScrollArea } from '@/components/ui/ScrollArea';

import { useControlPanelStore } from '@/app/control-panel/[id]/store';
import { ViewerCard } from './ViewerCard';

export function ViewersList() {
  const store = useControlPanelStore();
  const ably = useAbly();

  usePresence(store.classroomId);
  const { presenceData } = usePresenceListener(store.classroomId);

  return (
    <Card className='p-4'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-lg font-semibold'>Espectadores Ativos</h3>
        <div className='flex items-center justify-evenly'>
          <div className="w-3 h-3 shrink-0 grow-0 rounded-full bg-green-700 mr-2" />
          <span className='text-muted-foreground'>{presenceData.length} online</span>
        </div>
      </div>
      <ScrollArea className='h-[430px]'>
        <div className='space-y-4'>
          {presenceData.map((viewer) => (
            <ViewerCard
              key={viewer.clientId}
              id={viewer.clientId}
              timestamp={viewer.timestamp}
              isUser={viewer.clientId === ably.auth.clientId}
            />
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
