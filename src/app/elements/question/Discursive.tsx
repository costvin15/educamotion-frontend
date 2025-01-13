import { ChangeEvent, useEffect, useState } from 'react';

import { QuestionProps } from '@/app/elements/question/types';
import { Textarea } from '@/components/ui/Textarea';
import { mergeClassNames } from '@/components/utils';

export function DiscursiveQuestion({ question, onAnswer } : QuestionProps) {
  const [answer, setAnswer] = useState('');
  const [charCount, setCharCount] = useState(0);
  const maxLength = 255;

  useEffect(() => {
    if (!question) {
      return;
    }

    const timeout = setTimeout(() => {
      onAnswer(answer);
    }, 500);
    return () => clearTimeout(timeout);
  }, [answer]);

  if (!question) {
    return null;
  }

  const handleAnswerChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setAnswer(value);
      setCharCount(value.length);
    }
  };

  return (
    <div className='w-full h-full bg-white p-4 rounded-lg shadow-md flex flex-col'>
      <h3 className='font-semibold text-lg text-black'>{question.title}</h3>
      <p className='text-gray-500'>{question.description}</p>
      <div className='flex-grow mb-4'>
        <Textarea
          placeholder='Digite sua resposta...'
          className={
            mergeClassNames(
              'min-h-[200px] resize-none',
              charCount >= maxLength && 'border-destructive'
            )
          }
          value={answer}
          onChange={handleAnswerChange}
        />
        <div className='flex justify-end mt-2'>
          <span
            className={mergeClassNames(
              'text-sm text-muted-foreground',
              charCount >= maxLength && 'text-destructive'
            )}
          >
            {charCount}/{maxLength} caracteres
          </span>
        </div>
      </div>
    </div>
  );
}
