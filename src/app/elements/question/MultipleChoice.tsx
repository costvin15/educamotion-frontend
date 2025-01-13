import { useEffect, useState } from "react";

import { useQuestionStore } from "@/app/elements/question/store";
import { QuestionPropertiesProps, QuestionProps } from "@/app/elements/question/types";

import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { PlusCircle, X } from "lucide-react";
import { mergeClassNames } from "@/components/utils";
import { updateQuestionDetails } from ".";

export function MultipleChoiceQuestionProperties({ questionId } : QuestionPropertiesProps) {
  const store = useQuestionStore();
  const question = store.questions.get(questionId);
  const [options, setOptions] = useState<string[]>(question?.options || []);
  const [correctOptions, setCorrectOptions] = useState<string[]>(question?.correctOption.split(',') || []);
  const [newOptionContent, setNewOptionContent] = useState('');

  useEffect(() => {
    if (!question) {
      return;
    }

    let answers = correctOptions.join(',');
    store.setQuestion({ ...question, options, correctOption: answers });

    const timeout = setTimeout(() => {
      updateQuestionDetails({ ...question, options, correctOption: answers });
    }, 500);
    return () => clearTimeout(timeout);
  }, [options, correctOptions]);

  if (!question) {
    return <></>;
  }

  const addOption = () => {
    if (!newOptionContent) {
      return;
    }
  
    if (options.includes(newOptionContent)) {
      return;
    }

    setOptions([...options, newOptionContent]);
    setNewOptionContent('');
  }

  return (
    <div>
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
            onClick={addOption}
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
                variant='ghost'
                size='icon'
                className='h-8 w-8 text-muted-foreground hover:text-primary'
                onClick={() => {
                  setOptions(prev => prev.filter(o => o !== option));
                  setCorrectOptions(prev => prev.filter(o => o !== option));
                }}
              >
                <X className='h-4 w-4' />
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div className='space-y-2 mt-5'>
        <Label>Resposta correta</Label>
        <div className='grid gap-4 mx-1'>
          {options.map((option, index) => (
            <div
              key={index}
              className={mergeClassNames(
                'flex items-center text-primary space-x-2 border p-4 rounded-lg cursor-pointer transition-colors hover:bg-primary-foreground animate-in fade-in-0 slide-in-from-left-5',
                correctOptions.includes(option) && 'border-primary bg-primary/10'
              )}
              onClick={() => {
                setCorrectOptions(prev => prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]);
              }}
            >
              <Checkbox
                key={index}
                className='border-primary'
                checked={correctOptions.includes(option)}
                onCheckedChange={(checked) => {
                  setCorrectOptions(prev => checked ? [...prev, option] : prev.filter(o => o !== option));
                }}
              />
              <Label>{option}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MultipleChoiceQuestion({ question, onAnswer } : QuestionProps) {
  const store = useQuestionStore();
  const storedAnswer = store.answers.get(question.id);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(storedAnswer?.answer.split(',') || []);

  useEffect(() => {
    if (!question) {
      return;
    }

    const timeout = setTimeout(() => {
      // TODO: Corrigir considerando a ordem em que as opções foram selecionadas
      onAnswer(selectedOptions.join(','));
    }, 500);
    return () => clearTimeout(timeout);
  }, [selectedOptions]);

  if (!question) {
    return null;
  }

  return (
    <div className='w-full h-full bg-white p-4 rounded-lg shadow-md flex flex-col'>
      <h3 className='font-semibold text-lg text-black'>{question.title}</h3>
      <p className='text-gray-500'>{question.description}</p>
      <div className='flex-grow mb-4 mt-4'>
        <div className='grid gap-4'>
          {question.options.map((option, index) => (
            <div
              key={index}
              className={mergeClassNames(
                'flex items-center text-secondary space-x-2 border p-4 rounded-lg cursor-pointer transition-colors hover:bg-secondary-foreground',
                selectedOptions.includes(option) && 'border-secondary bg-secondary/10'
              )}
              onClick={() => {
                setSelectedOptions(prev => prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]);
              }}
            >
              <Checkbox
                key={index}
                className='border-secondary'
                checked={selectedOptions.includes(option)}
                onCheckedChange={(checked) => {
                  setSelectedOptions(prev => checked ? [...prev, option] : prev.filter(o => o !== option));
                }}
              />
              <Label>{option}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
