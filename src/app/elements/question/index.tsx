import { useEffect, useState } from 'react';

import { SlideElement } from "@/app/edit/[id]/types/pages";

import client from "@/client";
import { Question as QuestionDetails, QuestionType } from '@/app/elements/question/types';
import { DiscursiveQuestion } from '@/app/elements/question/Discursive';
import { ObjectiveQuestion, ObjectiveQuestionProperties } from '@/app/elements/question/Objective';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';

const fetchQuestionDetails = async (questionId: string) : Promise<QuestionDetails> => {
  const { data } = await client.get(`/element/question/detail/${questionId}`);
  return data;
}

export async function updateQuestionDetails(details: Partial<QuestionDetails>) {
  await client.put(`/element/question/update`, {
    ...details,
    question: details.title,
  });
}

export function QuestionProperties({ element } : { element: SlideElement }) {
  const [question, setQuestion] = useState<QuestionDetails | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    (async () => {
      const question = await fetchQuestionDetails(element.id);
      setQuestion(question);
      setTitle(question.title);
      setDescription(question.description);
    })();
  }, [element.id]);

  useEffect(() => {
    if (!title || !description) {
      return;
    }

    const timeout = setTimeout(() => {
      updateQuestionDetails({ ...question, title, description });
      setTitle(title);
      setDescription(description);
    }, 500);
    return () => clearTimeout(timeout);
  }, [title, description]);

  if (!question) {
    return <></>;
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
        <Label>Descrição</Label>
        <Input
          type='text'
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <div className='space-y-2'>
        <Label>Tipo de Questão</Label>
        <Select
          value={question.type}
        >
          <SelectTrigger>
            <SelectValue placeholder='Selecione um tipo de questão' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={QuestionType.DISCURSIVE}>Discursiva</SelectItem>
            <SelectItem value={QuestionType.OBJECTIVE}>Objetiva</SelectItem>
            <SelectItem value={QuestionType.MULTIPLE_CHOICE}>Múltipla Escolha</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {question.type == QuestionType.OBJECTIVE && (
        <ObjectiveQuestionProperties question={question} />
      )}
    </>
  );
};

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
};
