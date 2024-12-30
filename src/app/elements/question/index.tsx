import { useEffect, useState } from 'react';

import { SlideElement } from "@/app/edit/[id]/types/pages";
import { Button } from "@/components/ui/Button";

import client from "@/client";
import { Question as QuestionType } from '@/app/elements/question/types';
import { DiscursiveQuestion } from '@/app/elements/question/Discursive';

const fetchQuestionDetails = async (questionId: string) : Promise<QuestionType> => {
  const { data } = await client.get(`/element/question/detail/${questionId}`);
  return data;
}

export function Question({ element } : { element: SlideElement }) {
  const [question, setQuestion] = useState<QuestionType | null>(null);

  useEffect(() => {
    (async () => {
      const question = await fetchQuestionDetails(element.id);
      setQuestion(question);
    })();
  }, []);

  if (!question) {
    return null;
  }

  console.log(question);
  if (question.type == 'DISCURSIVE') {
    return <DiscursiveQuestion question={question} />;
  }

  return (
    <div className='w-full h-full bg-white p-4 rounded-lg shadow-md'>
      <h3 className='font-semibold text-lg text-black'>{question.title}</h3>
      <p className='text-gray-500'>{question.description}</p>
      <div className='grid grid-cols-2 gap-2 mt-4'>
        {/* {element.data?.alternatives.map((alternative, index) => (
          <div key={index}>
            <Button variant='secondary' className='w-full'>
              {alternative.content}
            </Button>
          </div>
        ))} */}
      </div>
    </div>
  );
}
