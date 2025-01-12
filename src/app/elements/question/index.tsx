import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

import { SlideElement } from "@/app/edit/[id]/types/pages";

import client from "@/client";

import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';

import { toast } from '@/hooks/use-toast';

import { ElementProps } from '@/app/elements';
import { useQuestionStore } from '@/app/elements/question/store';
import { DiscursiveQuestion } from '@/app/elements/question/Discursive';
import { Question as QuestionDetails, QuestionType } from '@/app/elements/question/types';
import { ObjectiveQuestion, ObjectiveQuestionProperties } from '@/app/elements/question/Objective';

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
  const question = store.questions.get(element.id);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<QuestionType>(QuestionType.DISCURSIVE);

  useEffect(() => {
    if (!question) {
      return;
    }

    setTitle(question.title);
    setDescription(question.description);
    setType(question.type);
  }, [element.id]);

  useEffect(() => {
    if (!question) {
      return;
    }

    store.setQuestion({ ...question, title, description, type });
    const timeout = setTimeout(() => {
      updateQuestionDetails({ ...question, title, description, type });
    }, 500);
    return () => clearTimeout(timeout);
  }, [title, description, type]);

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
      {question.type == QuestionType.OBJECTIVE && (
        <ObjectiveQuestionProperties questionId={question.id} />
      )}
    </>
  );
};

export function Question({ element, onLoaded } : ElementProps) {
  const store = useQuestionStore();
  const question = store.questions.get(element.id);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchQuestion = async () => {
    setLoading(true);
    try {
      const question = await fetchQuestionDetails(element.id);
      store.setQuestion(question);
      if (onLoaded) {
        onLoaded();
      }
    } catch (error) {
      setHasError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuestion();
  }, [element.id]);

  if (loading) {
    return (
      <div className='w-full h-full bg-white text-black p-4 rounded-lg shadow-md flex items-center justify-center'>
        <Loader2 className='w-8 h-8 animate-spin' />
      </div>
    );
  }

  if (hasError) {
    toast({
      title: 'Oops!',
      description: 'Não foi possível carregar o conteúdo do objeto interativo.',
      variant: 'destructive',
    });

    return (
      <div className='w-full h-full bg-white text-black p-4 rounded-lg shadow-md'>
        <h3 className='font-semibold text-lg text-black'>Ocorreu um erro</h3>
        <p className='text-gray-500'>Não foi possível carregar o conteúdo do objeto interativo.</p>
      </div>
    );
  }

  if (!question) {
    return (
      <div className='w-full h-full bg-white text-black p-4 rounded-lg shadow-md'>
        <h3 className='font-semibold text-lg text-black'>Questão não encontrada</h3>
        <p className='text-gray-500'>A questão não foi encontrada no banco de dados.</p>
      </div>
    );
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
