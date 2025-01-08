import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Send } from "lucide-react";

export function MessageInput() {
  return (
    <div className='p-4 border-t'>
      <div className='flex gap-2'>
        <Input
          placeholder='Escreva sua mensagem...'
        />
        <Button size='icon'>
          <Send className='w-4 h-4' />
        </Button>
      </div>
    </div>
  );
}
