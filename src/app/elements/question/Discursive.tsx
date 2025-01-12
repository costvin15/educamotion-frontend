import { Question } from '@/app/elements/question/types';
import { Input } from '@/components/ui/Input';

export function DiscursiveQuestion({ question } : { question: Question }) {
  if (!question) {
    return null;
  }

  return (
    <div className='w-full h-full bg-white p-4 rounded-lg shadow-md flex flex-col'>
      <h3 className='font-semibold text-lg text-black'>{question.title}</h3>
      <p className='text-gray-500'>{question.description}</p>
      <div className='flex-grow mb-4'>
        {/* TODO: Use TextArea */}
        <Input className='mt-4 h-full'
          placeholder='Digite sua resposta...'
        />
      </div>
    </div>
  );
}
