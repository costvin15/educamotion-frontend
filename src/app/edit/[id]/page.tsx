'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChartArea, Download, Play, Plus, Puzzle, Radio, Redo, Undo } from 'lucide-react';

import client from '@/client';

import { Button } from '@/components/ui/Button';
import { Navbar } from '@/components/ui/NavBar';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';

import { Classroom } from '@/app/edit/[id]/types/classroom';
import { DetailPresentation } from '@/app/edit/[id]/types/pages';

import { useEditorStore } from '@/app/edit/[id]/store/editor';

import { Canvas } from '@/app/edit/[id]/components/Canvas';
import { Properties } from '@/app/edit/[id]/components/Properties';
import { PageThumbnails } from '@/app/edit/[id]/components/PageThumbnails';
import { AddResourceModal } from '@/app/edit/[id]/components/AddResourceModal';
import { NewClassroomModal } from '@/app/edit/[id]/components/NewClassroomModal';
import { ClassroomCreatedModal } from '@/app/edit/[id]/components/ClassroomCreatedModal';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip';

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
  const { data } = await client.get(`/classroom/presentation/${presentationId}`);
  return data;
}

export default function Edit({ params } : { params: { id: string }}) {
  const [ isAddResourceModalOpen, setAddResourceModalOpen ] = useState(false);
  const [ isNewClassroomModalOpen, setNewClassroomModalOpen ] = useState(false);
  const [ currentClassroom, setCurrentClassroom ] = useState<Classroom | null>(null);
  const [ displayClassroomCreatedModal, setDisplayClassroomCreatedModal ] = useState(false);
  const store = useEditorStore();

  const onClassroomCreated = (classroom: Classroom) => {
    setCurrentClassroom(classroom);
    setDisplayClassroomCreatedModal(true);
  }

  useEffect(() => {
    store.reset();

    (async () => {
      const presentation = await fetchPresentationDetails(params.id);
      store.setPresentationId(presentation.id);
      store.initializeSlides(presentation.slidesIds.length);

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
      fetchClassroom(params.id)
        .then((classroom) => onClassroomCreated(classroom))
        .catch(() => console.log('No classroom found'));
  }, []);

  return (
    <div className='flex h-screen flex-col'>
      <Navbar>
        <ThemeSwitcher />

        <Button variant='outline' size='icon' onClick={() => setAddResourceModalOpen(true)}>
          <Puzzle className='h-4 w-4' />
        </Button>

        <div className='mx-2 h-6 w-px bg-border' />

        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='outline' size='icon'>
                <ChartArea className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              className='bg-primary text-primary-foreground'
              sideOffset={5}
            >
              <p>Resultados</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className='mx-2 h-6 w-px bg-border' />

        {currentClassroom ? (
          <Link href={`/control-panel/${params.id}`}>
            <Button>
              <Radio className='mr-2 h-4 w-4' />
              Apresentando: {currentClassroom.entryCode}
            </Button>
          </Link>
        ) : (
          <Button onClick={() => setNewClassroomModalOpen(true)}>
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

        <ScrollArea className='w-80 border-l border-border bg-card p-4'>
          <Properties />
        </ScrollArea>
      </div>

      <AddResourceModal isOpen={isAddResourceModalOpen} onClose={() => setAddResourceModalOpen(false)} />
      <NewClassroomModal
        isOpen={isNewClassroomModalOpen}
        onClose={() => setNewClassroomModalOpen(false)}
        onSuccessfulCreate={onClassroomCreated}
      />
      {currentClassroom && (
        <ClassroomCreatedModal
          isOpen={displayClassroomCreatedModal}
          onClose={() => setDisplayClassroomCreatedModal(false)}
          classroom={currentClassroom}
        />
      )}
    </div>
  );
}
