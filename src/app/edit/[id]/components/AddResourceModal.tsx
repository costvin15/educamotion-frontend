import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { ScrollArea } from '@/components/ui/ScrollArea';

import { SlideResources } from '@/app/edit/[id]/store/resources';
import { useEditorStore } from '@/app/edit/[id]/store/editor';

interface AddResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddResourceModal({ isOpen, onClose } : AddResourceModalProps) {
  const store = useEditorStore();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='sm:max-w-[680px]'>
        <DialogHeader>
          <DialogTitle>Adicionar recurso</DialogTitle>
        </DialogHeader>
        <ScrollArea className='h-[400px] pr-4'>
          <div className='space-y-4'>
            {SlideResources.map((resource) => (
              <div
                key={resource.id}
                className='bg-muted p-3 rounded-lg cursor-pointer'
                onClick={() => {
                  resource.onAdd(store);
                  onClose();
                }}
              >
                <div className='flex justify-start items-center'>
                  <div className='p-4 pr-8'>
                    {resource.icon}
                  </div>
                  <div>
                    <span className='font-medium'>{resource.name}</span>
                    <br/>
                    <span className='text-xs text-muted-foreground'>{resource.description}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
