import { Button } from "@/components/ui/Button";

import { Question } from "@/app/elements/question/types";

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