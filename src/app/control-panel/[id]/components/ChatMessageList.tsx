import { useEffect, useState } from "react";
import { format } from "date-fns";
import { MessageCircleDashed } from "lucide-react";

import client from "@/client";

import { ScrollArea } from "@/components/ui/ScrollArea";

import { useChatStore } from "@/app/control-panel/[id]/store/Chat";
import { Viewer } from "@/app/control-panel/[id]/types/Viewer";

async function fetchUserInformation(id: string) : Promise<Viewer> {
  const { data } = await client.get(`/classroom/user/${id}`);
  return data;
}

export function ChatMessageList() {
  const { messages } = useChatStore();
  const [ users, setUsers ] = useState<Record<string, Viewer>>({});

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
        {messages.length === 0 && (
          <div className='flex flex-col items-center space-y-2'>
            <MessageCircleDashed className='w-8 h-8 text-muted-foreground' />
            <span className='text-muted-foreground'>Nenhuma mensagem enviada ainda.</span>
          </div>
        )}
        {messages.map((message) => (
          <div key={message.id} className='bg-muted p-3 rounded-lg'>
            <div className='flex justify-between items-center mb-1'>
              <span className='font-medium'>{users[message.userId]?.name || 'Usuário Desconhecido'}</span>
              <span className='text-xs text-muted-foreground'>{format(new Date(message.timestamp), 'HH:mm')}</span>
            </div>
            <p className='text-sm break-all'>{message.content}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
