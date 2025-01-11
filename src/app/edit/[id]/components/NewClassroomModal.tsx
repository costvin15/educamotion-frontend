import { forwardRef, useState } from "react";

import client from "@/client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Button } from "@/components/ui/Button";

import { useEditorStore } from "@/app/edit/[id]/store/editor";
import { Classroom } from "@/app/edit/[id]/types/classroom";
import { Loader2 } from "lucide-react";

interface NewClassroomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessfulCreate?: (classroom: Classroom) => void;
};

export async function createClassrom(presentationId: string) : Promise<Classroom> {
  const { data } = await client.post(`/classroom/create/${presentationId}`);
  return data;
};

export const NewClassroomModal = forwardRef<HTMLDivElement, NewClassroomModalProps>(
  ({ isOpen, onClose, onSuccessfulCreate }, ref) => {
    const { presentationId } = useEditorStore();
    const [ isCreating, setIsCreating ] = useState(false);

    const handleCreateClassroom = async () => {
      setIsCreating(true);
      const data = await createClassrom(presentationId);
      onClose();
      if (onSuccessfulCreate) {
        onSuccessfulCreate(data);
      }
      setIsCreating(false);
    };

    return (
      <div ref={ref}>
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
          <DialogContent className='sm:max-w-[680px]'>
            <DialogHeader>
              <DialogTitle>Criar nova sala de apresentação?</DialogTitle>
            </DialogHeader>

            <ScrollArea>
              <div className="mb-3">
                Ao iniciar uma sala de apresentação, você poderá compartilhar o código de apresentação
                com seus espectadores e eles poderão acompanhar a apresentação em tempo real. A sala de
                apresentação permanece ativa até que você a encerre.
              </div>

              <div className='flex flex-row gap-4 justify-end'>
                <Button
                  variant='destructive'
                  onClick={handleCreateClassroom}
                >
                  Iniciar apresentação
                </Button>
                <Button
                  variant='outline'
                  onClick={onClose}
                >
                  Cancelar
                </Button>
              </div>

              {isCreating && (
                <div className='absolute inset-0 bg-background/80 flex items-center justify-center'>
                  <Loader2 className='animate-spin h-8 w-8' />
                </div>
              )}
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
);
