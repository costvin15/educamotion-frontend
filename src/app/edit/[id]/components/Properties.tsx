import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Slider } from "@/components/ui/Slider";

export function Properties() {
  return (
    <div className='space-y-4'>
      <h2 className='font-semibold'>Propriedades</h2>

      <div className='space-y-2'>
        <Label>Posição X</Label>
        <Input
          type='number'
        />
      </div>

      <div className='space-y-2'>
        <Label>Posição Y</Label>
        <Input
          type='number'
        />
      </div>

      <div className='space-y-2'>
        <Label>Rotação</Label>
        <Slider
          min={0}
          max={360}
          step={1}
        />
      </div>

      <div className='space-y-2'>
        <Label>Tamanho da Fonte</Label>
        <Input
          type='number'
        />
      </div>
    </div>
  );
}
