import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent } from '@/components/ui/Dialog';
import { forwardRef } from 'react';

interface CloseClassroomConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
};

export const CloseClassroomConfirmationModal = forwardRef<HTMLDivElement, CloseClassroomConfirmationModalProps>(
  ({ isOpen, onClose, onAccept }, ref) => (
    <div ref={ref}>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className='sm:max-w-[680px]'>
          <div>
            <h2 className='text-lg font-bold'>Deseja realmente encerrar a sala de apresentação?</h2>
            <p className='text-sm mt-2'>Ao encerrar a sala de apresentação, todos os espectadores serão desconectados.</p>
          </div>
          <div className='flex flex-row gap-4 justify-end'>
            <Button
              variant='destructive'
              onClick={onAccept}
            >
              Encerrar apresentação
            </Button>

            <Button
              variant='outline'
              onClick={onClose}
            >
              Cancelar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
);
CloseClassroomConfirmationModal.displayName = 'CloseClassroomConfirmationModal';
