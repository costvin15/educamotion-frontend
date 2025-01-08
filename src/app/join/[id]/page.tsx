'use client';
import { useEffect } from 'react';
import { LogOut, Send } from 'lucide-react';

import client from '@/client';

import { Button } from '@/components/ui/Button';
import { Navbar } from '@/components/ui/NavBar';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';

import { Apresentation } from '@/app/control-panel/[id]/components/Apresentation';

import { ChatPanel } from '@/app/join/[id]/components/ChatPanel';
import { useChatStore } from '@/app/join/[id]/store/chat';

const fetchThumbnail = async (presentationId: string, slideId: string) : Promise<string> => {
  const response = await client.get(`/presentation/thumbnail/${presentationId}/${slideId}`, { responseType: 'arraybuffer' });
  const blob = new Blob([response.data], { type: 'image/png' });
  return URL.createObjectURL(blob);
}

export default function Watch({ params } : { params: { id: string }}) {
  const { panelOpened, openPanel, closePanel } = useChatStore();

  useEffect(() => {
    // store.reset();

    (async () => {
      // const data = await fetchSlides(params.id);
      // store.setPresentationId(data.presentationId);
      // store.addSlides(data.slides);

      // for (const slide of data.slides) {
      //   fetchThumbnail(data.presentationId, slide.objectId)
      //     .then((thumbnail) => store.addThumbnail(slide, thumbnail));
      // }
    })();
  }, []);

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
