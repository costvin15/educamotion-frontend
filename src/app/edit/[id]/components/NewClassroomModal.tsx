import { forwardRef } from "react";

import client from "@/client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Button } from "@/components/ui/Button";

import { useEditorStore } from "@/app/edit/[id]/store/editor";

interface NewClassroomModalProps {
  isOpen: boolean;
  onClose: () => void;
};

export async function createClassrom(presentationId: string) {
  const { data } = await client.post(`/classroom/create/${presentationId}`);
  return data;
};

export const NewClassroomModal = forwardRef<HTMLDivElement, NewClassroomModalProps>(
  ({ isOpen, onClose }, ref) => {
    const { presentationId } = useEditorStore();

    const handleCreateClassroom = async () => {
      const data = await createClassrom(presentationId);
      console.log(data);
      onClose();
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
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
);
