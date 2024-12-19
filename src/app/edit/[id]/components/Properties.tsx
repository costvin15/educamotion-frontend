import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Slider } from "@/components/ui/Slider";

import { useEditorStore } from "@/app/edit/[id]/store/editor";
import { SlideElementType } from "@/app/edit/[id]/types/pages";
import { Button } from "@/components/ui/Button";

export function Properties() {
  const { slides, currentSlideIndex, selectedElement, updateElement } = useEditorStore();
  const slide = slides[currentSlideIndex];
  const element = slide.elements.find((element) => element.id === selectedElement);

  if (!element) {
    return (
      <div className='p-4 text-center text-muted-foreground'>
        Selecione um elemento para ver suas propriedades
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      <h2 className='font-semibold'>Propriedades</h2>

      <div className='space-y-2'>
        <Label>Posição X</Label>
        <Input
          type='number'
          value={element.x}
          onChange={(event) => {
            const value = event.target.value;
            updateElement({ ...element, x: Number(value) });
          }}
        />
      </div>

      <div className='space-y-2'>
        <Label>Posição Y</Label>
        <Input
          type='number'
          value={element.y}
          onChange={(event) => {
            const value = event.target.value;
            updateElement({ ...element, y: Number(value) });
          }}
        />
      </div>

      <div className='space-y-2'>
        <Label>Rotação</Label>
        <Slider
          min={0}
          max={360}
          step={1}
          value={[element.rotation]}
          onValueChange={([value]) => {
            updateElement({ ...element, rotation: value });
          }}
        />
      </div>

      <div className='space-y-2'>
        <Label>Largura</Label>
        <Input
          type='number'
          value={element.width}
          onChange={(event) => {
            const value = event.target.value;
            updateElement({ ...element, width: Number(value) });
          }}
        />
      </div>

      <div className='space-y-2'>
        <Label>Altura</Label>
        <Input
          type='number'
          value={element.height}
          onChange={(event) => {
            const value = event.target.value;
            updateElement({ ...element, height: Number(value) });
          }}
        />
      </div>

      {element.type === SlideElementType.TEXT && (
        <>
          <div className='space-y-2'>
            <Label>Texto</Label>
            <Input
              type='text'
              value={element.content}
              onChange={(event) => {
                const value = event.target.value;
                updateElement({ ...element, content: value });
              }}
            />
          </div>

          <div className='space-y-2'>
            <Label>Tamanho da Fonte</Label>
            <Input
              type='number'
              value={element.style?.fontSize || 16}
              onChange={(event) => {
                const value = event.target.value;
                updateElement({ ...element, style: { ...element.style, fontSize: Number(value) } });
              }}
            />
          </div>
        </>
      )}

      {element.type === SlideElementType.QUESTION && (
        <>
          <div className='space-y-2'>
            <Label>Questão</Label>
            <Input
              type='text'
              value={element.content}
              onChange={(event) => {
                const value = event.target.value;
                updateElement({ ...element, content: value });
              }}
            />
          </div>

          <div className='space-y-2'>
            <Label>Alternativas</Label>
            {element.data?.alternatives.map((alternative, index) => (
              <Input
                key={index}
                type='text'
                value={alternative.content}
                onChange={(event) => {
                  const value = event.target.value;
                  const alternatives = element.data?.alternatives || [];
                  alternatives[index] = { ...alternative, content: value };
                  updateElement({ ...element, data: { ...element.data, alternatives } });
                }}
              />
            ))}
            <div className='flex justify-start'>
              <Button
                onClick={() => {
                  const alternatives = element.data?.alternatives || [];
                  updateElement({ ...element, data: { ...element.data, alternatives: [...alternatives, { content: '' }] } });
                }}
              >
                Adicionar Alternativa
              </Button>
            </div>
          </div>
        </>
      )}

      {element.type === SlideElementType.LEETCODE && (
        <>
          <div className='space-y-2'>
            <Label>Link da Questão</Label>
            <Input
              type='text'
              value={element.content}
              onChange={(event) => {
                const value = event.target.value;
                updateElement({ ...element, content: value });
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
