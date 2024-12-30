import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Slider } from "@/components/ui/Slider";

import { useEditorStore } from "@/app/edit/[id]/store/editor";
import { SlideElementType } from "@/app/edit/[id]/types/pages";
import { Button } from "@/components/ui/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";

const cosmoProblemas = [
  {
    id: '672428d88984f2e5ad616a9a',
    nome: 'Olá, mundo!'
  },
  {
    id: '672429378984f2e5ad616a9b',
    nome: 'Soma de dois inteiros'
  },
  {
    id: '672429b08984f2e5ad616a9c',
    nome: 'Área de um triângulo'
  },
  {
    id: '67242a0c8984f2e5ad616a9d',
    nome: 'Imprimir "Jedi" 4 vezes'
  },
  {
    id: '67242a708984f2e5ad616a9e',
    nome: 'Troca do valor de variáveis'
  },
  {
    id: '672b6b32e3a67da6fcc32543',
    nome: 'Número par?'
  },
  {
    id: '672b6c1fe3a67da6fcc32544',
    nome: 'Número iguais'
  },
  {
    id: '67446cb5b9a94baf1c38844b',
    nome: 'Evaluate Reverse Polish Notation'
  }
];

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
            {element.data?.alternatives?.map((alternative, index) => (
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
            <Label>Cosmo</Label>
            <Select
              onValueChange={(value) => {
                updateElement({ ...element, content: value });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder='Selecione um problema' />
              </SelectTrigger>
              <SelectContent>
                {cosmoProblemas.map((problema, index) => (
                  <SelectItem
                    key={index}
                    value={problema.id}
                  >
                    {problema.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {element.type === SlideElementType.WORDCLOUD && (
        <>
          <div className='space-y-2'>
            <Label>Nuvem de Palavras</Label>
            <Input
              type='text'
              placeholder='Qual o título da nuvem de palavras?'
              value={element.content}
              onChange={(event) => {
                const value = event.target.value;
                updateElement({ ...element, content: value });
              }}
            />
            <Input
              type='text'
              placeholder='Palavras inicias'
              value={element.data?.initialWords}
              onChange={(event) => {
                const value = event.target.value;
                updateElement({ ...element, data: { ...element.data, initialWords: value.split(',') } });
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
