'use client';
import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, ClipboardList, LogOut, Users } from "lucide-react";

import client from '@/client';

import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/ui/NavBar";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

import { Apresentation } from "@/app/control-panel/[id]/components/Apresentation";
import { ViewersList } from "@/app/control-panel/[id]/components/ViewersList";
import { InteractionLogs } from "@/app/control-panel/[id]/components/InteractionLogs";

import { Classroom, DetailPresentation } from '@/app/control-panel/[id]/types';
import { useControlPanelStore } from '@/app/control-panel/[id]/store';

const fetchClassroomDetails = async (presentationId: string) : Promise<Classroom> => {
  const { data } = await client.get(`/classroom/presentation/${presentationId}`);
  return data;
};

const fetchPresentationDetails = async (presentationId: string) : Promise<DetailPresentation> => {
  const { data } = await client.get(`/presentation/detail/${presentationId}`);
  return data;
};

const fetchThumbnail = async (presentationId: string, slideId: string) : Promise<string> => {
  const response = await client.get(`/presentation/thumbnail/${presentationId}/${slideId}`, { responseType: 'arraybuffer' });
  const blob = new Blob([response.data], { type: 'image/png' });
  return URL.createObjectURL(blob);
}

export default function ControlPanel({ params } : { params: { id: string }}) {
  const store = useControlPanelStore();

  useEffect(() => {
    store.reset();

    (async () => {
      const [classroom, presentation] = await Promise.all([
        fetchClassroomDetails(params.id),
        fetchPresentationDetails(params.id),
      ]);

      store.setClassroomId(classroom.id);
      store.setPresentationId(classroom.presentation.id);
      store.setNumberOfPages(presentation.slidesIds.length);
      store.setSlidesIds(presentation.slidesIds);
      store.setElements(presentation.elements);
      console.log(store, classroom, presentation);
    })();
  }, [params.id]);

  useEffect(() => {
    if (store.presentationId === '') return;
    (async () => {
      const slideId = store.slidesIds[store.currentSlideIndex];
      const thumbnail = await fetchThumbnail(store.presentationId, slideId);
      store.setCurrentSlide({
        objectId: slideId,
        background: thumbnail,
        elements: store.elements[slideId] || [],
      });
    })();
  }, [store.presentationId, store.currentSlideIndex]);

  const handleSlideChange = async (slideId: string) => {
  }

  const performNextSlide = () => {
    store.setCurrentSlideIndex(store.currentSlideIndex + 1);
  }

  const performPreviousSlide = () => {
    store.setCurrentSlideIndex(store.currentSlideIndex - 1);
  }

  return (
    <div className='flex h-screen flex-col'>
      <Navbar>
        <ThemeSwitcher />

        <Button
          variant='outline'
          onClick={performPreviousSlide}
          disabled={store.currentSlideIndex === 0}
        >
          <ChevronLeft className='h-4 w-4 mr-1' />
          Retroceder
        </Button>

        <Button
          variant='outline'
          disabled
        >
          Slide {store.currentSlideIndex + 1} de {store.numberOfPages}
        </Button>

        <Button
          variant='outline'
          onClick={performNextSlide}
          disabled={store.currentSlideIndex === store.slidesIds.length - 1}
        >
          <ChevronRight className='h-4 w-4 mr-1' />
          Avançar
        </Button>

        <Button variant='outline'>
          <LogOut className='h-4 w-4 mr-2' />
          Encerrar Apresentação
        </Button>
      </Navbar>

      <div className='grid grid-cols-3 gap-6 p-6'>
        <Apresentation />

        <div className='space-y-6'>
          <Tabs defaultValue='viewers'>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='viewers' className='flex items-center gap-2'>
                <Users className='h-4 w-4' />
                Espectadores
              </TabsTrigger>
              <TabsTrigger value='logs' className='flex items-center gap-2'>
                <ClipboardList className='h-4 w-4' />
                Eventos
              </TabsTrigger>
            </TabsList>
            <TabsContent value='viewers'>
              <ViewersList />
            </TabsContent>
            <TabsContent value='logs'>
              <InteractionLogs />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}