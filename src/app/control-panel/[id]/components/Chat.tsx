import { Card } from "@/components/ui/Card";
import { ChatMessageList } from "@/app/control-panel/[id]/components/ChatMessageList";
import { ChatMessageInput } from "@/app/control-panel/[id]/components/ChatMessageInput";

export function Chat() {
  return (
    <Card className='p-4'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-lg font-semibold'>Chat</h2>
      </div>
      <div className='h-[430px] flex flex-col'>
        <ChatMessageList />
        <ChatMessageInput />
      </div>
    </Card>
  );
}
