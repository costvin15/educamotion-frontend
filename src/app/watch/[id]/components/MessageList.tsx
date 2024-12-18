import { ScrollArea } from "@/components/ui/ScrollArea";
import { Message } from "@/app/watch/[id]/types/Message";

const messages : Message[] = [
  {
    id: '1',
    user: 'Vinicius',
    content: 'Olá, tudo bem?',
    timestamp: new Date(new Date().getTime() - 1000 * 60 * 5)
  },
  {
    id: '2',
    user: 'Lucas',
    content: 'Oi, tudo sim e você?',
    timestamp: new Date(new Date().getTime() - 1000 * 60 * 3)
  },
  {
    id: '3',
    user: 'Vinicius',
    content: 'Tudo ótimo!',
    timestamp: new Date(new Date().getTime() - 1000 * 60 * 2)
  }
];

export function MessageList() {
  return (
    <ScrollArea className='flex-1 p-4'>
      <div className='space-y-4'>
        {messages.map((message) => (
          <div key={message.id} className='bg-muted p-3 rounded-lg'>
            <div className='flex justify-between items-center mb-1'>
              <span className='font-medium'>{message.user}</span>
              <span className='text-xs text-muted-foreground'>{Math.round((Date.now() - message.timestamp.getTime()) / 1000 /60)} minutos atrás</span>
            </div>
            <p className='text-sm'>{message.content}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}