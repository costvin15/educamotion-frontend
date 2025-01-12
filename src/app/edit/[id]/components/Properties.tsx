import client from "@/client";

import { useEditorStore } from "@/app/edit/[id]/store/editor";
import { ElementProperties } from "@/app/elements";
import { Button } from "@/components/ui/Button";

async function performDeleteElement(elementId: string) {
  await client.delete(`/element/delete/${elementId}`);
}

export function Properties() {
  const { slides, currentSlideIndex, selectedElement, setSelectedElement, removeElementFromSlide } = useEditorStore();
  const slide = slides[currentSlideIndex];
  if (!slide) {
    return null;
  }
  const element = slide.elements.find((element) => element.id === selectedElement);

  const handleDeleteElement = async () => {
    if (!element) {
      return;
    }

    await performDeleteElement(element.id);
    removeElementFromSlide(element.id);
    setSelectedElement('');
  }

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

      <div className='bg-border border border-border rounded-lg'></div>

      <Button
        className='w-full'
        variant='destructive'
        onClick={handleDeleteElement}
      >
        Excluir Objeto Interativo
      </Button>
    </div>
  );
}
