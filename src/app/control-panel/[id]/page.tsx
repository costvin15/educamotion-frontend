'use client';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ClipboardList, Loader2, LogOut, Users } from "lucide-react";
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
import { useControlPanelStore } from '@/app/control-panel/[id]/store/ControlPanel';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { useWebSocketStore } from '@/app/control-panel/[id]/store/WebSocket';

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

const sendCloseClassroom = async (classroomId: string) => {
  await client.post(`/classroom/close/${classroomId}`);
};

export default function ControlPanel({ params } : { params: { id: string }}) {
  const store = useControlPanelStore();
  const session = useSession();
  const router = useRouter();
  const websocket = useWebSocketStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session.data?.user.id) return;
    websocket.connect(session.data.user.id);
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
      store.setEntryCode(classroom.entryCode);
      store.setNumberOfPages(presentation.slidesIds.length);
      store.setSlidesIds(presentation.slidesIds);
      store.setElements(presentation.elements);
    })();
  }, [params.id]);

  useEffect(() => {
    if (store.presentationId === '') return;
    (async () => {
      setLoading(true);
      const slideId = store.slidesIds[store.currentSlideIndex];
      const thumbnail = await fetchThumbnail(store.presentationId, slideId);
      store.setCurrentSlide({
        objectId: slideId,
        background: thumbnail,
        elements: store.elements[slideId] || [],
      });
      setLoading(false);
    })();
  }, [store.presentationId, store.currentSlideIndex]);

  const handleSlideChange = (slideIndex: number) => {
    if (!websocket.client) {
      if (!session.data?.user.id) {
        return;
      }
      websocket.connect(session.data.user.id);
    }

    store.setCurrentSlideIndex(slideIndex);
    performChangeSlide(store.classroomId, store.slidesIds[slideIndex]);
    websocket.send(store.classroomId, 'change-slide', { slideIndex });
  }

  const performNextSlide = () => {
    handleSlideChange(store.currentSlideIndex + 1);
  }

  const performPreviousSlide = () => {
    handleSlideChange(store.currentSlideIndex - 1);
  }

  const handleCloseClassroom = async () => {
    // TODO: Exibir mensagem de confirmação antes do fechamento da sala
    websocket.send(store.classroomId, 'close-classroom', {});
    await sendCloseClassroom(store.classroomId);
    router.push('/dashboard');
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

        <Button
          variant='outline'
          onClick={handleCloseClassroom}
        >
          <LogOut className='h-4 w-4 mr-2' />
          Encerrar Apresentação
        </Button>
      </Navbar>

      {loading && (
        <div className='absolute z-50 inset-0 flex items-center justify-center bg-secondary/80'>
          <p>Carregando...</p>
          <Loader2 className='animate-spin h-6 w-6 ml-2' />
        </div>
      )}

      <div className='grid grid-cols-3 gap-6 p-6'>
        <Apresentation />

        <div className='space-y-6'>
          <Card className='p-6 space-y-6'>
            <h2 className='text-lg'>Código da Sala: {store.entryCode}</h2>
          </Card>
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
              {websocket.client && store.classroomId && (
                <AblyProvider client={websocket.client}>
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