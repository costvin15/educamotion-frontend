import { useCallback, useEffect, useRef, useState } from 'react';
import { FolderInput, Loader2, Search } from "lucide-react";

import client from '@/client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { ScrollArea } from "@/components/ui/ScrollArea";

import { Presentation, Presentations } from '@/app/dashboard/types/presentations';

interface ImportGoogleSlideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessfulImport?: () => void;
  onError?: () => void;
}

async function getPresentationAvailable(searchQuery: string, nextPageToken: string) : Promise<Presentations> {
  const { data } = await client.get(`/presentation/available?search=${searchQuery}&nextPageToken=${nextPageToken}`);
  return data;
}

async function performImportPresentation(presentationId: string) {
  await client.post(`/presentation/add/${presentationId}`);
}

export function ImportGoogleSlideModal({ isOpen, onClose, onSuccessfulImport = () => {}, onError = () => {} }: ImportGoogleSlideModalProps) {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPageToken, setCurrentPageToken] = useState('');
  const [nextPageToken, setNextPageToken] = useState('');
  const [presentations, setPresentations] = useState([] as Presentation[]);

  const [importationInProgress, setImportationInProgress] = useState(false);

  const observer = useCallback((node: HTMLDivElement | null) => {
    if (!node) {
      return;
    }

    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setCurrentPageToken(nextPageToken);
      }
    }, { threshold: 0.8 });

    intersectionObserver.observe(node);

    return () => {
      intersectionObserver.disconnect();
    }
  }, [hasMore, loading, nextPageToken]);

  const filteredPresentations = presentations.filter((presentation) => presentation.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const loadMore = useCallback(async (token: string) => {
    setLoading(true);
 
    const response = await getPresentationAvailable(searchQuery, token);
    if (response.presentations.length === 0 || !response.nextPageToken) {
      setHasMore(false);
    }

    setPresentations(prev => [...prev, ...response.presentations]);
    setNextPageToken(response.nextPageToken);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadMore(currentPageToken);
  }, [currentPageToken, loadMore]);

  const handleImport = async (presentation: Presentation) => {
    setImportationInProgress(true);
    try {
      await performImportPresentation(presentation.id);
      onSuccessfulImport();
    } catch (error) {
      onError();
    } finally {
      onClose();
      setImportationInProgress(false);
    }
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

          <ScrollArea className={`h-[300px] pr-4 pt-4 ${importationInProgress ? 'pointer-events-none' : ''}`}>
            <div className='space-y-2'>
              {filteredPresentations.length === 0 && (
                <div className='text-center text-muted-foreground py-4'>
                  Nenhuma apresentação encontrada
                </div>
              )}

              {filteredPresentations.map((presentation, index) => (
                <div
                  key={index}
                  ref={index === presentations.length - 1 ? observer : null}
                  className='rounded-lg p-3 hover:bg-secondary transition-colors cursor-pointer'
                  onClick={() => handleImport(presentation)}
                >
                  {presentation.title}
                </div>
              ))}

              {loading && (
                <div className="flex justify-center p-4 gap-2 items-center">
                  <Loader2 className='animate-spin h-4 w-4' />
                  <span>Carregando...</span>
                </div>
              )}
              
              {!hasMore && !loading && (
                <div className="text-center text-sm text-muted-foreground">
                  Não há mais apresentações disponíveis
                </div>
              )}
            </div>

            {importationInProgress && (
              <div className='absolute inset-0 bg-background/80 flex items-center justify-center'>
                <Loader2 className='animate-spin h-8 w-8' />
              </div>
            )}
          </ScrollArea>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
