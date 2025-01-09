'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { LogOut, Send } from 'lucide-react';
import * as Ably from 'ably';

import client from '@/client';

import { Button } from '@/components/ui/Button';
import { Navbar } from '@/components/ui/NavBar';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';

import { useChatStore } from '@/app/join/[id]/store/chat';
import { usePresentationStore } from '@/app/join/[id]/store/presentation';

import { Classroom, DetailPresentation } from '@/app/join/[id]/types';
import { ChatPanel } from '@/app/join/[id]/components/ChatPanel';
import { Apresentation } from '@/app/join/[id]/components/Apresentation';

const fetchClassroomDetails = async (entryCode: string) : Promise<Classroom> => {
  const { data } = await client.get(`/classroom/entry-code/${entryCode}`);
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

export default function Watch({ params } : { params: { id: string }}) {
  const session = useSession();
  const store = usePresentationStore();
  const { panelOpened, openPanel, closePanel } = useChatStore();
  const [ ablyClient, setAblyClient ] = useState<Ably.Realtime | null>(null);

  useEffect(() => {
    if (!session.data?.user?.id)
      return;
    if (!store.classroomId)
      return;
    const client = new Ably.Realtime({ key: process.env.NEXT_PUBLIC_ABLY_API_KEY, clientId: session.data.user.id });
    setAblyClient(client);
    client.channels.get(store.classroomId)
      .subscribe('change-slide', async (message) => {
        store.setCurrentSlideIndex(message.data.slideIndex);
      });
    client.channels.get(store.classroomId).presence.enter();
    return () => {
      client.channels.get(store.classroomId).presence.leave();
      client.close();
    }
  }, [session.data, store.classroomId]);

  useEffect(() => {
    (async () => {
      const classroom = await fetchClassroomDetails(params.id);
      const presentation = await fetchPresentationDetails(classroom.presentation.id);

      if (session.data?.user?.id) {
        store.setUserId(session.data.user.id);
      }
      store.setClassroomId(classroom.id);
      store.setPresentationId(presentation.id);
      store.setSlidesIds(presentation.slidesIds);
      store.setElements(presentation.elements);
      store.setCurrentSlideIndex(0);
      if (classroom.currentSlide) {
        const slideIndex = presentation.slidesIds.findIndex((id) => id === classroom.currentSlide);
        store.setCurrentSlideIndex(slideIndex);
      }
    })();
  }, [params.id, session.data]);

  useEffect(() => {
    if (!store.presentationId) return;

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

  const handleChat = () => {
    if (panelOpened) {
      return closePanel();
    }

    return openPanel();
  }

  return (
    <div className='flex h-screen flex-col'>
      <Navbar>
        <ThemeSwitcher />

        <Button variant='outline' onClick={handleChat}>
          <Send className='h-4 w-4 mr-2' />
          Chat
        </Button>

        <Button variant='outline'>
          <LogOut className='h-4 w-4 mr-2' />
          Sair
        </Button>
      </Navbar>
  
      <div className='h-screen p-6'>
        <Apresentation />
      </div>

      <ChatPanel />
    </div>
  );
}
