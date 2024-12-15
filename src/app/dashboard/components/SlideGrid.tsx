'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

import client from '@/client';
import { Slide } from '@/app/dashboard/types/slides';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { Copy, MoreHorizontal, Share2, Trash2 } from 'lucide-react';

interface SlideGridProps {
  slides: Slide[];
}

const fetchPresentationThumbnail = async (presentationId: string) : Promise<string> => {
  const response = await client.get(`/presentation/thumbnail/${presentationId}`, { responseType: 'arraybuffer' });
  if (response.status === 204) {
    // TODO: Criar um objeto, onde seja possivel passar o tipo de imagem que será retornada
    return 'https://storage.googleapis.com/educamotion-static-images/poll-thumbnail.png';
  }
  const blob = new Blob([response.data], { type: 'image/png' });
  return URL.createObjectURL(blob);
}

export function SlideGrid ({ slides } : SlideGridProps) {
  const router = useRouter();
  const [thumbnails, setThumbnails] = useState({} as {[key: string]: string});

  const redirectToEditor = (slide: Slide) => {
    router.push(`/edit/${slide.presentationId}`);
  }

  useEffect(() => {
    slides.map(async slide => {
      const thumbnail = await fetchPresentationThumbnail(slide.presentationId);
      setThumbnails((prevState) => ({
        ...prevState,
        [slide.presentationId]: thumbnail
      }));
    });
  }, [slides]);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {slides.map(slide => (
        <Card key={slide.presentationId} className='group hover:shadow-lg transition-shadow duration-200'>
          <CardContent className='p-0 relative aspect-video'>
            <img
              src={thumbnails[slide.presentationId]}
              alt={slide.title}
              className='w-full h-full object-cover rounded-t-lg'
            />
            <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center'>
              <Button variant='secondary' className='mr-2' onClick={() => redirectToEditor(slide)}>
                Abrir
              </Button>
            </div>
          </CardContent>
          <CardFooter className='p-4 flex justify-between items-center'>
            <div>
              <h3 className="font-medium text-sm truncate">{slide.title}</h3>
              <p className='text-xs text-muted-foreground'>
                Visitado em {format(slide.updatedAt, 'dd MMM yyyy')}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <MoreHorizontal className='w-4 h-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem>
                  <Copy className='mr-2 h-4 w-4' />
                  Duplicar
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className='mr-2 h-4 w-4' />
                  Compartilhar
                </DropdownMenuItem>
                <DropdownMenuItem className='text-destructive'>
                  <Trash2 className='mr-2 h-4 w-4' />
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
