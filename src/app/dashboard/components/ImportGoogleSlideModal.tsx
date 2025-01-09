import { useEffect, useState } from 'react';
import { FolderInput, Search } from "lucide-react";

import client from '@/client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { ScrollArea } from "@/components/ui/ScrollArea";

import { Presentation, Presentations } from '@/app/dashboard/types/presentations';

interface ImportGoogleSlideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

async function getPresentationAvailable() : Promise<Presentations> {
  const { data } = await client.get('/presentation/available?search=');
  return data;
}

async function performImportPresentation(presentationId: string) {
  await client.post(`/presentation/add/${presentationId}`);
}

export function ImportGoogleSlideModal({ isOpen, onClose } : ImportGoogleSlideModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [presentations, setPresentations] = useState([] as Presentation[]);

  const filteredPresentations = presentations.filter((presentation) => presentation.title.toLowerCase().includes(searchQuery.toLowerCase()));

  useEffect(() => {
    (async () => {
      const { presentations } = await getPresentationAvailable();
      setPresentations(presentations);
    })();
  }, []);

  const handleImport = async (presentation: Presentation) => {
    console.log('Importing presentation', presentation);
    await performImportPresentation(presentation.id);
    console.log('Presentation imported');
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='sm:max-w-[680px]'>
        <DialogHeader>
          <DialogTitle className='flex gap-3 items-center space-x-2 pb-4'>
            <FolderInput />
            Importar apresentação do Google Slides
          </DialogTitle>

          <div className='relative'>
            <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Pesquisar apresentação...'
              className='pl-8'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <ScrollArea className='h-[300px] pr-4 pt-4'>
            <div className='space-y-2'>
              {filteredPresentations.map((presentation, index) => (
                <div
                  key={index}
                  className='rounded-lg p-3 hover:bg-secondary transition-colors cursor-pointer'
                  onClick={() => handleImport(presentation)}
                >
                  {presentation.title}
                </div>
              ))}

              {filteredPresentations.length === 0 && (
                <div className='text-center text-muted-foreground py-4'>
                  Nenhuma apresentação encontrada
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
