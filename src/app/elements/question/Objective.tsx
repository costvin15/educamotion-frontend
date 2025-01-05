import { Button } from "@/components/ui/Button";

import { Question } from "@/app/elements/question/types";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";

export function ObjectiveQuestionProperties({ question } : { question: Question }) {
  if (!question) {
    return null;
  }

  return (
    <>
      <div className='space-y-2'>
        <Label>Opções de Resposta</Label>
        <div className='grid grid-cols-2 gap-2'>
          {question.options.map((option, index) => (
            <Input
              key={index}
              type='text'
              value={option}
            />
          ))}
        </div>
      </div>

      <div className='space-y-2'>
        <Label>Alternativa Correta</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder='Selecione uma alternativa correta' />
          </SelectTrigger>
          <SelectContent>
            {question.options.map((option, index) => (
              <SelectItem key={index} value={option}>
                {option}
              </SelectItem>
            ))}
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