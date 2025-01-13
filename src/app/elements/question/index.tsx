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
import { QuestionAnswer, Question as QuestionDetails, QuestionType } from '@/app/elements/question/types';
import { DiscursiveQuestion } from '@/app/elements/question/Discursive';
import { ObjectiveQuestion, ObjectiveQuestionProperties } from '@/app/elements/question/Objective';
import { MultipleChoiceQuestion, MultipleChoiceQuestionProperties } from '@/app/elements/question/MultipleChoice';

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

async function sendAnswer(questionId: string, answer: string) {
  await client.post('/element/question/answer', {
    id: questionId,
    answer,
  });
}

async function fetchAnswerDetails(questionId: string) : Promise<QuestionAnswer> {
  const { data } = await client.get(`/element/question/answer/${questionId}`);
  return data;
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

      {question.type == QuestionType.MULTIPLE_CHOICE && (
        <MultipleChoiceQuestionProperties questionId={question.id} />
      )}
    </>
  );
};

export function Question({ element, onLoaded } : ElementProps) {
  const store = useQuestionStore();
  const question = store.questions.get(element.id);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchAnswer = async () => {
    try {
      const answer = await fetchAnswerDetails(element.id);
      store.setAnswer(element.id, answer);
    } catch (error) {
      toast({
        title: 'Oops!',
        description: 'Não foi possível carregar a resposta da questão.',
        variant: 'destructive',
      });
    }
  };

  const fetchQuestion = async () => {
    setLoading(true);
    try {
      await fetchAnswer();
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
  };

  const onAnswer = (answer: string) => {
    try {
      sendAnswer(element.id, answer);
    } catch (error) {
      toast({
        title: 'Oops!',
        description: 'Não foi possível enviar a resposta da questão.',
        variant: 'destructive',
      });
    }
  };

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
    return <DiscursiveQuestion question={question} onAnswer={onAnswer} />;
  }

  if (question.type == QuestionType.OBJECTIVE) {
    return <ObjectiveQuestion question={question} onAnswer={onAnswer} />;
  }

  if (question.type == QuestionType.MULTIPLE_CHOICE) {
    return <MultipleChoiceQuestion question={question} onAnswer={onAnswer} />;
  }

  return (
    <div className='w-full h-full bg-white p-4 rounded-lg shadow-md'>
      <h3 className='font-semibold text-lg text-black'>{question.title}</h3>
      <p className='text-gray-500'>{question.description}</p>
      <span className='text-red-500'>Tipo de questão não suportado</span>
    </div>
  );
};
