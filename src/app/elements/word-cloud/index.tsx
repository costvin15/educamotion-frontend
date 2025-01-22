import { useEffect } from "react";

import client from '@/client';

import { useWordCloudStore } from "@/app/elements/word-cloud/store/word-cloud";

import { SlideElement } from "@/app/edit/[id]/types/pages";
import { ElementProps } from "@/app/elements";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { WordCloud as WordCloudDetails } from "@/app/elements/word-cloud/types";

async function fetchWordCloudDetails(wordCloudId: string) : Promise<WordCloudDetails> {
  const { data } = await client.get(`/element/word-cloud/detail/${wordCloudId}`);
  return data;
}

export function WordCloudProperties({ element } : { element: SlideElement }) {
  return (
    <>
      <div className='space-y-2'>
        <Label>Título</Label>
        <Input
          type='text'
          value={''}
          onChange={(event) => {}}
        />
      </div>

      <div className='space-y-2'>
        <Label>Habilitar múltiplas respostas do mesmo usuário?</Label>
        <Select
          value='1'
        >
          <SelectTrigger>
            <SelectValue placeholder='Selecione' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='1' defaultChecked>Sim</SelectItem>
            <SelectItem value='0'>Não</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  )  
};

export function WordCloud({ element, onAnswerSend, onLoaded } : ElementProps) {
  const store = useWordCloudStore();

  useEffect(() => {
    if (onLoaded) {
      onLoaded();
    }
  }, []);

  return (
    <div className='w-full h-full bg-primary p-4 rounded-lg shadow-md'>
      <h3 className='text-secondary text-lg font-bold'>Nuvem de Palavras</h3>
    </div>
  );
}
