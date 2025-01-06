import { useEffect, useState } from 'react';

import { SlideElement } from "@/app/edit/[id]/types/pages";

import client from "@/client";
import { Question as QuestionDetails, QuestionType } from '@/app/elements/question/types';
import { DiscursiveQuestion } from '@/app/elements/question/Discursive';
import { ObjectiveQuestion, ObjectiveQuestionProperties } from '@/app/elements/question/Objective';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { useQuestionStore } from '@/app/elements/question/store';

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
  const store = useQuestionStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<QuestionType>(QuestionType.DISCURSIVE);

  useEffect(() => {
    setTitle(store.question.title);
    setDescription(store.question.description);
    setType(store.question.type);
  }, [element.id]);

  useEffect(() => {
    store.setQuestion({ ...store.question, title, description, type });
    const timeout = setTimeout(() => {
      updateQuestionDetails({ ...store.question, title, description, type });
    }, 500);
    return () => clearTimeout(timeout);
  }, [title, description, type]);

  if (!store.question) {
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
          value={type}
          onValueChange={(value) => {
            setType(value as QuestionType);
          }}
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
      {store.question.type == QuestionType.OBJECTIVE && (
        <ObjectiveQuestionProperties />
      )}
    </>
  );
};

export function Question({ element } : { element: SlideElement }) {
  const store = useQuestionStore();

  useEffect(() => {
    (async () => {
      const question = await fetchQuestionDetails(element.id);
      store.setQuestion(question);
    })();
  }, [element.id]);

  if (store.question.type == QuestionType.DISCURSIVE) {
    return <DiscursiveQuestion question={store.question} />;
  }

  if (store.question.type == QuestionType.OBJECTIVE) {
    return <ObjectiveQuestion question={store.question} />;
  }

  return (
    <div className='w-full h-full bg-white p-4 rounded-lg shadow-md'>
      <h3 className='font-semibold text-lg text-black'>{store.question.title}</h3>
      <p className='text-gray-500'>{store.question.description}</p>
      <span className='text-red-500'>Tipo de questão não suportado</span>
    </div>
  );
};
