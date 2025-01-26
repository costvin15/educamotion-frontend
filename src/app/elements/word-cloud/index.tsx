import { useEffect, useState } from "react";

import client from '@/client';

import { useWordCloudStore } from "@/app/elements/word-cloud/store/word-cloud";

import { SlideElement } from "@/app/edit/[id]/types/pages";
import { ElementProps } from "@/app/elements";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { WordCloud as WordCloudDetails, WordCloudDistribution } from "@/app/elements/word-cloud/types";
import { WordCloud as WordCloudRoot } from "@/components/ui/WordCloud";
import { Button } from "@/components/ui/Button";
import { Send } from "lucide-react";

interface Datum {
  value: string;
  count: number;
}

async function fetchWordCloudDetails(wordCloudId: string) : Promise<WordCloudDetails> {
  const { data } = await client.get(`/element/word-cloud/detail/${wordCloudId}`);
  return data;
}

async function fetchWordCloudDistributionFrequency(wordCloudId: string) : Promise<WordCloudDistribution> {
  const { data } = await client.get(`/element/word-cloud/frequency-distribution/${wordCloudId}`);
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
  const [ datum, setDatum ] = useState<Datum[]>([]);

  const fetchDistribution = async () => {
    const distribution = await fetchWordCloudDistributionFrequency(element.id);
    for (const word of distribution.frequencyDistribution) {
      store.addFrequency(word.word, word.frequency);
    }
  }

  useEffect(() => {
    (async () => {
      await fetchDistribution();
      const words : Datum[] = [];
      store.words.forEach((value, key) => {
        words.push({ value: key, count: value });
      });
      setDatum(words);

      if (onLoaded) {
        onLoaded();
      }
    })();
  }, [element.id]);

  return (
    <div className='w-full h-full bg-primary rounded-lg shadow-md flex flex-col flex-shrink'>
      <div className='p-4'>
        <h3 className='font-semibold text-lg text-secondary'>Nuvem de Palavras</h3>
      </div>
      <div className='absolute max-w-full bottom-0 w-full p-4'>
        <WordCloudRoot
          data={datum}
        />
        <div className='flex gap-2'>
          <Input
            placeholder='Digite uma palavra'
          />
          <Button
            variant='secondary'
          >
            <Send className='w-6 h-6' />
          </Button>
        </div>
      </div>
    </div>
  );
}
