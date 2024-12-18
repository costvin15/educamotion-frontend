import { MessageSquare } from "lucide-react";

import { mergeClassNames } from "@/components/utils";
import { MessageList } from "@/app/watch/[id]/components/MessageList";
import { MessageInput } from "@/app/watch/[id]/components/MessageInput";
import { useChatStore } from "@/app/watch/[id]/store/chat";

export function ChatPanel() {
  const { panelOpened } = useChatStore();

  return (
    <div
      className={mergeClassNames(
        'fixed pt-16 right-0 top-0 h-screen w-96 border-l bg-card transform transition-transform duration-300 ease-in-out shadow-lg',
        panelOpened ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <div className='h-full flex flex-col'>
        <div className='p-4 border-b flex items-center gap-2'>
          <MessageSquare className='w-4 h-4' />
          <h2 className='font-semibold'>Chat da Sala</h2>
        </div>

        <MessageList />
        <MessageInput />
      </div>
    </div>
  );
}
