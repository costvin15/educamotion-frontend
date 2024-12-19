import { SlideElement } from "@/app/edit/[id]/types/pages";
import { Button } from "@/components/ui/Button";

export function Question({ element } : { element: SlideElement }) {
  return (
    <div className='w-full h-full'>
      <div className='w-full h-full bg-white p-4 rounded-lg shadow-md'>
        <h3 className='font-semibold text-lg'>{element.content}</h3>
        <div className='grid grid-cols-2 gap-2 mt-4'>
          {element.data?.alternatives.map((alternative, index) => (
            <div key={index}>
              <Button variant='secondary' className='w-full'>
                {alternative.content}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
