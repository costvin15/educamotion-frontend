'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { LogOut, Send } from 'lucide-react';
import Link from 'next/link';

import client from '@/client';

import { Button } from '@/components/ui/Button';
import { Navbar } from '@/components/ui/NavBar';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';

import { useChatStore } from '@/app/join/[id]/store/chat';
import { usePresentationStore } from '@/app/join/[id]/store/presentation';
import { useWebSocketStore } from '@/app/join/[id]/store/websocket';

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

export default function Join({ params } : { params: { id: string }}) {
  const session = useSession();
  const store = usePresentationStore();
  const websocket = useWebSocketStore();
  const { panelOpened, openPanel, closePanel } = useChatStore();

  useEffect(() => {
    (async () => {
      if (!session.data?.user?.id) {
        console.log('1. No user id');
        return;
      }
      if (!store.classroomId) {
        console.log('2. No classroom id');
        return;
      }
      console.log('3. Connecting to websocket');
      websocket.connect(session.data.user.id);
      if (!websocket.client) {
        console.log('4. No websocket client. Rolling back', websocket);
        return;
      }
      console.log('5. Subscribing to classroom channel');
      await websocket.subscribe(store.classroomId, 'change-slide', async (message) => {
        console.log('6. Received message', message);
        store.setCurrentSlideIndex(message.data.slideIndex);
      });
      console.log('7. Entering presence');
      websocket.enterPresence(store.classroomId);
    })();
    return () => {
      if (!websocket.client) {
        console.log('8. No websocket client. Rolling back');
        return;
      }
      console.log('9. Leaving presence');
      websocket.leavePresence(store.classroomId);
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

        <Link href='/'>
          <Button variant='outline'>
            <LogOut className='h-4 w-4 mr-2' />
            Sair
          </Button>
        </Link>
      </Navbar>
  
      <div className='h-screen p-6'>
        <Apresentation />
      </div>

      <ChatPanel />
    </div>
  );
}
