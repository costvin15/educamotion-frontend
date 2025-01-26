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
  const { addMessage } = useChatStore();

  const [ message, setMessage ] = useState('');
  const [ disabled, setDisabled ] = useState(false);

  useEffect(() => {
    if (!session.data?.user.id) {
      setDisabled(true);
      return;
    }

    if (!presentationStore.classroomId) {
      setDisabled(true);
      return;
    }

    websocket.connect(session.data.user.id, () => {
      websocket.subscribe(presentationStore.classroomId, 'new-message', (message) => {
        addMessage(message.data.content, message.data.userId);
      });
    });
    setDisabled(false);
  }, [session.data?.user.id, presentationStore.classroomId]);

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
    if (!currentMessage || currentMessage.length === 0) {
      return;
    }
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
          // TODO: Possibilitar envio de mensagens com Enter
          placeholder='Escreva sua mensagem...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={disabled}
        />
        <Button
          size='icon'
          onClick={() => handleSendMessage()}
          disabled={disabled}
        >
          <Send
            className='w-4 h-4'
          />
        </Button>
      </div>
    </div>
  );
}
