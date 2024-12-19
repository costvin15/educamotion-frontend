import { Card, CardContent } from "@/components/ui/Card";
import { SlideElement } from "@/app/edit/[id]/types/pages";

import WordCloud from 'react-d3-cloud';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

const data = [
  { text: 'Hey', value: 1000 },
  { text: 'lol', value: 200 },
  { text: 'first impression', value: 800 },
  { text: 'very cool', value: 1000000 },
  { text: 'duck', value: 10 },
];

const schemeCategory10ScaleOrdinal = scaleOrdinal(schemeCategory10);

export function WordCloudElement({ element } : { element: SlideElement }) {
  return (
    <Card className='w-full h-full'>
      <CardContent className='!py-6'>
        <WordCloud
          data={data}
          width={500}
          height={500}
          font="Times"
          fontStyle="italic"
          fontWeight="bold"
          fontSize={(word) => Math.log2(word.value) * 5}
          spiral="rectangular"
          rotate={(word) => word.value % 360}
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
      </CardContent>
    </Card>
  );
}
