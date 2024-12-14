import { Button } from '@/components/ui/Button';
import { Navbar } from '@/components/ui/NavBar';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { Download, ImageIcon, Play, Plus, Redo, Type, Undo } from 'lucide-react';
import { PageThumbnails } from '@/app/edit/[id]/components/PageThumbnails';
import { Canvas } from '@/app/edit/[id]/components/Canvas';
import { Properties } from '@/app/edit/[id]/components/Properties';

export default function Edit() {
  return (
    <div className='flex h-screen flex-col'>
      <Navbar>
        <ThemeSwitcher />

        <Button variant='outline' size='icon'>
          <Plus className='h-4 w-4' />
        </Button>
        <Button variant='outline' size='icon'>
          <Type className='h-4 w-4' />
        </Button>
        <Button variant='outline' size='icon'>
          <ImageIcon className='h-4 w-4' />
        </Button>

        <div className='mx-2 h-6 w-px bg-border' />

        <Button variant='outline' size='icon'>
          <Undo className='h-4 w-4' />
        </Button>
        <Button variant='outline' size='icon'>
          <Redo className='h-4 w-4' />
        </Button>

        <div className='mx-2 h-6 w-px bg-border' />

        <Button variant='outline' size='icon'>
          <Download className='h-4 w-4' />
        </Button>

        <Button>
          <Play className='mr-2 h-4 w-4' />
          Apresentar
        </Button>
      </Navbar>

      <div className='flex flex-1 overflow-hidden'>
        <div className='w-64 border-r border-border bg-card p-4'>
          <PageThumbnails />
        </div>

        <div className='flex-1 overflow-hidden'>
          <Canvas />
        </div>

        <div className='w-80 border-l border-border bg-card p-4'>
          <Properties />
        </div>
      </div>
    </div>
  );
}
