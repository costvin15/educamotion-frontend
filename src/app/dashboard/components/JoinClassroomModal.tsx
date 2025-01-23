import { useState } from "react";

import client from "@/client";

import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface JoinClassroomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

async function checkClassroom(code: string) : Promise<boolean> {
  try {  
    await client.get(`/classroom/entry-code/${code}`);
  } catch (error) {
    return false;
  }
  return true;
}

export function JoinClassroomModal({ isOpen, onClose }: JoinClassroomModalProps) {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleJoin = async () => {
    setLoading(true);
    if (!await checkClassroom(code)) {
      setError('Código inválido');
      setLoading(false);
      return;
    }
    setLoading(false);
    router.push(`/join/${code}`);
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogTitle>
          Entrar em uma sala de apresentação
        </DialogTitle>
        {loading && (
          <div className='flex items-center justify-center'>
            <Loader2 className='h-8 w-8 animate-spin' />
          </div>
        )}
        {!loading && (
          <div>
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder='Código da sala'
            />
            {error && (
              <div className='text-red-500 text-sm mt-2'>
                {error}
              </div>
            )}
            <Button className='mt-4 w-full' onClick={handleJoin}>
              Entrar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
};
