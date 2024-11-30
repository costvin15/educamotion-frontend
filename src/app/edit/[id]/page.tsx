import { Button } from '@/components/ui/Button';
import { Navbar } from '@/components/ui/NavBar';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { Download, ImageIcon, Play, Plus, Redo, Type, Undo } from 'lucide-react';

export default function Edit() {
  return (
    <div>
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

        <div className="mx-2 h-6 w-px bg-border" />

        <Button variant='outline' size='icon'>
          <Undo className='h-4 w-4' />
        </Button>
        <Button variant='outline' size='icon'>
          <Redo className='h-4 w-4' />
        </Button>

        <div className="mx-2 h-6 w-px bg-border" />

        <Button variant='outline' size='icon'>
          <Download className='h-4 w-4' />
        </Button>

        <Button>
          <Play className='mr-2 h-4 w-4' />
          Apresentar
        </Button>
      </Navbar>
    </div>
  );
}
