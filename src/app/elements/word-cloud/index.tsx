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
  const [ title, setTitle ] = useState<string>(store.title);
  const [ multipleAnswers, setMultipleAnswers ] = useState<boolean>(store.multipleAnswers);

  useEffect(() => {
    store.setTitle(title);
    const timeout = setTimeout(() => {
      updateWordCloudDetails(element.id, title, multipleAnswers);
    }, 500);
    return () => clearTimeout(timeout);
  }, [title, multipleAnswers]);

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
  const [ datum, setDatum ] = useState<Datum[]>([]);
  const [ word, setWord ] = useState<string>('');

  const fetchDistribution = async () => {
    const distribution = await fetchWordCloudDistributionFrequency(element.id);
    console.log(distribution);
    for (const word of distribution.frequencyDistribution) {
      console.log(`Adding word: ${word.word} with frequency ${word.frequency}`);
      store.addFrequency(word.word, word.frequency);
    }
  }

  const updateDatum = async () => {
    await fetchDistribution();
    const words : Datum[] = [];
    store.words.forEach((value, key) => {
      words.push({ value: key, count: value });
    });
    setDatum(words);
  }

  useEffect(() => {
    (async () => {
      const details = await fetchWordCloudDetails(element.id);
      store.setTitle(details.title);
      store.setMultipleAnswers(details.enableMultipleEntries);
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

  const handleSend = () => {
    if (word.length == 0) {
      return;
    }

    (async () => {
      const currentWord = word.trim().toLowerCase();
  
      console.log(`Adding word: ${currentWord}`);
      store.addWord(currentWord);
      setWord('');
      await addWordCloudEntry(element.id, currentWord);
      await updateDatum();
    })();
  }

  return (
    <div className='w-full h-full bg-primary rounded-lg shadow-md flex flex-col flex-shrink'>
      <div className='p-4'>
        <h3 className='font-semibold text-lg text-secondary'>{store.title.length == 0 ? 'Nuvem de Palavras' : store.title}</h3>
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
