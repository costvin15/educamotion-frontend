'use client';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ClipboardList, LogOut, Users } from "lucide-react";
import * as Ably from 'ably';
import { useSession } from 'next-auth/react';
import { AblyProvider, ChannelProvider } from 'ably/react';

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
};

const performChangeSlide = async (presentationId: string, slideIndex: string) : Promise<Classroom> => {
  const { data } = await client.put(`/classroom/change-slide/${presentationId}/${slideIndex}`);
  return data;
};

export default function ControlPanel({ params } : { params: { id: string }}) {
  const store = useControlPanelStore();
  const session = useSession();
  const [ablyClient, setAblyClient] = useState<Ably.Realtime | null>(null);

  useEffect(() => {
    if (!session.data?.user.id) return;
    const client = new Ably.Realtime({ key: process.env.NEXT_PUBLIC_TEACHER_ABLY_API_KEY, clientId: session.data.user.id });
    setAblyClient(client);
  }, [session.data?.user.id]);

  useEffect(() => {
    store.reset();

    (async () => {
      const [classroom, presentation] = await Promise.all([
        fetchClassroomDetails(params.id),
        fetchPresentationDetails(params.id),
      ]);

      store.setCurrentSlideIndex(0);
      if (classroom.currentSlide) {
        const slideIndex = presentation.slidesIds.findIndex((id) => id === classroom.currentSlide);
        store.setCurrentSlideIndex(slideIndex);
      }
      store.setClassroomId(classroom.id);
      store.setPresentationId(classroom.presentation.id);
      store.setNumberOfPages(presentation.slidesIds.length);
      store.setSlidesIds(presentation.slidesIds);
      store.setElements(presentation.elements);
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

  const handleSlideChange = (slideIndex: number) => {
    if (!ablyClient) {
      console.error('Ably client is not ready');
      return;
    }

    store.setCurrentSlideIndex(slideIndex);
    performChangeSlide(store.classroomId, store.slidesIds[slideIndex]);
    ablyClient.channels.get(store.classroomId).publish('change-slide', { slideIndex: slideIndex });
  }

  const performNextSlide = () => {
    handleSlideChange(store.currentSlideIndex + 1);
  }

  const performPreviousSlide = () => {
    handleSlideChange(store.currentSlideIndex - 1);
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
              {ablyClient && store.classroomId && (
                <AblyProvider client={ablyClient}>
                  <ChannelProvider channelName={store.classroomId}>
                    <ViewersList />
                  </ChannelProvider>
                </AblyProvider>
              )}
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