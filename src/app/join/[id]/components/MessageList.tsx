import { ScrollArea } from "@/components/ui/ScrollArea";
import { useChatStore } from "@/app/join/[id]/store/chat";

export function MessageList() {
  const { messages } = useChatStore();

  return (
    <ScrollArea className='flex-1 p-4'>
      <div className='space-y-4'>
        {messages.map((message) => (
          <div key={message.id} className='bg-muted p-3 rounded-lg'>
            <div className='flex justify-between items-center mb-1'>
              <span className='font-medium'>{message.user}</span>
              {/* <span className='text-xs text-muted-foreground'>{Math.round((Date.now() - message.timestamp.getTime()) / 1000 /60)} minutos atrás</span> */}
            </div>
            <p className='text-sm'>{message.content}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
