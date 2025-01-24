'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Clock, MessageCircle, MousePointer2 } from 'lucide-react';

import client from '@/client';

import { Card } from "@/components/ui/Card";
import { ScrollArea } from "@/components/ui/ScrollArea";

import { InteractionLog, InteractionType } from "@/app/control-panel/[id]/types/Interaction";
import { useWebSocketStore } from '@/app/control-panel/[id]/store/WebSocket';
import { useControlPanelStore } from '@/app/control-panel/[id]/store/ControlPanel';
import { Viewer } from '@/app/control-panel/[id]/types/Viewer';
import { useInteractionLogsStore } from '@/app/control-panel/[id]/store/InteractionLogs';

async function fetchUserInformation(id: string) : Promise<Viewer> {
  const { data } = await client.get(`/classroom/user/${id}`);
  return data;
}

export function InteractionLogs() {
  const session = useSession();
  const websocket = useWebSocketStore();
  const controlPanelStore = useControlPanelStore();
  const interactionLogsStore = useInteractionLogsStore();

  useEffect(() => {
    if (!session.data?.user.id || !controlPanelStore.classroomId) {
      return;
    }
    websocket.connect(session.data.user.id, () => {
      websocket.subscribe(controlPanelStore.classroomId, 'events', (message) => {
        const content = JSON.parse(message.data.content);
        (async () => {
          if (interactionLogsStore.messagesProcessed[message.id]) {
            return;
          }
          const user = await fetchUserInformation(message.data.userId);
          const log : InteractionLog = {
            id: message.id,
            viewerId: message.data.userId,
            viewerName: user.name,
            type: InteractionType[message.data.type as keyof typeof InteractionType],
            timestamp: new Date(),
            data: content,
          };
          interactionLogsStore.addLog(log);
          interactionLogsStore.addMessageProcessed(message.id);
        })();
      });
    });

    return () => {
      websocket.disconnect();
    };
  }, [session.data?.user.id, controlPanelStore.classroomId]);

  return (
    <Card className='p-4'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-lg font-semibold'>Registro de Eventos</h3>
        <span className='text-sm text-muted-foreground'>
          Últimos eventos
        </span>
      </div>
      <ScrollArea className='h-[430px]'>
        <div className='space-y-4'>
          {interactionLogsStore.logs.length === 0 && (
            <div className='text-center text-muted-foreground'>
              Nenhum evento registrado
            </div>
          )}
          {interactionLogsStore.logs.map((log) => (
            <div
              key={log.id}
              className='p-3 bg-muted rounded-lg space-y-2'
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  {log.type === InteractionType.MESSAGE && (
                    <MessageCircle className='h-4 w-4 text-primary' />
                  ) || (
                    <MousePointer2 className='h-4 w-4 text-primary' />
                  )}
                  <span className='font-medium'>{log.viewerName}</span>
                </div>
                <span className='text-sm text-muted-foreground flex items-center gap-1'>
                  <Clock className='h-3 w-3' />
                  {Math.round((Date.now() - log.timestamp.getTime()) / 1000 / 60)} minutos atrás
                </span>
              </div>
              <p className='text-sm'>
                {log.type === InteractionType.QUESTION && `Respondeu questão`}
                {log.type === InteractionType.MESSAGE && `Enviou mensagem no chat`}
              </p>
              {log.data && (
                <div className='text-sm bg-background/50 p-2 rounded'>
                  <pre className='text-xs w-full whitespace-pre-wrap'>
                    {JSON.stringify(log.data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
InteractionLogs.displayName = 'InteractionLogs';
