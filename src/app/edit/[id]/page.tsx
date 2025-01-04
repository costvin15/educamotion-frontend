'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Download, Play, Plus, Puzzle, Radio, Redo, Undo } from 'lucide-react';

import client from '@/client';

import { Button } from '@/components/ui/Button';
import { Navbar } from '@/components/ui/NavBar';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';

import { DetailPresentation } from '@/app/edit/[id]/types/pages';
import { useEditorStore } from '@/app/edit/[id]/store/editor';

import { PageThumbnails } from '@/app/edit/[id]/components/PageThumbnails';
import { Canvas } from '@/app/edit/[id]/components/Canvas';
import { Properties } from '@/app/edit/[id]/components/Properties';
import { AddSlideModal } from '@/app/edit/[id]/components/AddSlideModal';
import { AddResourceModal } from '@/app/edit/[id]/components/AddResourceModal';
import { Classroom } from '@/app/edit/[id]/types/classroom';

const fetchPresentationDetails = async (slideId: string) : Promise<DetailPresentation> => {
  const { data } = await client.get(`/presentation/detail/${slideId}`);
  return data;
}

const fetchThumbnail = async (presentationId: string, slideId: string) : Promise<string> => {
  const response = await client.get(`/presentation/thumbnail/${presentationId}/${slideId}`, { responseType: 'arraybuffer' });
  const blob = new Blob([response.data], { type: 'image/png' });
  return URL.createObjectURL(blob);
}

const fetchClassroom = async(presentationId: string) : Promise<Classroom> => {
  const { data } = await client.get(`/classroom/get/${presentationId}`);
  return data;
}

export default function Edit({ params } : { params: { id: string }}) {
  const [ isAddSlideModalOpen, setAddSlideModalOpen ] = useState(false);
  const [ isAddResourceModalOpen, setAddResourceModalOpen ] = useState(false);
  const [ currentClassroom, setCurrentClassroom ] = useState<Classroom | null>(null);
  const store = useEditorStore();

  useEffect(() => {
    store.reset();

    (async () => {
      const presentation = await fetchPresentationDetails(params.id);
      store.setPresentationId(presentation.id);

      for (let i = 0; i < presentation.slidesIds.length; i++) {
        const slideId = presentation.slidesIds[i];
        fetchThumbnail(presentation.id, slideId)
          .then((thumbnail) => store.addSlideInPosition({
            objectId: slideId,
            background: thumbnail,
            elements: presentation.elements[slideId] || [],
          }, i));
      }

      store.removeSlide('initial-slide');
    })();
  }, []);

  useEffect(() => {
    try {
      fetchClassroom(params.id)
        .then((classroom) => setCurrentClassroom(classroom));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className='flex h-screen flex-col'>
      <Navbar>
        <ThemeSwitcher />

        <Button variant='outline' size='icon' onClick={() => setAddSlideModalOpen(true)}>
          <Plus className='h-4 w-4' />
        </Button>
        <Button variant='outline' size='icon' onClick={() => setAddResourceModalOpen(true)}>
          <Puzzle className='h-4 w-4' />
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

        {currentClassroom ? (
          <Link href={`/control-panel/${params.id}`}>
            <Button>
              <Radio className='mr-2 h-4 w-4' />
              Apresentando
            </Button>
          </Link>
        ) : (
          <Button>
            <Play className='mr-2 h-4 w-4' />
            Apresentar
          </Button>
        )}
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

      <AddSlideModal isOpen={isAddSlideModalOpen} onClose={() => setAddSlideModalOpen(false)} />
      <AddResourceModal isOpen={isAddResourceModalOpen} onClose={() => setAddResourceModalOpen(false)} />
    </div>
  );
}
