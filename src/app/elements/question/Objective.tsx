import { useEffect, useState } from "react";

import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";

import { QuestionPropertiesProps, QuestionProps } from "@/app/elements/question/types";
import { updateQuestionDetails } from "@/app/elements/question";
import { useQuestionStore } from "@/app/elements/question/store";
import { mergeClassNames } from "@/components/utils";
import { PlusCircle, X } from "lucide-react";

export function ObjectiveQuestionProperties({ questionId } : QuestionPropertiesProps) {
  const store = useQuestionStore();
  const question = store.questions.get(questionId);
  const [options, setOptions] = useState<string[]>(question?.options || []);
  const [correctOption, setCorrectOption] = useState<string>(question?.correctOption || '');
  const [newOptionContent, setNewOptionContent] = useState('');

  const handleAddOption = () => {
    if (!newOptionContent) {
      return;
    }

    if (options.includes(newOptionContent)) {
      return;
    }

    setOptions([...options, newOptionContent]);
    setNewOptionContent('');
  }

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
        <div className='flex gap-2 mx-1'>
          <Input
            type='text'
            placeholder='Digite a nova opção'
            className='flex-1'
            value={newOptionContent}
            onChange={(event) => setNewOptionContent(event.target.value)}
          />
          <Button
            variant='outline'
            size='icon'
            className='h-10 w-10 hover:bg-primary-foreground'
            onClick={handleAddOption}
          >
            <PlusCircle className='h-5 w-5' />
          </Button>
        </div>

        <ul className='space-y-2 mx-1'>
          {options.map((option, index) => (
            <li
              key={index}
              className='flex items-center gap-2 p-2 rounded-md bg-card border animate-in fade-in-0 slide-in-from-left-5'
            >
              <Label className='flex-1 break-all'>{option}</Label>
              <Button
                variant='outline'
                size='icon'
                className='h-8 w-8'
                onClick={() => {
                  const newOptions = [...options];
                  newOptions.splice(index, 1);
                  setOptions(newOptions);
                }}
              >
                <X className='h-4 w-4' />
              </Button>
            </li>
          ))}
        </ul>
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

export function ObjectiveQuestion({ question, onAnswer } : QuestionProps) {
  const store = useQuestionStore();
  const storedAnswer = store.answers.get(question.id);
  const [selectedOption, setSelectedOption] = useState<string>(storedAnswer?.answer || '');

  if (!question) {
    return null;
  }

  useEffect(() => {
    if (!question) {
      return;
    }

    const timeout = setTimeout(() => {
      onAnswer(selectedOption);
    }, 500);
    return () => clearTimeout(timeout);
  }, [selectedOption]);

  return (
    <div className='w-full h-full bg-primary p-4 rounded-lg shadow-md'>
      <h3 className='font-semibold text-lg text-secondary'>{question.title}</h3>
      <p className='text-secondary/75'>{question.description}</p>
      <div className='grid grid-cols-2 gap-2 mt-2'>
        {question.options.map((option, index) => (
          <div key={index}>
            <Button
              variant='secondary'
              className={
                mergeClassNames(
                  'w-full',
                  selectedOption == option && 'bg-primary text-secondary border'
                )
              }
              onClick={() => {
                setSelectedOption(option);
              }}
            >
              {option}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}