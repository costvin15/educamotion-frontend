import { useEffect, useState } from "react";

import client from "@/client";

import { ScrollArea } from "@/components/ui/ScrollArea";
import { useChatStore } from "@/app/join/[id]/store/chat";
import { Viewer } from "@/app/control-panel/[id]/types/Viewer";
import { format } from "date-fns";

async function fetchUserInformation(id: string) : Promise<Viewer> {
  const { data } = await client.get(`/classroom/user/${id}`);
  return data;
}

export function MessageList() {
  const { messages } = useChatStore();
  const [users, setUsers] = useState<Record<string, Viewer>>({});

  useEffect(() => {
    messages.forEach((message) => {
      if (!users[message.userId]) {
        fetchUserInformation(message.userId).then((user) => {
          setUsers((prev) => ({ ...prev, [message.userId]: user }));
        });
      }
    });
  }, [messages]);

  return (
    <ScrollArea className='flex-1 p-4'>
      <div className='space-y-4'>
        {messages.map((message) => (
          <div key={message.id} className='bg-muted p-3 rounded-lg'>
            <div className='flex justify-between items-center mb-1'>
              <span className='font-medium'>{users[message.userId]?.name || 'Usuário Desconhecido'}</span>
              <span className='text-xs text-muted-foreground'>{format(new Date(message.timestamp), 'HH:mm')}</span>
            </div>
            <p className='text-sm'>{message.content}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
