import { useEffect, useState } from 'react';

import { SlideElement } from "@/app/edit/[id]/types/pages";

import client from "@/client";
import { Question as QuestionDetails, QuestionType } from '@/app/elements/question/types';
import { DiscursiveQuestion } from '@/app/elements/question/Discursive';
import { ObjectiveQuestion } from '@/app/elements/question/Objective';

const fetchQuestionDetails = async (questionId: string) : Promise<QuestionDetails> => {
  const { data } = await client.get(`/element/question/detail/${questionId}`);
  return data;
}

export function Question({ element } : { element: SlideElement }) {
  const [question, setQuestion] = useState<QuestionDetails | null>(null);

  useEffect(() => {
    (async () => {
      const question = await fetchQuestionDetails(element.id);
      setQuestion(question);
    })();
  }, [element.id]);

  if (!question) {
    return null;
  }

  if (question.type == QuestionType.DISCURSIVE) {
    return <DiscursiveQuestion question={question} />;
  }

  if (question.type == QuestionType.OBJECTIVE) {
    return <ObjectiveQuestion question={question} />;
  }

  return (
    <div className='w-full h-full bg-white p-4 rounded-lg shadow-md'>
      <h3 className='font-semibold text-lg text-black'>{question.title}</h3>
      <p className='text-gray-500'>{question.description}</p>
      <span className='text-red-500'>Tipo de questão não suportado</span>
    </div>
  );
}
