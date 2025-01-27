import { forwardRef } from 'react';
import { TagCloud } from 'react-tagcloud';

export interface Datum {
  value: string;
  count: number;
}

interface WordCloudProps {
  data: Datum[];
}

export const WordCloud = forwardRef<HTMLDivElement, WordCloudProps>(
  ({ data, ...props }, ref) => (
    <div
      ref={ref}
      className='w-full h-full'
      {...props}
    >
      <TagCloud
        minSize={12}
        maxSize={35}
        tags={data}
        colorOptions={{
          luminosity: 'dark',
          hue: 'blue',
        }}
        randomSeed={1}
      />
    </div>
  )
);
