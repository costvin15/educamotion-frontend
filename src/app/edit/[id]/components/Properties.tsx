import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

import { useEditorStore } from "@/app/edit/[id]/store/editor";
import { ElementProperties } from "@/app/elements";

export function Properties() {
  const { slides, currentSlideIndex, selectedElement, updateElement } = useEditorStore();
  const slide = slides[currentSlideIndex];
  if (!slide) {
    return null;
  }
  const element = slide.elements.find((element) => element.id === selectedElement);

  if (!element) {
    return (
      <div className='p-4 text-center text-muted-foreground'>
        Selecione um elemento para ver suas propriedades
      </div>
    )
  }

  const Properties = ElementProperties[element.elementType];

  return (
    <div className='space-y-4'>
      <h2 className='font-semibold'>Propriedades</h2>

      <Properties element={element} />
    </div>
  );
}
