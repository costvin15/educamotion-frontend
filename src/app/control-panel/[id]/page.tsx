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

import { DetailPresentation } from "@/app/edit/[id]/types/pages";
import { useEditorStore } from "@/app/edit/[id]/store/editor";

const fetchPresentationDetails = async (slideId: string) : Promise<DetailPresentation> => {
  const { data } = await client.get(`/presentation/detail/${slideId}`);
  return data;
};

const fetchThumbnail = async (presentationId: string, slideId: string) : Promise<string> => {
  const response = await client.get(`/presentation/thumbnail/${presentationId}/${slideId}`, { responseType: 'arraybuffer' });
  const blob = new Blob([response.data], { type: 'image/png' });
  return URL.createObjectURL(blob);
}

export default function ControlPanel({ params } : { params: { id: string }}) {
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
  }, [params.id]);

  const performNextSlide = () => {
    store.setCurrentSlide(store.currentSlideIndex + 1);
  }

  const performPreviousSlide = () => {
    store.setCurrentSlide(store.currentSlideIndex - 1);
  }

  return (
    <div className='flex h-screen flex-col'>
      <Navbar>
        <ThemeSwitcher />

        <Button variant='outline' onClick={performPreviousSlide} disabled={store.currentSlideIndex === 0}>
          <ChevronLeft className='h-4 w-4 mr-1' />
          Retroceder
        </Button>

        <Button variant='outline' disabled>
          Slide {store.currentSlideIndex + 1} de {store.slides.length}
        </Button>

        <Button variant='outline' onClick={performNextSlide} disabled={store.currentSlideIndex === store.slides.length - 1}>
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