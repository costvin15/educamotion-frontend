'use client';
import { useState } from 'react';
import { Clock, User } from 'lucide-react';

import { Card } from '@/components/ui/Card';
import { ScrollArea } from '@/components/ui/ScrollArea';

import { Viewer } from '@/app/control-panel/[id]/types/Viewer';

const mockViewers : Viewer[] = [
  {
    id: '1',
    name: 'John Doe',
    joinedAt: new Date(Date.now() - 1000 * 60 * 30),
    lastActivity: new Date(),
  },
  {
    id: '2',
    name: 'Jane Doe',
    joinedAt: new Date(Date.now() - 1000 * 60 * 15),
    lastActivity: new Date(Date.now() - 1000 * 60 * 2),
  },
  {
    id: '3',
    name: 'Alice Doe',
    joinedAt: new Date(Date.now() - 1000 * 60 * 10),
    lastActivity: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: '4',
    name: 'Bob Doe',
    joinedAt: new Date(Date.now() - 1000 * 60 * 5),
    lastActivity: new Date(Date.now() - 1000 * 60 * 1),
  },
  {
    id: '5',
    name: 'Eve Doe',
    joinedAt: new Date(Date.now() - 1000 * 60 * 2),
    lastActivity: new Date(Date.now() - 1000 * 60 * 1),
  },
  {
    id: '6',
    name: 'Mallory Doe',
    joinedAt: new Date(Date.now() - 1000 * 60 * 1),
    lastActivity: new Date(),
  }
];

export function ViewersList() {
  const [viewers, setViewers] = useState(mockViewers);

  return (
    <Card className='p-4'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-lg font-semibold'>Espectadores Ativos</h3>
        <span className='text-muted-foreground'>{viewers.length} online</span>
      </div>
      <ScrollArea className='h-[430px]'>
        <div className='space-y-4'>
          {viewers.map((viewer) => (
            <div
              key={viewer.id}
              className='flex items-center justify-between p-3 bg-muted rounded-lg'
            >
              <div className='flex items-center gap-3'>
                <div className='h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center'>
                  <User className='w-4 h-4 text-primary' />
                </div>
                <div>
                  <p className='font-medium'>{viewer.name}</p>
                  <p className='text-sm text-muted-foreground flex items-center gap-1'>
                    <Clock className='w-3 h-3' />
                    Entrou {Math.round((Date.now() - viewer.joinedAt.getTime()) / 1000 /60)} minutos atrás
                  </p>
                </div>
              </div>
              <div className='h-2 w-2 rounded-full bg-green-500' />
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
