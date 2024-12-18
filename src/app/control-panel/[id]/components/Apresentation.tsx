import { useEditorStore } from "@/app/edit/[id]/store/editor";
import { SlideElementType } from "@/app/edit/[id]/types/pages";

import { Card } from "@/components/ui/Card";

export function Apresentation() {
  const { slides, currentSlideIndex } = useEditorStore();
  const slide = slides[currentSlideIndex];

  return (
    <Card className='col-span-2 p-6 w-full h-full'>
      <div className='h-full w-full bg-muted rounded-lg flex items-center justify-center'>
        {slide.elements.map((element, index) => (
          <div
            key={element.id}
          >
            {element.type === SlideElementType.IMAGE && (
              <img
                src={element.content}
                alt='slide'
                className='object-cover w-full h-full'
              />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
