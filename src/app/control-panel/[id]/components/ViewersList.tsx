'use client';
import { useEffect } from 'react';
import { useAbly, usePresence, usePresenceListener } from 'ably/react';

import { Card } from '@/components/ui/Card';
import { ScrollArea } from '@/components/ui/ScrollArea';

import { useViewersStore } from '@/app/control-panel/[id]/store/Viewers';
import { useControlPanelStore } from '@/app/control-panel/[id]/store/ControlPanel';

import { ViewerCard } from '@/app/control-panel/[id]/components/ViewerCard';

export function ViewersList() {
  const ably = useAbly();
  const controlPanelStore = useControlPanelStore();
  const viewersStore = useViewersStore();

  usePresence(controlPanelStore.classroomId);
  const { presenceData } = usePresenceListener(controlPanelStore.classroomId);

  useEffect(() => {
    viewersStore.reset();
    const entries = new Map<string, typeof presenceData[0]>();
    presenceData.forEach((presence) => {
      if (entries.has(presence.clientId)) {
        return;
      }
      entries.set(presence.clientId, presence);
      viewersStore.addViewer(presence);
    });
  }, [presenceData]);

  return (
    <Card className='p-4'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-lg font-semibold'>Espectadores Ativos</h3>
        <div className='flex items-center justify-evenly'>
          <div className="w-3 h-3 shrink-0 grow-0 rounded-full bg-green-700 mr-2" />
          <span className='text-muted-foreground'>{viewersStore.viewers.length} online</span>
        </div>
      </div>
      <ScrollArea className='h-[430px]'>
        <div className='space-y-4'>
          {viewersStore.viewers.length === 0 && (
            <Card className='p-4'>
              <p className='text-muted-foreground'>Nenhum espectador ativo no momento.</p>
            </Card>
          )}

          {viewersStore.viewers.map((viewer, index) => (
            <ViewerCard
              key={index}
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
