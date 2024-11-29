import { format } from 'date-fns';

import { Slide } from '@/app/dashboard/types/slides';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { Copy, MoreHorizontal, Share2, Trash2 } from 'lucide-react';

interface SlideGridProps {
  slides: Slide[];
}

export function SlideGrid ({ slides } : SlideGridProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {slides.map(slide => (
        <Card key={slide.id} className='group hover:shadow-lg transition-shadow duration-200'>
          <CardContent className='p-0 relative aspect-video'>
            <img
              src={slide.thumbnail}
              alt={slide.title}
              className='w-full h-full object-cover rounded-t-lg'
            />
            <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center'>
              <Button variant='secondary' className='mr-2'>
                Abrir
              </Button>
            </div>
          </CardContent>
          <CardFooter className='p-4 flex justify-between items-center'>
            <div>
              <h3 className="font-medium text-sm truncate">{slide.title}</h3>
              <p className='text-xs text-muted-foreground'>
                Visitado em {format(slide.lastOpenedAt, 'dd MMM yyyy')}
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