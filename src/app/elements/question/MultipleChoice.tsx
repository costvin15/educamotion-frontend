import { useState } from "react";

import { useQuestionStore } from "@/app/elements/question/store";
import { QuestionPropertiesProps, QuestionProps } from "@/app/elements/question/types";

import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";

export function MultipleChoiceQuestionProperties({ questionId } : QuestionPropertiesProps) {
  const store = useQuestionStore();
  const question = store.questions.get(questionId);
  const [options, setOptions] = useState<string[]>(question?.options || []);

  if (!question) {
    return <></>;
  }

  return (
    <div>
      <div className='space-y-2'>
        <Label>Opções de Resposta</Label>
        <div className='grid grid-cols-1 gap-2'>
          {options.map((option, index) => (
            <Input
              key={index}
              type='text'
              value={option}
              placeholder="Digite a alternativa"
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
    </div>
  );
}

export function MultipleChoiceQuestion({ question } : QuestionProps) {
  if (!question) {
    return null;
  }

  return (
    <div className='w-full h-full bg-white p-4 rounded-lg shadow-md flex flex-col'>
      <h3 className='font-semibold text-lg text-black'>{question.title}</h3>
      <p className='text-gray-500'>{question.description}</p>
      <div className='flex-grow mb-4 mt-4'>
        <div className='flex flex-col'>
          {question.options.map((option, index) => (
            <div className='text-secondary space-x-2'>
              <Checkbox key={index} className='border-secondary data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground' />
              <Label>{option}</Label>
            </div>
          ))}
        </div>
        <div className='mt-4'>
          <Button className="w-full" variant='secondary'>
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
}