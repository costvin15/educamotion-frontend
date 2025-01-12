import { useEffect, useState } from "react";

import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";

import { Question } from "@/app/elements/question/types";
import { updateQuestionDetails } from "@/app/elements/question";
import { useQuestionStore } from "@/app/elements/question/store";

export function ObjectiveQuestionProperties({ questionId } : { questionId: string }) {
  const store = useQuestionStore();
  const question = store.questions.get(questionId);
  const [options, setOptions] = useState<string[]>(question?.options || []);
  const [correctOption, setCorrectOption] = useState<string>(question?.correctOption || '');

  useEffect(() => {
    if (!question) {
      return;
    }

    store.setQuestion({ ...question, options, correctOption });

    const timeout = setTimeout(() => {
      updateQuestionDetails({ ...question, options, correctOption });
    }, 500);
    return () => clearTimeout(timeout);
  }, [options, correctOption]);

  if (!question) {
    return <></>;
  }

  return (
    <>
      <div className='space-y-2'>
        <Label>Opções de Resposta</Label>
        <div className='grid grid-cols-2 gap-2'>
          {options.map((option, index) => (
            <Input
              key={index}
              type='text'
              value={option}
              placeholder="Digite a alternativa"
              onChange={(event) => {
                const newOptions = [...options];
                newOptions[index] = event.target.value;
                setOptions(newOptions);
              }}
            />
          ))}
        </div>
        
        <Button
          variant='secondary'
          className='w-full space-y-2'
          onClick={() => setOptions([...options, ''])}
        >
          Adicionar Alternativa
        </Button>
      </div>

      <div className='space-y-2'>
        <Label>Alternativa Correta</Label>
        <Select
          value={correctOption || ''}
          onValueChange={(value) => setCorrectOption(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder='Selecione uma alternativa correta' />
          </SelectTrigger>
          <SelectContent>
            {options.map((option, index) => {
              let value = option;
              if (value == '') {
                value = 'Alternativa Vazia';
              }

              return (
                <SelectItem key={index} value={value}>
                  {value}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}

export function ObjectiveQuestion({ question } : { question: Question }) {
  if (!question) {
    return null;
  }

  return (
    <div className='w-full h-full bg-white p-4 rounded-lg shadow-md'>
      <h3 className='font-semibold text-lg text-black'>{question.title}</h3>
      <p className='text-gray-500'>{question.description}</p>
      <div className='grid grid-cols-2 gap-2 mt-2'>
        {question.options.map((option, index) => (
          <div key={index}>
            <Button variant='secondary' className='w-full'>
              {option}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}