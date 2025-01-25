import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { useChatStore } from "@/app/control-panel/[id]/store/Chat";
import { useWebSocketStore } from "@/app/control-panel/[id]/store/WebSocket";
import { useControlPanelStore } from "@/app/control-panel/[id]/store/ControlPanel";

export function ChatMessageInput() {
  const session = useSession();
  const controlPanel = useControlPanelStore();
  const websocket = useWebSocketStore();
  const { addMessage } = useChatStore();

  const [ message, setMessage ] = useState('');
  const [ disabled, setDisabled ] = useState(false);

  useEffect(() => {
    if (!session.data?.user.id) {
      setDisabled(true);
      return;
    }

    if (!controlPanel.classroomId) {
      setDisabled(true);
      return;
    }

    websocket.connect(session.data.user.id, () => {
      websocket.subscribe(controlPanel.classroomId, 'new-message', (message) => {
        addMessage(message.data.content, message.data.userId);
      });
    });
    setDisabled(false);
  }, [session.data?.user.id, controlPanel.classroomId]);

  const handleSendMessage = () => {
    const currentMessage = message.trim();
    setMessage('');
    if (!session.data?.user?.id) {
      return;
    }
    if (!currentMessage || currentMessage.length === 0) {
      return;
    }
    websocket.send(controlPanel.classroomId, 'new-message', {
      userId: session.data.user.id,
      content: currentMessage
    });
    websocket.send(controlPanel.classroomId, 'events', {
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
          disabled={disabled}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={handleSendMessage} disabled={disabled}>
          <Send className='w-4 h-4' />
        </Button>
      </div>
    </div>
  )
}
