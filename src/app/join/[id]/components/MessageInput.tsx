import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { useChatStore } from "@/app/join/[id]/store/chat";
import { useWebSocketStore } from "@/app/join/[id]/store/websocket";
import { usePresentationStore } from "@/app/join/[id]/store/presentation";

export function MessageInput() {
  const session = useSession();
  const presentationStore = usePresentationStore();
  const websocket = useWebSocketStore();
  const [message, setMessage] = useState('');
  const { addMessage } = useChatStore();

  useEffect(() => {
    if (!session.data?.user?.id) {
      return;
    }
    websocket.connect(session.data.user.id);
    websocket.subscribe(presentationStore.classroomId, 'new-message', (message) => {
      addMessage(message.data.content, message.data.userId);
    });
  }, []);

  if (!session.data?.user?.id) {
    return (
      <div className='p-4 border-t'>
        <p>Você precisa estar logado para enviar mensagens.</p>
      </div>
    );
  }

  const handleSendMessage = () => {
    const currentMessage = message.trim();
    setMessage('');
    if (!session.data?.user?.id) {
      return;
    }
    addMessage(currentMessage, session.data.user.id);
    websocket.send(presentationStore.classroomId, 'new-message', {
      userId: session.data.user.id,
      content: currentMessage
    });
    websocket.send(presentationStore.classroomId, 'events', {
      content: JSON.stringify({ message: currentMessage }),
      userId: session.data.user.id,
      type: 'MESSAGE'
    });
  }

  return (
    <div className='p-4 border-t'>
      <div className='flex gap-2'>
        <Input
          placeholder='Escreva sua mensagem...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          size='icon'
          onClick={() => handleSendMessage()}
        >
          <Send
            className='w-4 h-4'
          />
        </Button>
      </div>
    </div>
  );
}
