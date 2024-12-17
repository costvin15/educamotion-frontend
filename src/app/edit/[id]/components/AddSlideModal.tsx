import { useEditorStore } from '@/app/edit/[id]/store/editor';
import { mergeClassNames } from "@/components/utils";
import { SlideTemplate, SlideTemplates } from "@/app/edit/[id]/store/templates";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { ScrollArea } from "@/components/ui/ScrollArea";

interface AddSlideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddSlideModal({ isOpen, onClose } : AddSlideModalProps) {
  const { addSlideFromTemplate } = useEditorStore();

  const handleSelectTemplate = (template: SlideTemplate) => {
    addSlideFromTemplate(template);
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='sm:max-w-[680px]'>
        <DialogHeader>
          <DialogTitle>Escolher template</DialogTitle>
        </DialogHeader>
        <ScrollArea className='h-[400px] pr-4'>
          <div
            className='grid grid-cols-2 gap-4'
            role='listbox'
            tabIndex={0}
          >
            {SlideTemplates.map(
              (template, index) => (
                <button
                  key={template.id}
                  className={mergeClassNames(
                    'group relative flex flex-col rounded-lg border p-4 hover:border-primary hover:shadow-sm'
                  )}
                  role='option'
                  onClick={() => handleSelectTemplate(template)}
                >
                  <div className='aspect-video w-full overflow-hidden rounded-md bg-muted'>
                    {template.preview}
                  </div>
                  <div className='mt-2 text-left'>
                    <h3 className='font-semibold'>{template.name}</h3>
                    <p className='text-sm text-muted-foreground'>{template.description}</p>
                  </div>
                </button>
              )
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
