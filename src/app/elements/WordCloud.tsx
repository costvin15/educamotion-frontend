import { useState, useEffect } from 'react';

import { Card, CardContent } from "@/components/ui/Card";
import { SlideElement } from "@/app/edit/[id]/types/pages";

import * as Root from 'react-d3-cloud';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { Input } from "@/components/ui/Input";

const data = [
  { text: 'Hey', value: 100 },
  { text: 'lol', value: 200 },
  { text: 'first impression', value: 800 },
  { text: 'very cool', value: 100 },
  { text: 'duck', value: 10 },
];

const schemeCategory10ScaleOrdinal = scaleOrdinal(schemeCategory10);

export function WordCloud({ element } : { element: SlideElement }) {
  const [words, setWords] = useState<{ text: string, value: number }[]>([]);

  const makeWordFrequency = (words: string[]) => {
    const wordFrequency: { [key: string]: number } = {};
    words.forEach((word) => {
      if (wordFrequency[word]) {
        wordFrequency[word] += 100;
      } else {
        wordFrequency[word] = 100;
      }
    });
    const wordFrequencyArray = Object.keys(wordFrequency).map((word) => ({
      text: word,
      value: wordFrequency[word],
    }));
    return wordFrequencyArray;
  }

  useEffect(() => {
    const answer = makeWordFrequency(element.data?.initialWords || []);
    setWords(answer);
  }, [element.data?.initialWords]);

  return (
    <>
      <Root.default
        key={words.length}
        data={words}
        width={700}
        height={300}
        font="Helvetica"
        fontWeight="bold"
        fontSize={(word) => Math.log2(word.value) * 10}
        spiral="rectangular"
        rotate={(word) => 0}
        padding={5}
        random={Math.random}
        fill={(word: string, index: string) => schemeCategory10ScaleOrdinal(index)}
        onWordClick={(event, d) => {
          console.log(`onWordClick: ${d.text}`);
        }}
        onWordMouseOver={(event, d) => {
          console.log(`onWordMouseOver: ${d.text}`);
        }}
        onWordMouseOut={(event, d) => {
          console.log(`onWordMouseOut: ${d.text}`);
        }}
      />
      <Card>
        <CardContent className='!p-1'>
          <Input
            type='text'
            placeholder={element.content || 'Insira uma palavra'}      
          />
        </CardContent>
      </Card>
    </>
  );
}
