import { Card } from "@/components/ui/Card";

import { Elements } from "@/app/elements";
import { usePresentationStore } from "@/app/join/[id]/store/presentation";

export function Apresentation() {
  const store = usePresentationStore();
  const currentSlide = store.currentSlide;

  return (
    <Card className='w-full h-full'>
      <div className='h-full w-full flex items-center justify-center'>
        <div
          className='relative aspect-video w-full max-w-7xl rounded-lg shadow-lg bg-white overflow-hidden'
          style={{
            backgroundImage: `url(${currentSlide.background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {currentSlide.elements.map((element, index) => {
            const Element = Elements[element.elementType];
            return (
              <div
                key={index}
                className='absolute'
                style={{
                  top: `${element.positionY}%`,
                  left: `${element.positionX}%`,
                  width: `${element.width}%`,
                  height: `${element.height}%`,
                }}
              >
                <Element
                  key={element.id}
                  element={element}
                />
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
