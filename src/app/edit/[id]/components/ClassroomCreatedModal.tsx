import { forwardRef } from "react";

import { Classroom } from "@/app/edit/[id]/types/classroom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Button } from "@/components/ui/Button";

interface ClassroomCreatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  classroom: Classroom;
};

export const ClassroomCreatedModal = forwardRef<HTMLDivElement, ClassroomCreatedModalProps>(
  ({ isOpen, onClose, classroom }, ref) => (
    <div ref={ref}>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className='sm:max-w-[680px]'>
          <DialogHeader>
            <DialogTitle>Sala de apresentação aberta</DialogTitle>
          </DialogHeader>

          <ScrollArea>
            <div className="mb-3">
              Sua sala de apresentação foi aberta com sucesso. Compartilhe o código de apresentação
              com seus espectadores e eles poderão acompanhar a apresentação em tempo real. A sala de
              apresentação permanece ativa até que você a encerre.

              <div className='mt-4'>
                <strong>Código de apresentação:</strong> {classroom.entryCode}
              </div>
            </div>

            <div className='flex flex-row gap-4 justify-end'>
              <Button
                variant='default'
                onClick={onClose}
              >
                OK
              </Button>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
);
