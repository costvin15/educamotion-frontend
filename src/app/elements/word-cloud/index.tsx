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
import { toast } from "@/hooks/use-toast";

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

async function updateWordCloudDetails(wordCloudId: string, title: string, multipleAnswers: boolean) : Promise<WordCloudDetails> {
  const { data } = await client.put(`/element/word-cloud/update`, {
    id: wordCloudId,
    title,
    enableMultipleEntries: multipleAnswers,
  });
  return data;
}

async function addWordCloudEntry(wordCloudId: string, entry: string) : Promise<void> {
  await client.post(`/element/word-cloud/new-entry`, {
    wordCloudId,
    entry,
  });
}

export function WordCloudProperties({ element } : { element: SlideElement }) {
  const store = useWordCloudStore();
  const instance = store.wordClouds.get(element.id);
  const [ title, setTitle ] = useState<string>(instance?.title ?? '');
  const [ multipleAnswers, setMultipleAnswers ] = useState<boolean>(instance?.enableMultipleEntries ?? false);

  useEffect(() => {
    if (!instance) {
      return;
    }
    setTitle(instance.title);
    setMultipleAnswers(instance.enableMultipleEntries);
  }, [instance]);

  useEffect(() => {
    if (!instance) {
      return;
    }
    store.setWordCloud({
      ...instance,
      title,
      enableMultipleEntries: multipleAnswers,
    });
    const timeout = setTimeout(() => {
      updateWordCloudDetails(element.id, title, multipleAnswers);
    }, 500);
    return () => clearTimeout(timeout);
  }, [title, multipleAnswers]);

  if (!instance) {
    return (
      <div className='w-full h-full bg-primary rounded-lg shadow-md flex flex-col justify-center items-center'>
        <h3 className='font-semibold text-lg text-secondary'>Nuvem de Palavras</h3>
      </div>
    );
  }

  return (
    <>
      <div className='space-y-2'>
        <Label>Título</Label>
        <Input
          type='text'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>

      <div className='space-y-2'>
        <Label>Habilitar múltiplas entradas do mesmo usuário?</Label>
        <Select
          value={multipleAnswers ? '1' : '0'}
          onValueChange={(value) => setMultipleAnswers(value == '1')}
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
  const instance = store.wordClouds.get(element.id);
  const [ datum, setDatum ] = useState<Datum[]>([]);
  const [ word, setWord ] = useState<string>('');

  const fetchDistribution = async () => {
    const distribution = await fetchWordCloudDistributionFrequency(element.id);
    for (const word of distribution.frequencyDistribution) {
      store.addFrequency(element.id, word.word, word.frequency);
    }
  }

  const updateDatum = async () => {
    await fetchDistribution();
    const words : Datum[] = [];
    const wordCloud = store.words.get(element.id);
    if (!wordCloud) {
      return;
    }
    const distribution = wordCloud.datum;
    distribution.forEach((value, key) => {
      words.push({ value: key, count: value });
    });
    setDatum(words);
  }

  useEffect(() => {
    (async () => {
      const details = await fetchWordCloudDetails(element.id);
      console.log('Word cloud details:', details);
      store.addWordCloud(details);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await updateDatum();

      if (onLoaded) {
        onLoaded();
      }
    })();
  }, [element.id]);

  if (!instance) {
    return (
      <div className='w-full h-full bg-primary rounded-lg shadow-md flex flex-col justify-center items-center'>
        <h3 className='font-semibold text-lg text-secondary'>Nuvem de Palavras</h3>
      </div>
    );
  }

  const handleSend = () => {
    if (word.length == 0) {
      return;
    }

    (async () => {
      const currentWord = word.trim().toLowerCase();
  
      console.log(`Adding word: ${currentWord}`);
      store.addWord(element.id, currentWord);
      setWord('');
      try {      
        await addWordCloudEntry(element.id, currentWord);
      } catch (error) {
        toast({
          title: 'Oops!',
          description: 'Não é possível adicionar mais palavras a esta nuvem de palavras.',
          variant: 'destructive',
        });
      }
      await updateDatum();
    })();
  }

  return (
    <div className='w-full h-full bg-primary rounded-lg shadow-md flex flex-col flex-shrink'>
      <div className='p-4'>
        <h3 className='font-semibold text-lg text-secondary'>{instance.title.length == 0 ? 'Nuvem de Palavras' : instance.title}</h3>
      </div>
      <div className='absolute max-w-full bottom-0 w-full p-4'>
        <WordCloudRoot
          key={datum.length}
          data={datum}
        />
        <div className='flex gap-2'>
          <Input
            placeholder='Digite uma palavra'
            value={word}
            onChange={(event) => setWord(event.target.value)}
            onKeyDown={(event) => {
              if (event.key == 'Enter') {
                handleSend();
              }
            }}
          />
          <Button
            variant='secondary'
            onClick={handleSend}
          >
            <Send className='w-6 h-6' />
          </Button>
        </div>
      </div>
    </div>
  );
}
