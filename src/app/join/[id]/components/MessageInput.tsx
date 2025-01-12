import { useState } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useChatStore } from "@/app/join/[id]/store/chat";

export function MessageInput() {
  const [message, setMessage] = useState('');
  const { sendMessage } = useChatStore();

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
          onClick={() => {
            sendMessage(message);
            setMessage('');
          }}
        >
          <Send
            className='w-4 h-4'
          />
        </Button>
      </div>
    </div>
  );
}
