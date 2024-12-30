import { SlideElement } from '@/app/edit/[id]/types/pages';
import { Card, CardContent } from '@/components/ui/Card';

export function Cosmo({ element } : { element: SlideElement }) {
  if (!element.content || element.content === '') {
    return (
      <Card className='w-full h-full'>
        <CardContent className='h-full w-full p-0 flex flex-col items-center justify-center'>
          <p className='text-center text-muted-foreground'>Nenhum problema do LeetCode selecionado</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className='w-full h-full'>
      <CardContent className='h-full w-full p-0 hover:p-6'>
        <iframe
          src={'http://localhost:3001/lesson/' + element.content}
          width='100%'
          height='500px'
          className='w-full h-full'
        />
      </CardContent>
    </Card>
  );
}
